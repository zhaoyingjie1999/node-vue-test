<template>
    <div class="login-reset" @keypress.enter="reset">
        <el-form :model="form" label-width="80px" label-position="left">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.pass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="reset">找回</el-button>
            </el-form-item>
        </el-form>
</div>
</template>

<script>
import { userReset } from '~api'

export default {
    data() {
        return {
            form: {
                name: '',
                pass: '',
                phone: ''
            }
        }
    },
    methods: {
        reset() {
            console.log('重置')
            userReset(this.form.name, this.form.pass, this.form.phone).then(res => {
                console.log('重置成功', res)
            }).catch(res => {
                console.log('重置失败', res)
            })
        },
    }
}
</script>

<style lang="scss">
.login-reset {
    width: 100%;
}
</style>
