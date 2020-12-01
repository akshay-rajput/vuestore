<template>
  <div  class="nav-container bg-gray-800 fixed top-0 w-full" ref="Navbar">
    <!-- <span class="text-gray-700">This is navbar.... </span>     -->
    <nav id="navbar">
      <div class="container mx-auto">
        <!-- flex container for navbar -->
        <div class="nav flex justify-between items-center py-4 px-3">
          <!-- site logo -->
          <div class="navlogo">
            <router-link :to="{name:'Home', params: {section: ''}}">
              <a class="">
                <img src="../assets/ghost_logo_white.png" alt="VueStore Logo" class="">
                <!-- <img src="../assets/Ghost_Logo_grey.png" alt="VueStore Logo" class=""> -->
              </a>
            </router-link>
          </div>
          
          <!-- navlinks -->
          <div class="text-center flex items-center">
            <!-- <div class="mx-3">{{current_user.email}}</div> -->
            <div class="sm:flex">
              <div class="loginlinks" v-if="!isLoggedIn">
                <a href="javascript:void(0);" @click="$refs.signupModal.openModal()" ref="signUpClick"  class="btn-app btn-signup mx-1 text-sm sm:mx-2 sm:text-lg">Sign Up</a>
                <a href="javascript:void(0);" @click="$refs.loginModal.openModal()" class="btn-app btn-login mx-1 text-sm sm:mx-2 sm:text-lg">Login</a>  
              </div>
              
              <div class="accountlinks flex justify-center items-center" v-if="isLoggedIn">
                <router-link to='/cart' tag="a" class="relative bg-gray-300 rounded-full p-2 mx-2" title="Go to Cart">
                  <!-- <span class="fa fa-cart-arrow-down"></span> -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width=24 height=24 viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="cart-item-count">{{getCartItemCount}}</span>
                </router-link>
                
                <router-link to='/wishlist' tag="a" class=" bg-gray-300 rounded-full p-2 mx-2" title="Your Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width=24 height=24 viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </router-link>
                
                <div class="dropdown inline-block relative">
                  <button @click="toggleMenu" :class="{ active : isMenuOpen == true}" class="dropdown-toggle bg-gray-300 rounded-full p-2 mx-2" title="Menu">
                    <!-- menu icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" stroke="currentColor" v-if="!isMenuOpen">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>

                    <!-- close icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" stroke="currentColor" v-if="isMenuOpen">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div class="navlinks dropdown-menu text-center" :class="{ active : isMenuOpen == true}">
                    <router-link v-if="$route.name != 'Home'" :to="{path: '/#products'}" class="rounded-t py-2 px-4 text-sm sm:text-lg">
                      <span class="flaticon-container text-sm"></span> Products
                    </router-link>
                    <router-link v-if="$route.name != 'Home'" :to="{path: '/#contact'}" class="rounded-t py-2 px-4 text-sm sm:text-lg">
                      <span class="flaticon-phone-call text-xs"></span> Contact
                    </router-link>
                    
                    <!-- if on homepage show these links instead to scroll to sections -->
                    <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('products')" class="rounded-t py-2 px-5 text-sm sm:text-lg">
                      Products <span class="flaticon flaticon-container text-sm"></span> 
                    </a>
                    <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('contact')" class="rounded-t py-2 px-5 text-sm sm:text-lg">
                      Contact <span class="flaticon flaticon-phone-call text-xs"></span>
                    </a>

                    <a href="javascript:void(0);" @click="logoutUser" class="rounded-t py-2 text-sm sm:text-lg" title="Logout">
                      <!-- <span class="fa fa-sign-out-alt text-sm"></span> -->
                      Logout <span class="flaticon flaticon-logout "></span>
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

<!-- Vuejs script -->
<script>
import TheSignup from '@/components/TheSignup.vue'
import TheLogin from '@/components/TheLogin.vue'
import vueModal from './TheModal'


export default {
  name: 'TheNav',
  data: function(){
    return{
      user: '',
      isMenuOpen: false
    }
  },
  mounted() {
    // execute below code on page load
    console.log("App is mounted");
    // var myNav = document.getElementById('navbar');
    // window.onscroll = function () { 
    //     if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200 ) {
    //         myNav.classList.add("nav-compact");
    //         myNav.classList.remove("nav-default");
    //     } 
    //     else {
    //         myNav.classList.add("nav-default");
    //         myNav.classList.remove("nav-compact");
    //     }
    // };
  },
  // computed:{
  //   // check if user data is fetched 
  //   current_user(){
  //     return this.$store.getters.getUserData;
  //   }
  // },
  methods: {
    toggleMenu(){
      this.isMenuOpen = !this.isMenuOpen;
      console.log("isMenuOpen: ", this.isMenuOpen);
    },
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
    },
    getCartItemCount(){
      console.log("getting cart count");
      return this.$store.getters.getCartItems.length;
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
@import '../assets/variables';
.nav-container{
  z-index: 6;
}
.nav-default{
  background: $dark;
  z-index: 100;
}
.navlogo img{
  height: 50px;

  @media (max-width: 480px) {
    height: 40px;
  }
}
.accountlinks{
  a, button{
    padding: 10px;
    @media (max-width: 480px) {
      padding: 5px;
    } 
  }
  svg{ 
    @media (max-width: 480px) {
      transform: scale(0.8);
    } 
  }
}
.dropdown-menu::before {
	// layout
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	bottom: 100%;
	right: 4rem; // offset should move with padding of parent
	border: .75rem solid transparent;
	border-top: none;
	// looks
	border-bottom-color: lighten($color: $dark, $amount: 10%);
	filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(#333, 0.1));
}
.dropdown-menu {
  position: absolute;
  right: -300px;
  z-index: 998;
  // color: $linkcolor;
  // width: 250px;
  width: max-content;
  margin-top: 20px;
  padding: 0px 50px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: right;
  transition: 300ms right ease;

  @media only screen and (max-width: 600px) {
    // width: 250px;
    width: max-content;
    right: -300px;
    // padding: 50px;
  }
  &.active {
    right: -50px;
  }
  a{
    padding-right: 15px;
    padding-left: 15px;
  }
}

.dropdown-menu a, .accountlinks a, .accountlinks button{
  // background: #e2e8f0;
  color: white;
  background:lighten($dark, 10%);
  border: 1px solid lighten($dark, 10%);
  &:hover, &.activelink{
    // border: 1px solid lighten($color: $accent, $amount: 50%);
    background: $accent;
    // color: lighten($color: $accent, $amount: 50%);
    transition: all ease 0.35s;
  }
}

.dropdown-menu .flaticon::before{
  font-size: 16px;
  margin-left: 6px;
}

.cart-item-count{
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  padding:1px 8px;
  background: teal;
  border-radius: 50%;

  @media (max-width: 767px) {
    font-size: 11px;
  }
}

</style>
