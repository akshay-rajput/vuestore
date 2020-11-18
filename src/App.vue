<template>
  <div id="app">
    <!-- navbar for site -->
    <TheNav></TheNav>

    <router-view/>
    
    <!-- common footer -->
    <TheFooter></TheFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNav from '@/components/TheNav.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'Home',
  components: {
    TheNav,
    TheFooter
  },
  created(){
     this.$store.dispatch('action_initialiseProducts');

    //  check autologin
    this.$store.dispatch('action_autologin');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Gorditas:wght@700&family=Lemon&family=Luckiest+Guy&family=Montserrat&family=Oxygen&family=Space+Grotesk&display=swap');
// font-family: 'Gorditas', cursive;
// font-family: 'Lemon', cursive;
// font-family: 'Luckiest Guy', cursive;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Oxygen', sans-serif;
// font-family: 'Space Grotesk', sans-serif;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
