import Vue from 'vue'
import VueRouter from 'vue-router'
import { setTitle } from '../utils/setTitle'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: '/index',
            component: resolve => require(['../pages/Login/Index.vue'], resolve),
            beforeRouteEnter: (to, from, next) => {
                setTitle('首页')
                next()
            }
        },
        {
            path: '/login',
            component: resolve => require(['../pages/Login/Index.vue'], resolve),
            beforeRouteEnter: (to, from, next) => {
                setTitle('登录')
                next()
            },
            children: [{
                    path: '',
                    component: resolve => require(['../pages/Login/Login/Login.vue'], resolve),
                    beforeRouteEnter: (to, from, next) => {
                        setTitle('登录')
                        next()
                    }
                },
                {
                    path: 'registered',
                    component: resolve => require(['../pages/Login/Registered/Registered.vue'], resolve),
                    beforeRouteEnter: (to, from, next) => {
                        setTitle('注册')
                        next()
                    }
                },
                {
                    path: 'reset',
                    component: resolve => require(['../pages/Login/Reset/Reset.vue'], resolve),
                    beforeRouteEnter: (to, from, next) => {
                        setTitle('找回密码')
                        next()
                    }
                },
            ]
        },
    ]
})