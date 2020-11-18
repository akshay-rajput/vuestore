import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-instance';
import global_axios from 'axios';
import router from '../router/routes'

import productlist from './productlist'
import { Date } from 'core-js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    email_used_for_login: '',
    current_user: {},
    productData: []
  },
  mutations: {
    mut_initProducts(state, productlist){
      // console.log("Mutation initProduct ",productlist.productsArray);
      state.productData = productlist.productsArray;
      // console.log("Array : ", state.productData.length);
    },

    // store email used by user in state
    mut_loginUsed(state, authData){
      state.email_used_for_login = authData.email;
    },

    // authenticate user by storing token in state
    mut_authUser(state, userData){
      state.idToken = userData.token;
      state.userId = userData.userId;
    },

    // store current_user data in state
    mut_loggedInUser(state, fetchedUser){
      state.current_user = fetchedUser.data;
      console.log("Inside Mutation: ", state.current_user);
    },

    // on logout clear all tokens
    mut_logout(state){
      state.idToken = null;
      state.userId = null;

      // remove local token
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
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

    action_logoutTimer({commit}, expirationTime){
      setTimeout(() => {
        console.log("Time expired : log out");
        commit('mut_logout');
      }, expirationTime * 1000);
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
          // Autologin
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('token', response.data.idToken);
          const currentTime = new Date();
          console.log("Current Time: ", currentTime.getTime());
          const expiry = new Date(currentTime.getTime() + response.data.expiresIn)
          console.log("expiration time: ", expiry);
          localStorage.setItem('tokenExpiry', expiry);

          // dispatch to store in db
          dispatch('action_storeUser', authData)

          // dispatch to autologout
          dispatch('action_logoutTimer', response.data.expiresIn);
        })
        .catch(error => console.log("Error---: ", error))
    },
    action_storeUser(state, userData){
      // store user only if token is present
      if(!this.state.idToken){
        return
      }
      else{
        global_axios.post('/users.json', userData)
        .then(res => console.log("res: storeuser: ",res))
        .catch(err => console.log("error--: ", err))
      }
    },
    
    // user login
    action_login({commit, dispatch}, authData){
      // store attempted login email in state
      commit('mut_loginUsed', authData);

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
        // Autologin
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('token', response.data.idToken);
        const currentTime = new Date();
        console.log("Current Time: ", currentTime.getTime());
        const expiry = new Date(currentTime.getTime() + (response.data.expiresIn * 1000))
        console.log("expiration time: ", expiry);
        localStorage.setItem('tokenExpiry', expiry);

        // fetch userdata of logged in user
        dispatch('action_fetchUser')

        // dispatch to autologout
        dispatch('action_logoutTimer', response.data.expiresIn);
      })
      .catch(error => console.log("ErrorLogin---: ", error))
    },

    action_fetchUser({commit}){
      // console.log("Pass for fetch: ", authData);
      if(!this.state.idToken){
        return
      }
      else{
        global_axios.get('/users.json')
        .then(res => {
          const allUsers = res.data;
          
          // loop through all users in database
          for (const recordId in allUsers) {
            const fetchedUser = allUsers[recordId];

            // find logged in user
            if (fetchedUser.email == this.state.email_used_for_login) {
              console.log("Fetched User: ", fetchedUser);
              // store logged in users info in state
              commit('mut_loggedInUser', {data: fetchedUser});
            }
          }
          // console.log("Fetched Users: ");
        })
      }
    },

    action_autologin({commit}){
      const localToken = localStorage.getItem('token');
      if(!localToken){
        return
      }
      else{
        console.log("local token found AUTOLOGIN", localToken);
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const now = new Date()
        if(now >= tokenExpiry){
          console.log("~~~ Token Expired ~~~");
          return
        }
        else{
          const userId = localStorage.getItem('userId');
          commit('mut_authUser', {
            token: localToken,
            userId: userId
          })
        }
      }
    },
    action_logout({commit}){
      console.log("~~  logging out");
      commit('mut_logout');
      
      // avoid duplicate path error
      const path = '/'
      if (router.path !== path){
        // this.$router.push(path)
        router.replace('/');
      }
      // router.replace('/');
    }
  },
  getters: {
    getProducts: state => {
      return state.productData;
    },
    getUserData: state => {
      return state.current_user;
    },
    getLoginStatus: state => {
      return state.idToken !== null;
    }
  }
})
