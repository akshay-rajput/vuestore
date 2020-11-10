<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TheNav msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNav from '@/components/TheNav.vue'

export default {
  name: 'Home',
  components: {
    TheNav
  }
}
</script>
