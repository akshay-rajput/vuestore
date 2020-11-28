<template>
    <div class="wishlistpage-wrap flex justify-center items-center">
        <div class="wishlistContainer container px-4 py-8 md:pb-16 mx-auto" v-if="wishlistProducts.length > 0">
            <h4 class="text-2xl">Your Wishlist <span class="text-lg text-gray-600 ml-2">( {{wishlistProducts.length}} )</span></h4>
            
            <div class="wishlists sm:grid lg:grid-cols-2 gap-12 my-6">
                <user-wishlist v-for="wishlistedItem in wishlistProducts" :key="wishlistedItem.id" :item=wishlistedItem></user-wishlist>
            </div>
        
        </div>

        <!-- if wishlist is empty -->
        <div class="empty-wishlist container mx-auto text-left py-4" v-if="wishlistProducts.length < 1">
            <h4 class="text-2xl">Your Wishlist <span class="text-lg text-gray-600 ml-2">( {{wishlistProducts.length}} )</span></h4>
            <div class="text-center md:py-8 my-2 md:my-8">
                <img src="../assets/nodata.svg" alt="Empty wishlist" class="h-56 rounded mb-8 mx-auto">
                <h5 class="text-xl text-gray-600 mb-4">Looks like your wishlist is empty.</h5>
                <router-link :to="{path: '/#products'}" class="cart-backlink text-xl font-semibold text-purple-600 hover:text-teal-400">
                    <span class="fa fa-long-arrow-alt-left"></span> 
                    <span class="hover:underline ml-4">Add Products to wishlist</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import UserWishlist from '../components/productpage/UserWishlist.vue';

export default {
  name: 'Wishlist',
  components: {
      UserWishlist
  },
  computed:{
    // getter for stocklist
    wishlistProducts(){
        const allProducts = this.$store.getters.getProducts;

        const wishlisted = allProducts.filter(function(product){
            return product.wishlisted == true;
        })
        return wishlisted;
    },
  }
}
</script>

<style lang="scss" scoped>
.wishlistpage-wrap{
  // margin-top: 290px;
  min-height: calc(100vh - 200px);
}
</style>