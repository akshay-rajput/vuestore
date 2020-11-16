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
    productData: []
  },
  mutations: {
    mut_initProducts(state, productlist){
      console.log("Mutation initProduct ",productlist.productsArray);
      state.productData = productlist.productsArray;
      // console.log("Array : ", state.productData.length);
    },
    mut_authUser(state, userData){
      state.idToken = userData.token;
      state.userId = userData.userId;
    }
  },
  actions: {
    // initialise products
    action_initialiseProducts({commit, dispatch}){
      commit('mut_initProducts', productlist)

      // dispatch action to store and pass array as payload
      dispatch('action_storeProducts', this.state.productData)
    },
    action_storeProducts(state, productData){
      global_axios.put('/products.json', productData)
        .then(res => console.log("res: storeProduct: ",res))
        .catch(err => console.log("error in store product--: ", err))
    },

    // user signup
    action_signup({commit, dispatch}, authData){
      axios.post(':signUp?key=AIzaSyDpYBZSKJcU0BHUmOLlhBmnod6WwTdFljE', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(response => {
          console.log("Response: ", response);
          commit('mut_authUser', {
            token: response.data.idToken,
            userId: response.data.localId
          })

          // dispatch to store in db
          dispatch('action_storeUser', authData)
        })
        .catch(error => console.log("Error---: ", error))
    },
    action_login({commit}, authData){
      console.log("Action called: ", authData);
      axios.post(':signInWithPassword?key=AIzaSyDpYBZSKJcU0BHUmOLlhBmnod6WwTdFljE', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(response => {
        console.log("Logged in: ", response);
        commit('mut_authUser', {
          token: response.data.idToken,
          userId: response.data.localId
        })
      })
      .catch(error => console.log("ErrorLogin---: ", error))
    },

    action_storeUser(state, userData){
      global_axios.post('/users.json', userData)
        .then(res => console.log("res: storeuser: ",res))
        .catch(err => console.log("error--: ", err))
    }
  },
  getters: {
    getProducts: state => {
      return state.productData;
    }
  }
})
