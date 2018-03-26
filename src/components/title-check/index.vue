<template>
    <el-dropdown class="downMeun m-right-20 fr">
          <span class="el-dropdown-link p-left-30">
            下拉菜单<i class="el-icon-caret-bottom el-icon--right p-left-50"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="item in activeList" :key="item">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        data() {
            return {
                activeList:["经纪之声","今日财经","奔跑吧兄弟"]
            }
        },
        mounted() {

        }
    }
</script>
<style lang="stylus">
    @import "~styles-var";
    menu-width = 164px;
    .downMeun {
        line-height-h(40)
        background-color #f3f3f3;
        width menu-width + 2px;
        color #111111;
    }
    .el-dropdown-menu__item{
        width menu-width;
    }
    &.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
        color: yellow;
    }
</style>