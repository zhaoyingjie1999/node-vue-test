import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: []
})