<template>
    <div>
        <el-button class="m-lr-5" :size="size" v-for="item in list" v-if="test(item,data)" :class="item.class" :key="item.key" type="text" @click="click(item,data.row)">{{item.name}}</el-button>
    </div>
</template>
<script>
    export default {
        props: {
            size: String,//尺寸
            data: {//行数据
                type: Object,
                default: _=>{}
            },
            routerTest: {//是否开启路由权限检查
                type: Boolean,
                default: false
            },
            options: {//配置项
                type: Object,
                default: _=>{}
            }
        },
//        created() {
//            let list = this.options.ctrlList;
//            this.list = list && list.filter((v,i)=>{
//                return this.test(v,this.data);
//            })
//        },
        data() {
            return {
                list: null
            }
        },
        methods: {
            successTip (msg){
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            msg(item,row) {
                let rt = item.success&&item.success(item,row);
                rt&&rt.then(rep=>{
                    rep&&this.successTip(this.message?this.message.successTip:item.name+'成功');
                }).catch((err)=>{
                    console.log(err);
                });
            },
            click(item,row) {
                item.confirm?this.$confirm(item.confirm.content||(`确认进行${item.name}?`),item.confirm.title||item.name+'操作',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: item.confirm.type
                    })
                    .then(_ => {
                        this.msg(item,row);
                    })
                    .catch(_ => {
                        item.cancel&&item.cancel(item,row)
                    }):this.msg(item,row);
            },
            testRouter(item) {//判断路由权限
                let ctrl = this.$route.meta.ctrl;
                return this.routerTest?(ctrl&&ctrl.includes(item.key)):true;
            },
            test(item, data){//判断按钮是否显示
                debugger;
                let flag = this.testRouter(item);
                return flag&&(item.test?item.test(data.row,item):true)
            }
        }
    }
</script>