import {getAxios, postAxios} from '../util'
import {getListAPI} from '../api'
import axios from 'axios';

axios.defaults.withCredentials = true;
const state = {
  loading: false,
  data: {name:'测试getter'}
};

const getters = {
  getUserInfo: function (state) {
    return state.data
  },
};


const mutations = {
  getUserInfoMutaion(state, payload) {
    state.data = payload
  },
};

const actions = {
  getUserInfoAction({commit, state, rootState}, reqData) {


      return axios.post(getListAPI, reqData)
        .then(function (rep) {
          if (rep.data.code === "000") {

            return rep
          } else {
            return rep
          }
        })
        .catch(function (error) {
          console.log(error);
        });

  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
