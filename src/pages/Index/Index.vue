<template>
<div class="app-index">
    <div class="app-index-container">
        <div class="app-index-menu">
            <index-menu :userList="userList"></index-menu>
        </div>
        <div class="app-index-content">
            <div class="app-index-title">
                {{ userTitle }}
            </div>
            <div class="app-index-message">
                
            </div>
            <div class="app-index-editor">
                <div class="app-index-editor-menu">
                    
                </div>
                <div class="app-index-editor-text">
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import IndexMenu from '../../components/IndexMenu/IndexMenu'

export default {
    data() {
        return {
            userList: []
        }
    },
    components: {
        IndexMenu
    },
    methods: {

    }
}
</script>

<style lang="scss">
.app-index {
    width: 100%;
    .app-index-container {
        max-width: 1080px;
        min-width: 992px;
        margin: 0 auto;
    }
}
</style>