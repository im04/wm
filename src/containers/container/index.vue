<template>
    <div>
        <component v-if="$route.matched.length == level" v-bind:is="name"></component>
        <router-view/>
    </div>
</template>
<script>
    export default {
        props:['name','component','level'],
        watch:{
            component(newVal) {
                !(this.name in this.$options.components)&&(this.$options.components[this.name] = newVal);
            }
        },
        created() {
            this.$options.components[this.name] = this.component;
        }
    }
</script>
<style scoped>

</style>