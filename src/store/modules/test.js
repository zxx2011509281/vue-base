import {getAxios, postAxios} from '../util'
import {createFolderAPI} from '../api'
import axios from 'axios';

axios.defaults.withCredentials = true;
const state = {
  loading: false,
  data: {1:2}
};

const getters = {
  getUserInfo: function (state) {
    return state.data
  },
};


const mutations = {
  getUserInfoMutaions(state, payload) {
    state.data = payload
  },
};

const actions = {
  getUserInfoActions({commit, state, rootState}, reqData) { // 获取登录用户信息
    var dataKeysArr = Object.keys(state.data)
    if (dataKeysArr.length === 0 && false === state.loading) {
      return axios.post(createFolderAPI, reqData)
        .then(function (rep) {
          if (rep.data.code === "000") {
            commit('getUserInfoMutaions', rep.data.data);
            return {}
          } else {
            return rep
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
