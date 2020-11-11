<template>
  <div class="home">
    <!-- <p>Param: {{$route.params.section}}</p> -->
    <the-signup></the-signup>
    <div class="flex justify-evenly mx-auto my-64">
      <div class="bg-orange-600 h-64 w-64 box-drops"></div>
      <div class="bg-yellow-500 h-64 w-64 box-drops"></div>
      <div class="bg-green-500 h-64 w-64 box-drops"></div>
    </div>
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
