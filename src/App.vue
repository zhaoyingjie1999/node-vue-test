<template>
<div id="app">
    <div>
        {{ message }}
    </div>
    <textarea v-model="message"></textarea>
</div>
</template>

<script>
import A from './components/a'

export default {
    data() {
        return {
            message: ''
        }
    }
}
</script>

<style lang="scss">

</style>
