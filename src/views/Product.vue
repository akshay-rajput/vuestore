<template>
  <div class="product">
    <div class="container px-4 py-8 md:pb-16 mx-auto">
        <div class="mb-4 backlink">
          <router-link tag="a" :to="{path: '/#products'}" class="btn-back text-lg hover:text-teal-600 text-orange-500">
            <span class="fa fa-long-arrow-alt-left"></span> Back to Products
          </router-link>
        </div>
        
        <product-details @increaseQty_prop="increaseQty" @decreaseQty_prop="decreaseQty" :product=productToShow></product-details>

        <div class="other-product-list py-4 my-6 border-t border-dashed border-gray-500">
          <h5 class="text-xl text-gray-700 my-3">Other Products</h5>
          <!-- <div class="flex flex-wrap justify-between items-center">
            
            <div class="other-product-card my-4" v-for="otherProduct in otherProducts" :key="otherProduct.id">
              <div class="product-image-wrap bg-gray-200">
                <img :src=otherProduct.image alt="Product image" class="h-32 mx-auto">
              </div>
              <div class="product-info-wrap ">
                <div class="product-info-text px-2 mb-2">
                  <h5 class="truncate leading-8" :title=otherProduct.name>{{otherProduct.name}}</h5>
                  <small class="text-xs tracking-wide text-gray-500 font-semibold" >
                    {{otherProduct.type}}
                  </small>
                  <h5 class="leading-8 mb-2">{{otherProduct.price}}.00 <span class="ml-1 text-sm text-gray-600">USD</span></h5>
                </div>
                
                <router-link tag="button" :to="{name: 'Product', params: { id: otherProduct.id }}" 
                            class="btn-viewDetails font-semibold text-sm tracking-wider w-full">
                  
                  VIEW {{otherProduct.id}}
                </router-link>
              </div>
              
            </div>

          </div> -->
        </div>

        <swiper :options="swiperOptions" 
                @swiper="onSwiper" :scrollbar="{ draggable: true }"
                @slideChange="onSlideChange">
          <swiper-slide class="other-product-card my-4" v-for="otherProduct in otherProducts" :key="otherProduct.id">
            
            <div class="product-image-wrap bg-gray-200">
              <img :src=otherProduct.image alt="Product image" class="h-32 mx-auto">
            </div>

            <div class="product-info-wrap ">
              <div class="product-info-text px-2 mb-2">
                <h5 class="truncate leading-8" :title=otherProduct.name>{{otherProduct.name}}</h5>
                <small class="text-xs tracking-wide text-gray-500 font-semibold" >
                  {{otherProduct.type}}
                </small>
                <h5 class="leading-8 mb-2">{{otherProduct.price}}.00 <span class="ml-1 text-sm text-gray-600">USD</span></h5>
              </div>
              
              <router-link tag="button" :to="{name: 'Product', params: { id: otherProduct.id }}" 
                          class="btn-viewDetails font-semibold text-sm tracking-wider w-full">
                <!-- View Details -->
                VIEW
              </router-link>
            </div>
          </swiper-slide>
          
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div> -->
        </swiper>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductDetails from '@/components/productpage/ProductDetails.vue'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar} from 'swiper';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

 // install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar]);

export default {
  name: 'Product',
  data(){
    return{
      swiperOptions: {
        // Enable lazy loading
        lazy: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        // breakpoints: {
        //   1200: {
        //     slidesPerView: 5,
        //     spaceBetween: 40
        //   },
        //   1024: {
        //     slidesPerView: 4,
        //     spaceBetween: 40
        //   },
        //   768: {
        //     slidesPerView: 3,
        //     spaceBetween: 30
        //   },
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20
        //   },
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 10
        //   }
        // },
        // centeredSlides: true,
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        grabCursor: true,
        // mousewheel: true,
        // keyboard: {
        //   enabled: true,
        // },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // }
        // Some Swiper option/callback...
      }
    }
  },
  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, true)
  },
  components: {
    ProductDetails,
    Swiper,
    SwiperSlide
  },
  computed: {
    productToShow(){
      const allProducts = this.$store.getters.getProducts;
      const routeParameterId = this.$route.params.id;

      const productArray = allProducts.filter(function(product){
        return product.id == routeParameterId;
      })
      return productArray[0];
    },
    otherProducts(){
        const allProducts = this.$store.getters.getProducts;
        const routeParameterId = this.$route.params.id;

        const otherProductList = allProducts.filter(function(product){
            return product.id != routeParameterId;
        })
        
        // return 5 items from other product list
        if(routeParameterId <=  Math.floor(otherProductList.length/2)){
          return otherProductList.slice(routeParameterId, routeParameterId+5);
        }
        else{
          return otherProductList.slice(routeParameterId-6, routeParameterId);
        }
    },

    // swiper carousel
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    increaseQty(){
      // increase if less than 5 quantity
      if(this.productToShow.quantity < 5){
          this.productToShow.quantity += 1;
      }
    },
    decreaseQty(){
      // decrease if more than 1 quantity
      if(this.productToShow.quantity > 1){
          this.productToShow.quantity -= 1;
      }
    },

    // swiper methods
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },
  },
  directives: {
    swiper: directive
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';
// for swiper
// @import './base.scss';
  
  .btn-back{
    span{
      transition: all ease 0.35s;
    }
    &:hover span{
      transform: translateX(-5px);
    }
  }

  .other-product-card.swiper-slide{
    width: 220px !important;
    border-radius: 5px;
    background: white;
    border: 1px solid #ddd;

    .product-image-wrap{
      border-radius: 5px;
      padding-top: 5px;
      padding-bottom: 20px;
    }

    .product-info-wrap{
      margin-top: -10px;
      padding-top: 5px;
      border-radius: 5px;
      background: white;
      // border: 1px solid #ccc;
      // border: 2px solid grey;
      border-radius: 15px 15px 5px 5px;
    }

    .btn-viewDetails{
      padding: 8px;
      border-radius: 0px 0px 5px 5px;
      background: $accent;
      color: lighten($color: $accent, $amount: 50%);
      transition: all ease 0.35s;

      &:hover{
        background: darken($color: $accent, $amount: 10%);
      }

    }
  }

  // scroll bar below slides
  .swiper-container-horizontal > .swiper-pagination-progressbar, 
  .swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{
    bottom: 0;
    top: auto;
  }
</style>