<template>
    <div class="home">
        <div class="nav">
            <div class="nav-logo">
                <router-link to="/liveSetting">哇妙后台</router-link>
            </div>
            <div class="nav-menu">
                <nav-component/>
            </div>
        </div>
        <div class="form">
            <div class="form-title bg-white">
                <check-component/>
            </div>
            <div class="form-nav">
                <breadcrumb-component/>
            </div>
            <div class="form-body">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
    import checkComponent from 'components/title-check';
    import navComponent from 'components/nav';
    import breadcrumbComponent from 'components/breadcrumb';
    export default {
        components: {
            //headComponent,
            navComponent,
            breadcrumbComponent,
            checkComponent
        }
    }
</script>
<style lang="stylus">
    @import "~styles-var";
    .home {
        fixed-full() {
            position fixed;
            top 0;
            bottom: 0;
        };
        default-margin-lr(x,y) {
            margin-left x
            margin-right y
        };
        default-padding(x) {
            padding x
        };
        default-padding-lr(x,y) {
            padding-left x
            padding-right y
        };
        min-width 1440px;
        .nav {
            default-fs = 14px;
            item-fs = 24px;
            item-color = white;
            nav-bg = #2f323a;
            logo-bg = #202128;
            fixed-full();
            overflow-y-auto();
            width 240px;
            background-color nav-bg;
            font-size default-fs;
            z-index 10;
            .nav-logo{
                logo-fs = 20px;
                default-padding-lr(20px,20px);
                line-height-h(60);
                background-color nav-bg;
                font-size logo-fs;
                color item-color;
                font-weight bold;
            }
            .nav-menu{
                color item-color;
            }
            //重写el
            .el-menu {
                border-right 0;
                li {
                    background-color  nav-bg;
                    color item-color
                    .is-active {
                        background-color: logo-bg;
                    }
                }

                .el-submenu .el-submenu__title {
                    font-size 14px;
                }
                .el-menu-item:hover, .el-submenu__title:hover{
                    background-color logo-bg;
                }

            }
        }
        .form {
            margin-left 240px;
            overflow hidden;
            .form-title {
                padding-top 6px;
                padding-bottom 6px;
                overflow hidden;
            }
            .form-nav {
                df-border-tb();
                line-height-h(56);
                .el-breadcrumb {
                    line-height 56px;
                    font-size 16px;
                    default-margin-lr(20px,20px);
                }
            }
            .form-body {

            }
        }
    }
</style>