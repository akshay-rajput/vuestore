<template>
  <div class="maincontainer">
    <!-- <span class="text-gray-700">This is navbar.... </span>     -->
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/product">Product</router-link> | 
      <router-link to="/cart">Cart</router-link>
    </div>
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
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
