<template>
<div class="login-auth" @keypress.enter="login">
    <el-form :model="form" label-width="80px" label-position="left">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.pass"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="text" @click="goToRegistered">注册</el-button>
            <el-button type="text" @click="goToReset">找回密码</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { userLogin } from '~api'
import {
    setToken
} from '~utils/token'

export default {
    data() {
        return {
            form: {
                name: '',
                pass: ''
            }
        }
    },
    created() {
    },
    methods: {
        login() {
            console.log('登录')
            userLogin(this.form.name, this.form.pass).then(res => {
                console.log('登录成功', res)
                setToken(res.data.token)
                this.$store.dispatch('userLogin', res.data.user)
                this.$router.push({
                    path: '/socket'
                })
            }).catch(res => {
                console.log('登录失败', res)
            })
        },
        goToRegistered() {
            this.$router.push({
                path: '/login/registered'
            })
        },
        goToReset() {
            this.$router.push({
                path: '/login/reset'
            })
        }
    }
}
</script>

<style lang="scss">
.login-auth {
    width: 100%;
}
</style>
