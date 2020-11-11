import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-instance';
import global_axios from 'axios';

import productlist from './productlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    productdata: []
  },
  mutations: {
    authUser(state, userData){
      state.idToken = userData.token;
      state.userId = userData.userId;
    }
  },
  actions: {
    signup({commit, dispatch}, authData){
      console.log("list is:", productlist);
      axios.post(':signUp?key=AIzaSyDpYBZSKJcU0BHUmOLlhBmnod6WwTdFljE', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(response => {
          console.log("Response: ", response);
          commit('authUser', {
            token: response.data.idToken,
            userId: response.data.localId
          })

          // dispatch to store in db
          dispatch('storeUser', authData)
        })
        .catch(error => console.log("Error---: ", error))
    },
    storeUser(state, userData){
      global_axios.post('/users.json', userData)
        .then(res => console.log("res: storeuser: ",res))
        .catch(err => console.log("error--: ", err))
    }
  },
  getters: {

  }
})
