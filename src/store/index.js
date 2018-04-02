import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 0
    },
    getters: {
        getNum: state => `num getter is ${state.num}`
    },
    mutations: {
        changeNum(state, num) {
            state.num = num
        }
    },
    actions: {
        change({ commit }, num) {
            commit('changeNum', num)
        }
    }
})