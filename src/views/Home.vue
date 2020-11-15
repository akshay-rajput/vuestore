<template>
  <div class="home">
    <!-- <p>Param: {{$route.params.section}}</p> -->
    <home-top-slider></home-top-slider>
    <HomeProductList></HomeProductList>
    <home-contact-form></home-contact-form>
    
  </div>
</template>

<script>
// @ is an alias to /src
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
    HomeTopSlider,
    HomeProductList,
    HomeContactForm,
  }
}
</script>
