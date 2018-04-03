<template>
<div id="app">
    <transition>
        <router-view></router-view>
    </transition>
</div>
</template>

<script>

export default {
    data() {
        return {
        }
    }
}
</script>

<style lang="scss">
#app {
}
html, body, #app {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
}
</style>
