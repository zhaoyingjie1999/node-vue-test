<template>
<div class="login">
    <div class="login-form">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #21BB9D;
    .login-form {
        background-color: #fff;
        width: 400px;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 6px;
    }
}
</style>
