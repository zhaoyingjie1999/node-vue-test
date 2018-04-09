<template>
<div class="login-registered" @keypress.enter="registered">
    <el-form :model="form" label-width="80px" label-position="left">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.pass"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="registered">注册</el-button>
            <el-button type="text" @click="goToLogin">已有账号, 登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { userRegistered } from '~api'

export default {
    data() {
        return {
            form: {
                name: '',
                pass: '',
                age: '',
                sex: '',
                phone: ''
            }
        }
    },
    methods: {
        registered() {
            console.log('注册')
            userRegistered(this.form.name, this.form.pass, this.form.age, this.form.sex, this.form.phone).then(res => {
                console.log('注册成功', res)
            }).catch(res => {
                console.log('注册失败', res)
            })
        },
        goToLogin() {
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>

<style lang="scss">
.login-registered {
    width: 100%;
}
</style>
