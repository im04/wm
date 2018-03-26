<template>
    <div class="edit-block">
        <div class="edit-title">
            <div class="title-text">{{title}}</div>
            <div class="title-right"></div>
        </div>
        <div class="edit-content">
            <slot/>
        </div>
    </div>
</template>
<script>
    export default {
        props:['title']
    }
</script>
<style lang="stylus">
    title-height = 50px;
    title-width = 200px;
    title-bg-color = #9ea7b4;
    title-color = white;
    title-font-size = 20px;
    .edit-block {
        margin-top 30px;
        overflow hidden;
        font-size 14px;
        &:first-child {
            margin-top 0;
        }
        .edit-title {
            float left;
            width title-width;
            height title-height;
            overflow hidden;
            color title-color;
            font-size title-font-size;
            text-align center;
            >div {
                float left;
            }
            .title-text {
                background-color title-bg-color;
                width: title-width - 25;
                height title-height;
                line-height title-height;
            }
            .title-right {
                margin-right -(title-height / 2);
                border (title-height / 2) solid #9ea7b4;
                border-bottom-color transparent;
                border-top-color transparent;
                border-right-color transparent;
            }
        }
        .edit-content {
            margin-left title-width + 25;
            overflow hidden;
        }
    }
</style>