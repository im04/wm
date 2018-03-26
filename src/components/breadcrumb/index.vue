<template>
    <div class="breadcrumb">
        <el-breadcrumb class="fl" separator="/">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item.path">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button size="small" :plain="true" class="fr m-right-20 m-top-13 width-90" icon="arrow-left" @click="$router.back()">返回</el-button>
    </div>
</template>
<script>
    export default {
        watch: {
            $route() {
                console.log(this.$router);
                console.log(this.$route);
            }
        }
    }
</script>
<style lang="stylus">
    .breadcrumb {
        overflow hidden;
    }
</style>