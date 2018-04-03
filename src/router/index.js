import Vue from 'vue'
import VueRouter from 'vue-router'
import { setTitle } from '../utils/setTitle'
import A from '../components/a.vue'
import B from '../components/b.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: '/aaa',
            component: A,
            beforeRouteEnter: (to, from, next) => {
                setTitle('AAA')
                next()
            }
        },
        {
            path: '/bbb',
            component: B,
            beforeRouteEnter: (to, from, next) => {
                setTitle('BBB')
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