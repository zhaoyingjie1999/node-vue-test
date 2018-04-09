<template>
<ul class="app-index-menu-list">    
    <li class="app-index-menu-item">
        <img class="app-index-menu-user-logo" src="http://img.infinitynewtab.com/wallpaper/2329.jpg">
        <div class="app-index-menu-user-name">
            呵呵哒
        </div>
    </li>
</ul>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        userList: {
            type: Array,
            default: () => []
        }
    },
    components: {
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.app-index {
    width: 100%;
}
</style>