<template>
    <div class="upload-image">
        <el-upload :disabled="disabled" class="upload-input" :action="action" :http-request="request" :multiple="multiple" :show-file-list="false">
            <el-button :disabled="disabled" class="upload-input-btn">{{text}}</el-button>
            <div slot="tip" class="el-upload__tip">
                <slot name="tips"></slot>
            </div>
        </el-upload>
        <!--<el-dialog @close="close" title="头像剪裁" :visible.sync="dialogTableVisible" size="full">-->
            <!--<img ref="img" v-bind:src="imgSrc" alt="图片上传" title="图片上传">-->
        <!--</el-dialog>-->
    </div>
</template>
<script>
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
        data() {
            return {
//                dialogTableVisible: false,
                imgSrc: '',
                cropper: null
            }
        },
        methods: {
            request(item) {
                let self = this,
                    uploadKs3 = new ks3(),
                    file = item.file;
//                var reader = new FileReader();
//                console.log(file);
//                reader.onload = (data) =>{
//                    self.imgSrc = data.target.result;
//                    console.log(data.target.result);
//                    self.dialogTableVisible = true;
//                    setTimeout(()=>{
//                        self.initCropper(this.$refs.img);
//                    })
//                };
//                reader.readAsDataURL(file);
//                return ;
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
                let objKey = uploadKs3.encodeKey(file.name);
                uploadKs3.putObject({
                    Key: objKey,
                    File: file,
                    ACL: 'public-read',
                    ProgressListener: function(e){self.progressFunction&&self.progressFunction(e,uploadKs3)},
                    Sinature: ''
                },function(e) {
                    self.callback&&self.callback(e,uploadKs3,'http://ks3-cn-beijing.ksyun.com/'+uploadKs3.config.bucket+'/'+objKey)
                });
            },
            initCropper(el) {
//                let options = {
//                        maxContainerHeight :  200,
//                        maxContainerWidth : 200,
//                        aspectRatio: 1 / 1,//裁剪框比例 1：1
//                        autoCropArea: Math.min(200/el.width),
//                        viewMode : 1,//显示
//                        guides :false,//裁剪框虚线 默认true有
//                        dragMode : "move",
//                        build: function (e) { //加载开始
//                            //可以放你的过渡 效果
//                        },
//                        built: function (e) { //加载完成
//
//                        },
//                        zoom: function (e) {
//                            console.log(e.type, e.detail.ratio);
//                        },
//                        background : true,// 容器是否显示网格背景
//                        movable : false,//是否能移动图片
//                        cropBoxMovable :true,//是否允许拖动裁剪框
//                        cropBoxResizable :false,//是否允许拖动 改变裁剪框大小
//                    };
//                this.cropper = new Cropper(el,options);
            },
            close() {
//                this.cropper.clear();
            }
        }
    }
</script>
<style lang="stylus">
    .upload-image {
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