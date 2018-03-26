<template>
    <el-button :type="type" @click="click()" :size="size"><slot/></el-button>
</template>
<script>
    export default {
        props: {//组件参数
            size: String,//尺寸
            type: String,//按钮类型
            callback: Function,//回调
            cancel: Function,//取消回调
            confirm: Object,//弹框提示配置
            message: {
                type: Object,
                default(){return{}}
            },//信息提示配置
        },
        data() {
            return {
                text: this.$slots.default[0].text.trim()
            }
        },
        methods: {
            successTip (msg){
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            msg() {
                let rt = this.callback&&this.callback();
                rt&&rt.then(rep=>{
                    rep&&this.successTip(this.message.successTip||this.text+'成功');
                }).catch((err)=>{
                    console.log(err);
                });
            },
            click() {
                console.log(this.$slots);
                this.confirm?this.$confirm(this.confirm.content||`确认进行${this.text}操作?`,this.confirm.title||`${this.text}操作`,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: this.confirm.type
                }).then(_ => {
                    this.msg()
                }).catch(_ => {
                    this.cancel&&this.cancel();
                }):this.msg();

            }
        }
    }
</script>
<style scoped>
</style>