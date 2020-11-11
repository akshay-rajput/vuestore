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
            <div class="navlinks text-center">
              <router-link v-if="$route.name != 'Home'" :to="{path: '/#products'}" class="md:mr-3">Products</router-link>
              <router-link v-if="$route.name != 'Home'" :to="{path: '/#contact'}" class="md:mr-3">Contact</router-link>
              <!-- <router-link :to="{name:'Cart', params: {section: 'cart'}}">Cart</router-link> -->

              <!-- if on homepage show these links instead to scroll to sections -->
              <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('products')" class="md:mr-3">Products</a>
              <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('contact')" class="md:mr-3">Contact</a>
            </div>
            <div class="accountlinks">
              <a href="javascript:void(0);" class="btn-login py-1 px-2 mx-2 border border-gray-700 rounded-lg">Login</a>  
              <a href="javascript:void(0);" class="btn-signup py-1 px-2 mx-2 text-white bg-gray-500 rounded-lg">Sign Up</a>
              <a href="javascript:void(0);" class="text-blue bg-yellow-100">
                Hi! {{ user ? user : ''}}<span class="fa fa-angle-down"></span>
              </a>
            </div> 
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheNav',
  data: function(){
    return{
      user: ''
    }
  },
  // props: {
  //   msg: String
  // }
  methods: {
    gotosection(section){
      console.log("passd: ", section);
      
      // if homepage then use this to scroll below
      document.getElementById(section).scrollIntoView({behavior: 'smooth'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navlogo img{
  height: 50px;
}
</style>
