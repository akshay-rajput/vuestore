<template>
  <div class="home">
    <!-- <p>Param: {{$route.params.section}}</p> -->
    <the-signup></the-signup>
    <home-top-slider></home-top-slider>
    <HomeProductList></HomeProductList>
    <home-contact-form></home-contact-form>
    
  </div>
</template>

<script>
// @ is an alias to /src
import TheSignup from '@/components/TheSignup.vue'
import HomeTopSlider from '@/components/HomeTopSlider.vue'
import HomeProductList from '@/components/HomeProductList.vue'
import HomeContactForm from '@/components/HomeContactForm.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      requestedSection: this.$route.params.section
    }
  },
  components: {
    TheSignup,
    HomeTopSlider,
    HomeProductList,
    HomeContactForm,
  }
}
</script>
