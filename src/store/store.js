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
    cart: [],
    wishlist: [],
    productData: []
  },
  mutations: {
    mut_initProducts(state, productlist){
      // console.log("Mutation initProduct ",productlist.productsArray);
      state.productData = productlist.productsArray;

      state.productData.forEach(product => {
        product.quantity = 1;
      });
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
      if(fetchedUser != null){
        state.current_user = fetchedUser.data;
        // console.log("Mutation: fetched User", fetchedUser.data);
      }
      else{
        state.current_user = null
      }
      // console.log("Inside Mutation: ", state.current_user);
    },

    // on logout clear all tokens
    mut_logout(state){
      state.idToken = null;
      state.userId = null;

      // remove local token
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },

    // store products inside cart in state
    mut_addToCart(state, payload){
      // check if duplicate entry
      var duplicateEntry = state.cart.find(function(stateCartItem){
        return stateCartItem.id == payload.id;
      })

      if(duplicateEntry){
        // update quantity of existing item
        duplicateEntry.quantity = payload.quantity;
      }
      else{
        // push whole item in state.cart
        state.cart.push(payload);
      }
      // console.log("ADD CART mutation: ", state.cart);
    },
    // sync cart with db
    mut_syncCart(state, fetchedCart){
      // console.log("inside Mut_AddCart : ", payload);
      state.cart = fetchedCart;
      // state.cart.push(fetchedCart);
      // console.log("SYNC CART Mutation: ", state.cart);
    },
    // sync wishlist with db
    mut_syncWishlist(state, fetchedWishlist){
      // console.log("inside Mut_AddCart : ", payload);
      state.wishlist = fetchedWishlist;
      // state.cart.push(fetchedCart);
      // console.log("SYNC Wishlist Mutation: ", state.wishlist);
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
        // console.log("Time expired : log out");
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
          // console.log("Response: ", response);
          commit('mut_authUser', {
            token: response.data.idToken,
            userId: response.data.localId
          })
          // Autologin
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('token', response.data.idToken);
          const currentTime = new Date();
          // console.log("Current Time: ", currentTime.getTime());
          const expiry = new Date(currentTime.getTime() + response.data.expiresIn)
          // console.log("expiration time: ", expiry);
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
        // .then(res => console.log("res: storeuser: ",res))
        // .catch(err => console.log("error--: ", err))
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
        // console.log("Logged in: ", response);
        commit('mut_authUser', {
          token: response.data.idToken,
          userId: response.data.localId
        })
        // Autologin
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('token', response.data.idToken);
        const currentTime = new Date();
        // console.log("Current Time: ", currentTime.getTime());
        const expiry = new Date(currentTime.getTime() + (response.data.expiresIn * 1000))
        // console.log("expiration time: ", expiry);
        localStorage.setItem('tokenExpiry', expiry);

        // fetch userdata of logged in user
        dispatch('action_fetchUser')

        // dispatch to autologout
        dispatch('action_logoutTimer', response.data.expiresIn);
      })
      // .catch(error => console.log("ErrorLogin---: ", error))
    },

    action_fetchUser({commit}){
      // console.log("Pass for fetch: ", authData);
      if(!this.state.idToken){
        commit('mut_loggedInUser', null);
        return false;
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
              // insert firebase db record id in state
              fetchedUser.userId = recordId;
              localStorage.setItem('userId', fetchedUser.userId);
              
              // console.log("Fetched User: ", fetchedUser);
              // store logged in users info in state
              commit('mut_loggedInUser', {data: fetchedUser});
              // return recordId;
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
        // console.log("local token found AUTOLOGIN", localToken);
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const now = new Date()
        if(now >= tokenExpiry){
          // console.log("~~~ Token Expired ~~~");
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
    action_logout({commit, dispatch}){
      // console.log("~~  logging out");
      commit('mut_logout');
      
      // avoid duplicate path error
      const path = '/'
      if (router.path !== path){
        // console.log('routing to homepage');
        // this.$router.push(path)
        router.replace('/');
      }
      
      // initialise products again
      dispatch('action_initialiseProducts');
    },

    action_addToCart({commit, dispatch}, payload){
      // get db userid of logged in user
      const userId = localStorage.userId;

      // path of firebase cartdb
      const fbUserCartPath = '/users/'+userId+'/cart.json';
      
      // sync cart before adding new product
      dispatch('action_syncCart').then(response => {
        console.log("1. Response after sync dispatch: ", response);

        // check if adding a duplicate product to cart
        const stateCart = this.state.cart;
        var duplicateEntry = {};
        // console.log("2. After sync STATECART: ", this.state.cart);

        // if cart already exists, check if adding duplicate
        if(stateCart.length > 0){
          duplicateEntry = stateCart.find(function(stateCartItem){
            return stateCartItem.id == payload.id;
          })
          
          if(duplicateEntry){
            console.log("Duplicate: ", duplicateEntry.name);
            payload.quantity += duplicateEntry.quantity;
              
              // duplicate found, delete old record from db
              dispatch('action_removeFromCart', payload).then(response => {
                console.log("4. Response after remove dispatch: ", response);

                // after remove, add to cart with updated quantity
                  global_axios.post(fbUserCartPath, payload)
                  .then(response => {
                    console.log("5. Append to Cart response: ", response);
                    
                    console.log("commit payload: ", payload);
                    // commit to state
                    commit('mut_addToCart', payload);
                })
                .catch(error => {
                    console.log("Error in AddCart: ", error);
                })
              });
              
          }
          else{
            global_axios.post(fbUserCartPath, payload)
              .then(response => {
                console.log("~~ 4. NOT DUPLICATE Cart response: ", response);
      
                // commit to state
                commit('mut_addToCart', payload);
              })
              .catch(error => {
                  console.log("Error in AddCart: ", error);
              })
          }
        }
        else{
          global_axios.post(fbUserCartPath, payload)
          .then(response => {
            console.log("3. Added to CartEMPTY: ", response);

            // commit to state
            commit('mut_addToCart', payload);
          })
          .catch(error => {
              console.log("Error in AddCart: ", error);
          })
          // was commit(mut addtocart) here....
        }

      });
      
      // sync cart AFTER adding new product
      dispatch('action_syncCart').then(response => {
        console.log("1. sync inside ADDCART: ", response);
      });

    },
    action_addToWishlist({dispatch}, product){

      console.log("Passed product for wishlist", product);
      // get db userid of logged in user
      const userId = localStorage.userId;
      
      // dispatch('action_syncWishlist').then(response =>{
        

      // })
      // console.log("response sync wishlist: ", response);

          // post product to firebase cart
        const fbUserWishlistPath = '/users/'+userId+'/wishlist.json';
        
        // Add to wishlist
        if(product.wishlisted){
          console.log("Product is wishlisted: Adding to wishlist");
          global_axios.post(fbUserWishlistPath, product)
          .then(response => {
              console.log("Wishlist response: ", response);

              // sync again after adding/removing from wishlist
              dispatch('action_syncWishlist').then(response => {
                console.log("1. sync after ADD wishlist: ", response);
              });
          })
          .catch(error => {
              console.log("Error in AddWishlist: ", error);
          })
        }

        // remove from wishlist
        else{
          console.log("---- remove " + product.name+ " from wishlist");
            // path of wishlist
            const fbWishlistPath = '/users/'+userId+'/wishlist.json';
            
            // get wishlist
            global_axios.get(fbWishlistPath)
            .then(gotWishlist => {
                // console.log("GOT Wishlist from DB: ", gotWishlist);
                
                // find id of item in wishlist & remove that id.item
                const wishlistItems = gotWishlist.data;
                for (const recordId in wishlistItems) {

                    const currentItem = wishlistItems[recordId];
                    if (currentItem.id == product.id) {
                        console.log("removing from wishlist: ", currentItem.name);                            
                        // path of item to be removed from wishlist
                        const fbRemoveWishlistPath = '/users/'+userId+'/wishlist/'+recordId+'.json';
                    
                        global_axios.delete(fbRemoveWishlistPath, product)
                        .then(response => {
                          console.log("RemoveWishlist response: ", response);

                          // sync again after adding/removing from wishlist
                          dispatch('action_syncWishlist').then(response => {
                            console.log("1. sync after REMOVE wishlist: ", response);
                          });
                        })
                        .catch(error => {
                            console.log("Error in RemoveWishlist: ", error);
                        })
                    }
                }
                
                
            })
            .catch(error => {
                console.log("Error fetching wishlist", error);
            })
            
        }
      
      
    },
    action_syncWishlist({commit}){
      return new Promise((resolve, reject) => {
        // get db userid of logged in user
        const userId = localStorage.userId;

        // path of wishlist in DB
        const fbUserWishlistPath = '/users/'+userId+'/wishlist.json';

        global_axios.get(fbUserWishlistPath)
        .then(response => {
          const fetchedWishlist = [];
          for (const record in response.data) {
              const fetchedWishlistItem = response.data[record];
              
              fetchedWishlist.push(fetchedWishlistItem);
          }
          // console.log("Inside sync action: ", fetchedCart);
          
          resolve(response);
          commit('mut_syncWishlist', fetchedWishlist);

          console.log("0.1 Resolved syncWishlist");
        })
        .catch(error => {
          reject(error);
        })
      })
    },
    action_syncCart({commit}){
      return new Promise((resolve, reject) => {
        // get db userid of logged in user
        const userId = localStorage.userId;

        // post product to firebase cart
        const fbUserCartPath = '/users/'+userId+'/cart.json';

        global_axios.get(fbUserCartPath)
        .then(response => {
          const fetchedCart = [];
          for (const record in response.data) {
              const fetchedCartItem = response.data[record];
              
              fetchedCart.push(fetchedCartItem);
          }
          // console.log("Inside sync action: ", fetchedCart);
          
          resolve(response);
          commit('mut_syncCart', fetchedCart);

          console.log("0. Resolved syncCArt");
        })
        .catch(error => {
          reject(error);
        })
      })
    },
    action_removeFromCart({dispatch}, productToRemove){
      return new Promise((resolve, reject) => {
        // get db userid of logged in user
        const userId = localStorage.userId;
        console.log("passed to delete: ", productToRemove);

        // path of firebase cartdb
        const fbUserCartPath = '/users/'+userId+'/cart.json';

        // get cartlist
        global_axios.get(fbUserCartPath)
        .then(gotUserCart => {
          // console.log("4.1 GOT userCartlist: ", gotUserCart.data);
          
          // find id of item in cartlist & remove that id.item
          const db_userCartItems = gotUserCart.data;
          for (const recordId in db_userCartItems) {

              const currentItem = db_userCartItems[recordId];
              if (currentItem.id == productToRemove.id) {
                  // console.log("removing : ", currentItem.name);                            
                  // path of item to be removed from cartlist
                  const fbRemoveCartItemPath = '/users/'+userId+'/cart/'+recordId+'.json';
              
                  global_axios.delete(fbRemoveCartItemPath, productToRemove)
                  .then(response => {
                      console.log("Remove Cart item response: ", response);

                      // sync cart AFTER removing new product
                      dispatch('action_syncCart').then(response => {
                        console.log("1. sync inside REMOVE: ", response);
                      });
                  })
                  .catch(error => {
                      console.log("Error in Remove cart item: ", error);
                  })
              }
          }

          resolve(gotUserCart);
          // console.log("4.2 resolve GetUserCart");
        })
        .catch(error => {
          // console.log("reject GETUSERCART error: ");
          reject(error);
        })
      })
    },
    action_updateProduct(state, productToUpdate){
      // get db userid of logged in user
      const userId = localStorage.userId;
      // path of firebase cartdb
      const fbUserCartPath = '/users/'+userId+'/cart.json';

      // get product cart items & find entry to update
      global_axios.get(fbUserCartPath)
        .then(response => {
          // const fetchedCart = [];
          for (const record in response.data) {
              const fetchedCartItem = response.data[record];
              
              if(fetchedCartItem.id == productToUpdate.id){
                // console.log("found element");

                // db path of cart item to update
                const fbUserCartProductPath = '/users/'+userId+'/cart/'+record+'.json';

                fetchedCartItem.quantity = productToUpdate.quantity;
                fetchedCartItem.wishlisted = productToUpdate.wishlisted;

                global_axios.put(fbUserCartProductPath, productToUpdate)
                  .then(response => {
                    console.log("6. Update to Cart response: ", response);
                })
                .catch(error => {
                    console.log("Error in UpdateCart: ", error);
                })

              }
              // fetchedCart.push(fetchedCartItem);
          }
          // console.log("Inside sync action: ", fetchedCart);
          
          // resolve(response);
          // commit('mut_syncCart', fetchedCart);

          // console.log("0. Resolved syncCArt");
        })
        .catch(error => {
          console.log(error);
        })
      
      // update to cart
      // 
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
    },
    getCartItems: state => {
      return state.cart;
    },
    getWishlist: state => {
      // console.log("getter wishlist: ", state.wishlist);
      return state.wishlist;
    }
  }
})
