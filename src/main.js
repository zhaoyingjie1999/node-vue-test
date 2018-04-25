import Vue from 'vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import App from './App.vue'
import { getUser } from '~api'
import { getToken, isToken } from '~utils/token'
import './assets/css/reset.css'
import './assets/css/index.css'
// import 'element-ui/lib/theme-default/index.css'
import './assets/scss/element.scss'

Vue.use(Element)
Vue.config.devtools = true

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        next()
    } else {
        if (store.getters.isUser && isToken()) {
            next()
        } else {
            if (isToken()) {
                getUser().then(res => {
                    console.log('getUser', res)
                    store.dispatch('userLogin', res.data)
                    next()
                }).catch(res => {
                    next('/login')
                })
            } else {
                next('/login')
            }
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})