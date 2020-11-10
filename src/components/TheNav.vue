<template>
  <div class="maincontainer container mx-auto">
    <!-- <span class="text-gray-700">This is navbar.... </span>     -->
    <nav id="navbar">
      <div class="flex">
        <div class="navlogo">
          <router-link to="/">
            <a class="">
              <img src="../assets/ghost_logo_black.png" alt="VueStore Logo" class="">
            </a>
          </router-link>
        </div>
        <div class="navlinks">
          <router-link to="/product">Product</router-link> | 
          <router-link to="/cart">Cart</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheNav',
  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navlogo img{
  height: 50px;
}
</style>
