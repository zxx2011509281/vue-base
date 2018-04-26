import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import index from './modules/index'
import test from './modules/test'

Vue.use(Vuex)

var userInfo = JSON.parse(sessionStorage && sessionStorage.user || '{}')

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
  },
  actions: {
  },
  modules: {
    index,
    test
  },
  strict: true,
  namespaced: true
})
