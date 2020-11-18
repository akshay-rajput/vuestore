<template>
  <div class="maincontainer">
    <!-- <span class="text-gray-700">This is navbar.... </span>     -->
    <nav id="navbar">
      <div class="container mx-auto">
        <!-- flex container for navbar -->
        <div class="flex justify-between items-center py-4 px-3">
          <!-- site logo -->
          <div class="navlogo">
            <router-link :to="{name:'Home', params: {section: ''}}">
              <a class="">
                <img src="../assets/ghost_logo_black.png" alt="VueStore Logo" class="">
              </a>
            </router-link>
          </div>
          
          <!-- navlinks -->
          <div class="text-center flex items-center">
            <!-- <div class="mx-3">{{current_user.email}}</div> -->
            

            <div>
            <div class="sm:flex">
              <div class="loginlinks" v-if="!isLoggedIn">
                <a href="javascript:void(0);" @click="$refs.loginModal.openModal()" class="btn-login py-1 px-2 mx-2 border border-gray-700 rounded-lg">Login</a>  
                <a href="javascript:void(0);" @click="$refs.signupModal.openModal()"  class="btn-signup py-1 px-2 mx-2 bg-teal-700 rounded-lg">Sign Up</a>
              </div>
              
              <div class="accountlinks flex justify-center items-center" v-if="isLoggedIn">
                <router-link to='/cart' tag="a" class="bg-gray-300 rounded-full p-2 mx-2" title="Go to Cart">
                  <!-- <span class="fa fa-cart-arrow-down"></span> -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width=24 height=24 viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </router-link>
                <a href="javascript:void(0);" class=" bg-gray-300 rounded-full p-2 mx-2" title="Account">
                  <!-- <span class="fa fa-user"></span> -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width=24 height=24 viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </a>
                
                <div class="dropdown inline-block relative">
                  <button class=" bg-gray-300 rounded-full p-2 mx-2 " title="Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  <div class="navlinks dropdown-menu absolute hidden text-center mr-4">
                    <router-link v-if="$route.name != 'Home'" :to="{path: '/#products'}" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Products</router-link>
                    <router-link v-if="$route.name != 'Home'" :to="{path: '/#contact'}" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Contact</router-link>
                    <!-- <router-link :to="{name:'Cart', params: {section: 'cart'}}">Cart</router-link> -->

                    <!-- if on homepage show these links instead to scroll to sections -->
                    <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('products')" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Products</a>
                    <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('contact')" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Contact</a>

                    <a href="javascript:void(0);" @click="logoutUser" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" title="Logout">
                      Logout
                      <!-- <span class="fa fa-sign-out-alt"></span> -->
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg> -->
                    </a>
                  </div>
                </div>
              </div>
            </div>

            </div> 
          </div>
        </div>
      </div>
    </nav>

    <!-- signup modal -->
    <vue-modal ref="signupModal">
      <template v-slot:header>
        <!-- <h3>Signup</h3> -->
        <span class="">&nbsp;</span>
      </template>

      <template v-slot:body>
        <the-signup></the-signup>
      </template>
    </vue-modal>

    <!-- login modal -->
    <vue-modal ref="loginModal">
      <template v-slot:header>
        <!-- <h3 class="hidden">Signup</h3> -->
        <span class="">&nbsp;</span>
      </template>

      <template v-slot:body>
        <the-login></the-login>
      </template>
    </vue-modal>
  </div>
</template>

<script>
import TheSignup from '@/components/TheSignup.vue'
import TheLogin from '@/components/TheLogin.vue'
import vueModal from './TheModal'

export default {
  name: 'TheNav',
  data: function(){
    return{
      user: ''
    }
  },
  // computed:{
  //   // check if user data is fetched 
  //   current_user(){
  //     return this.$store.getters.getUserData;
  //   }
  // },
  methods: {
    gotosection(section){
      console.log("passd: ", section);
      
      // if homepage then use this to scroll below
      document.getElementById(section).scrollIntoView({behavior: 'smooth'})
    },
    logoutUser(){
      this.$store.dispatch('action_logout');
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.getLoginStatus;
    }
  },
  components: {
    TheSignup,
    TheLogin,
    vueModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar{
  box-shadow: 0px 0px 10px 0px #ccc;
}
.dropdown:hover .dropdown-menu{
  display: block;
}
.navlogo img{
  height: 50px;
}
</style>
