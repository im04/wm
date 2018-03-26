<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.loading.count!=0">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        console.log(this.$store.state.login)
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
