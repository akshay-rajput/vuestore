<template>
  <div class="maincontainer">
    <!-- <span class="text-gray-700">This is navbar.... </span>     -->
    <nav id="navbar">
      <div class="container mx-auto">
        <!-- flex container for navbar -->
        <div class="flex justify-between items-center py-4 px-3 border border-black">
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
            <div class="navlinks text-center">
              <router-link v-if="$route.name != 'Home'" :to="{path: '/#products'}" class="md:mr-3">Products</router-link>
              <router-link v-if="$route.name != 'Home'" :to="{path: '/#contact'}" class="md:mr-3">Contact</router-link>
              <!-- <router-link :to="{name:'Cart', params: {section: 'cart'}}">Cart</router-link> -->

              <!-- if on homepage show these links instead to scroll to sections -->
              <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('products')" class="md:mr-3">Products</a>
              <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('contact')" class="md:mr-3">Contact</a>
            </div>
            <div class="accountlinks">
              <a href="javascript:void(0);" @click="$refs.loginModal.openModal()" class="btn-login py-1 px-2 mx-2 border border-gray-700 rounded-lg">Login</a>  
              <a href="javascript:void(0);" @click="$refs.signupModal.openModal()"  class="btn-signup py-1 px-2 mx-2 text-white bg-gray-500 rounded-lg">Sign Up</a>
              <a href="javascript:void(0);" class=" bg-gray-400 rounded-full p-2 mx-2">
                <span class="fa fa-user"></span>
              </a>
              <a href="javascript:void(0);" class=" bg-gray-200 rounded-full p-2">
                <span class="fa fa-sign-out-alt"></span>
              </a>
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
.navlogo img{
  height: 50px;
}
</style>
