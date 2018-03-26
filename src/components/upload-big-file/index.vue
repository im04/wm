<template>
    <div class="upload-file">
        <el-upload :disabled="disabled" class="upload-input" :action="action" :http-request="request" :multiple="multiple" :show-file-list="false">
            <el-button :disabled="disabled" class="upload-input-btn">{{text}}</el-button>
            <div slot="tip" class="el-upload__tip">
                <slot name="tips"></slot>
            </div>
        </el-upload>
        <el-table class="m-bottom-22" :data="dataList" border>
            <el-table-column prop="fileName" label="文件名"></el-table-column>
            <el-table-column prop="total" label="大小"></el-table-column>
            <el-table-column label="进度">
                <template slot-scope="scope">
                    <div>{{pro}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" v-if="status == 'uploading'" @click="stop()">暂停</el-button>
                    <el-button type="text" v-if="status == 'stop'" @click="request(fileItem)">继续</el-button>
                    <el-button type="text" v-if="status == 'uploading'" @click="cancel()">取消</el-button>
                    <el-button type="text" v-if="status == 'finish'" @click="deleteFile()">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    function configInit(Ks3, file, progressKey, cb) {
        var fileSize = file.size;
        var count = parseInt(fileSize / Ks3.config.chunkSize) + ((fileSize % Ks3.config.chunkSize == 0 ? 0: 1));
        if (count == 0) {
            cb({
                msg: 'The file is empty.'
            })
        } else {
            let config = {
                name: file.name,
                size: fileSize,
                chunkSize: Ks3.config.chunkSize,
                count:count,
                index: 1,
                etags:{},
                retries: 0
            }
            localStorage.setItem(progressKey, JSON.stringify(config));
            if(cb) {
                cb(null);
            }
        }
    }
    function getProgressKey(Ks3 ,name, lastModified, bucket, key) {
        var result = name + "-" + lastModified + "-" + bucket + "-" + key;
        return result;
    }
    function generateCompleteXML(Ks3, progressKey) {
        var content = JSON.parse(localStorage.getItem(progressKey));
        var index = content.index;
        var str = '';
        if (index > 0) {
            str = '<CompleteMultipartUpload>';
            for (var i = 1; i <= index; i++) {
                str += '<Part><PartNumber>' + i + '</PartNumber><ETag>' + content.etags[i] + '</ETag></Part>'
            }
            str += '</CompleteMultipartUpload>';
        }
        return str;
    }
    function getFileContent(Ks3, file, chunkSize, start, cb) {
        var start = start;
        var bufferSize = file.size;
        var index = start / chunkSize;
        console.log('正在读取下一个块的文件内容 index:' + index);
        if (start + chunkSize > bufferSize) {
            chunkSize = bufferSize - start;
        }
        console.log('分块大小:', chunkSize);

        if(file.slice) {
            var blob = file.slice(start, start + Ks3.config.chunkSize);
        }else if(file.webkitSlice) {
            var blob = file.webkitSlice(start, start + Ks3.config.chunkSize);
        }else if(file.mozSlice) {
            var blob = file.mozSlice(start, start + Ks3.config.chunkSize);
        }else{
            throw new Error("blob API doesn't work!");
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            cb(e.target.result);
        };
        reader.readAsArrayBuffer(blob);
    }
    export default {
        props: {
            multiple:Object,
            configFunction: {
                type: Function,
                default:()=> {}
            },
            callback: {
                type: Function,
                default:()=> {}
            },
            progressFunction: {
                type: Function,
                default:()=> {}
            },
            disabled: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: '点击上传'
            },
            action: {
                type: String,
                default: ''
            }
        },
        computed: {
            pro() {
                return ((Math.min(1,this.loaded/this.total)*100)|0)+'%';
            }
        },
        data() {
            return {
                dataList: [],
                loaded:0,
                total:0,
                Ks3:null,
                status: null,
                fileItem: null
            }
        },
        methods: {
            request(item) {
                let self = this;
                let uploadKs3 = this.Ks3 = new ks3();
                let file = item.file;
                this.fileItem = item;

                if (this.configFunction&&this.configFunction(item,uploadKs3)) return;
                if (this.uploadConfig) {
                    Object.assign(uploadKs3.config,this.uploadConfig);
                } else {
                    uploadKs3.config.AK = 'AKLTaq2RjfBdSGKCUrz27WHw6w';  //TODO： 请替换为您的AK
                    uploadKs3.config.SK = 'ONSmy8YUeg8dNwPjj4pEQWzQs+c2FbOikVrHT9gdOGrbKcagYnDVT44KSSfejc9kxA=='; //TODO: 测试时请填写您的secret key  注意：前端计算signature不安全
                    uploadKs3.config.region = 'BEIJING';  //TODO: 需要设置bucket所在region， 如杭州region： HANGZHOU,北京region：BEIJING，香港region：HONGKONG，上海region: SHANGHAI ，美国region:AMERICA ；如果region设置和实际不符，则会返回301状态码； region的endpoint参见：http://ks3.ksyun.com/doc/api/index.html
                    uploadKs3.config.bucket = 'vrmu-test'; // TODO : 设置默认bucket name
                }
                if (window.location.protocol === 'https:') {
                    uploadKs3.config.protocol = 'https';
                } else {
                    uploadKs3.config.protocol = 'http';
                }
                let objKey = file.name;
                this.multipartUpload(uploadKs3,{
                    Bucket: uploadKs3.config.bucket,
                    Key: objKey,
                    //region: 'BEIJING',
                    ACL: 'public-read',
                    //ContentType : 'video/mp4',
                    File: file,
                    TotalSize: file.size,
                    Signature: '',
                }, function(err, res){
                    if(err) {
                        if(err.msg != 'stop') {
                            console.error(err);
                            alert(err.msg);
                        }else{
                            console.log(err);
                        }
                    }else{
                        console.log('res: ' + JSON.stringify(res));
                    }
                })
            },
            multipartUpload (Ks3,params, cb) {
                var config,
                    self = this;
                Ks3.config._file = params.File;
                var bucketName = params.Bucket || Ks3.config.bucket || '';
                var key = params.Key || params.File.name;
                key = Ks3.encodeKey(key);
                var region = params.region || Ks3.config.region;
                if (region ) {
                    Ks3.config.baseUrl =  Ks3.ENDPOINT[region];
                }
                var file = params.File;
                var totalSize = file.size; //文件总大小
                var progressKey = getProgressKey(Ks3,file.name, file.lastModified, bucketName, key);
                Ks3._progressKey = progressKey;

                // 会根据文件大小,进行简单上传和分块上传
                var contentType = params.ContentType || '';
                // 分块上传
                async.auto({
                        /**
                         * 初始化配置文件,如果没有就新建一个
                         */
                        init: function(callback) {
                            console.log('初始化');
                            self.status = 'uploading';
                            self.total = file.size;
                            self.dataList.splice(0,1,{
                                fileName: file.name,
                                total: self.total,
                            });
                            //重置暂停标识
                            Ks3.config.stopFlag = false;
                            self.configFunction&&self.configFunction(self.item,Ks3);
                            if ( !localStorage[progressKey]) {
                                configInit(Ks3,file, progressKey, function(err) {
                                    callback(err);
                                })
                            } else {
                                callback(null);
                            }

                        },
                        show: ['init', function(callback) {
                            console.log('  开始上传文件: ' + progressKey)
                            config = JSON.parse(localStorage.getItem(progressKey));
                            console.log('max:'+'value=',JSON.stringify(config));
//                            progressBar.max = config['count'];
//                            progressBar.value = config['index'];
                            callback(null);
                        }],
                        /**
                         * 获取uploadId,如果有就直接读取,没有就从服务器获取一个
                         */
                        getUploadId: ['init', function(callback) {
                            config = JSON.parse(localStorage.getItem(progressKey));
                            var uploadId = config['uploadId'];

                            if ( !! uploadId) {
                                callback(null, uploadId);
                            } else {
                                Ks3.multitpart_upload_init(params, function(err, uploadId) {
                                    if(err) {
                                        callback(err);
                                    }else {
                                        config['uploadId'] = uploadId;
                                        localStorage.setItem(progressKey, JSON.stringify(config));
                                        callback(null, uploadId);
                                    }
                                });
                            }
                        }],
                        /**
                         * 对文件进行上传
                         * 上传后要把信息写到本地存储配置文件中
                         * 如果都上传完了,就把相关本地存储信息删除
                         * 并通知服务器,合并分块文件
                         */
                        upload: ['getUploadId', function(callback, result) {
                            if(result.getUploadId) {
                                var uploadId = result.getUploadId;
                                Ks3.config.currentUploadId = uploadId;
                                config = JSON.parse(localStorage.getItem(progressKey));
                                var count = config['count'];
                                var index = config['index'];
                                var chunkSize = config['chunkSize'];
                                var currentRetries = config['retries'];
                                up();
                            }else {
                                callback({'msg':'no uploadId'});
                            }

                            // 在报错的时候重试
                            function retry(err) {
                                console.log('upload ERROR:', err);
                                if (currentRetries > Ks3.config.retries) {
                                    throw err;
                                } else {
                                    currentRetries = currentRetries + 1;
                                    config['retries'] = currentRetries;
                                    localStorage.setItem(progressKey, JSON.stringify(config));
                                    console.log('第 ' + currentRetries + ' 次重试');
                                    up();
                                }
                            }
                            // 真正往服务端传递数据
                            function up() {
                                console.log('正在上传 ', 'index: ' + index);
                                var start = (index - 1) * chunkSize;
                                // 判断是否已经全部都传完了
                                if (index <= count) {
                                    getFileContent(Ks3,file, chunkSize, start, function(body) {
                                        delete params.File;
                                        params.UploadId = uploadId;
                                        params.PartNumber = index;
                                        params.body = body;
                                        params.type = contentType;
                                        console.log('正在上传第 ', index, ' 块,总共: ', + count + ' 块');
                                        try {
                                            Ks3.upload_part(params, function(err, partNumber, etag) {
                                                if (err) {
                                                    if(err.status == 413 || err.status == 415) {
                                                        callback(err);
                                                    }else {
                                                        retry(err);
                                                    }
                                                } else {
                                                    if(!Ks3.config.stopFlag) {
                                                        config['index'] = index;
                                                        //progressBar.value = config['index'];
//                                                        console.log('ci'+config['index']);
                                                        config['etags'][index] = etag;
                                                        localStorage.setItem(progressKey, JSON.stringify(config));
                                                        index = index + 1;
                                                        self.progressFunction&&self.progressFunction(this,Ks3,err,partNumber,etag)
                                                        self.loaded += chunkSize;
                                                        up();
                                                    }else {
                                                        callback({
                                                            msg: "stop"
                                                        });
                                                    }
                                                }
                                            });
                                        } catch(e) {
                                            retry(e);
                                        }
                                    })
                                } else {
                                    delete params.File;
                                    params.UploadId = uploadId;
                                    params.body = generateCompleteXML(Ks3,progressKey);
                                    Ks3.upload_complete(params, function(err, res) {
                                        if (err) throw err;
                                        callback(err, res);
                                    })
                                }
                            };

                        }]
                    },
                    function(err, results) {
                        if (err) {
                            //throw err;
                        }else{
                            //删除配置
                            self.callback&&self.callback(this,Ks3,'http://ks3-cn-beijing.ksyun.com/'+Ks3.config.bucket+'/'+Ks3.encodeKey(file.name),err,results)
                            self.status = 'finish';
                            localStorage.removeItem(progressKey);
                        }
                        if (cb) {
                            cb(err, results);
                        }
                    });

            },
            stop() {
                this.Ks3.config.stopFlag = true;
                this.status = 'stop';
            },
            cancel() {
                let Ks3 = this.Ks3;
                let self = this;
                Ks3.config.stopFlag = true;
                //通知ks3取消上传
                console.log(Ks3.config.currentUploadId);
                if(Ks3.config.currentUploadId) {
                    Ks3.abort_multipart_upload({
                        Bucket: Ks3.config.bucket,
                        Key: Ks3.config._file.name,
                        UploadId: Ks3.config.currentUploadId
                    },function(err,res) {
                        if(err) {
                            console.log(err);
                        }else{
                            console.log('res: ' + JSON.stringify(res));
                            self.status = null;
                            //清理前端缓存与重置界面进度条

                            localStorage.removeItem(Ks3._progressKey);
//                            var len = localStorage.length;
//                            for(var i=0; i< len; i++) {
//                                var itemKey = localStorage.key(i);
//                                //自动创建一个临时String对象封装itemKey在IE下会导致内存泄露，故显示转换
//                                if(typeof itemKey  === 'string'  && (new String(itemKey)).endWith(Ks3.config.bucket + '-' + Ks3.encodeKey(Ks3.config._file.name))) {
//                                    localStorage.removeItem(itemKey);
//                                }
//                            }
                            self.dataList.splice(0,1);
                            self.loaded = 0;
                            self.total = 0;
                        }
                    });
                }
            },
            deleteFile() {
                this.callback&&this.callback(this.Ks3,'')
                this.dataList.splice(0,1);
                this.loaded = 0;
                this.total = 0;
            }
        }
    }
</script>
<style lang="stylus">
    .upload-file {
        .upload-input {
            .upload-input-btn {
                width: 140px;
            }
            .el-upload__tip {
                margin-top 15px;
            }
        }
        .el-dialog {
            top 50%;
            width auto;
            height auto;
            -webkit-transform translate(-50%,-50%);
            -moz-transform translate(-50%,-50%)
            -ms-transform translate(-50%,-50%)
            -o-transform translate(-50%,-50%)
            transform translate(-50%,-50%)
        }
    }
</style>