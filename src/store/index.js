import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 0,
        user: null
    },
    getters: {
        getNum: state => `num getter is ${state.num}`,
        isUser(state) {
            if (state.user !== null) return true
            return false
        }
    },
    mutations: {
        changeNum(state, num) {
            state.num = num
        },
        changeUser(state, data) {
            state.user = data
        }
    },
    actions: {
        change({ commit }, num) {
            commit('changeNum', num)
        },
        userLogin({ commit }, data) {
            commit('changeUser', data)
        },
        userLogout({ commit }, data) {
            commit('changeUser', null)
        },
    }
})