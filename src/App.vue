<template>
  <div id="app">
    <!-- navbar for site -->
    <TheNav></TheNav>

    <router-view class="margin-topnav" />
    
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
@import url('https://fonts.googleapis.com/css2?family=Carter+One&family=Poppins:wght@400;600&family=Source+Sans+Pro:wght@400;700&display=swap');
// font-family: 'Carter One', cursive;
// font-family: 'Poppins', sans-serif;
#app {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // font-family: 'Oxygen', sans-serif;
    
  a:focus, button:focus{
    outline: none;
  }

  .margin-topnav{
    margin-top: 80px;

    @media (max-width: 767px) {
      margin-top: 72px;
    }
  }

  
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
