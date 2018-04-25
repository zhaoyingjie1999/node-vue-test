<template>
<div>
    <button @click="ccc">test</button>
    <div class="index">
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            io: null
        }
    },
    created() {
        console.log('呵呵哒')
    },
    created() {
        console.log(io)
        this.io = io()
        this.io.on('test', (data) => {
            console.log('io on test data: ', data)
        })
    },
    methods: {
        ccc(e) {
            console.log(e)
            this.io.emit('test', (data) => {
                console.log('io emit test data: ', data)
            })
        }
    }
}
</script>

<style lang="scss">

</style>
