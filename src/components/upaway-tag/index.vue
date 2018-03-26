<template>
    <div class="upaway-tag">
        <slot/>
        <div v-if="isUpaway" class="tag"></div>
    </div>
</template>
<script>
    export default {
        props: {
            isUpaway: Boolean
        }
    }
</script>
<style lang="stylus" scoped>
    .upaway-tag {
        .tag {
            position absolute;
            top 0;
            left 0;
            border 15px solid #ff6600;
            border-bottom-color transparent;
            border-right-color transparent;
            &:before{
                content '荐'
                position absolute;
                top -12px;
                left -12px;
                color white;
                font-size 12px;
                line-height 1;
            }
        }

    }
</style>