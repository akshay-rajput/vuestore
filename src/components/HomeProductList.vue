<template>
    <div class="container mx-auto my-3 py-3 px-3 border border-orange-700">
        <h2 class="my-2 text-2xl text-gray-700">Products</h2>
        <div id="products" class="grid sm:grid-cols-3 gap-8 my-2">
            <home-product-list-item v-for="item in productList" :key="item.id" :item=item ></home-product-list-item>
        </div>
    </div>
</template>

<script>
import HomeProductListItem from '@/components/HomeProductListItem.vue'

export default {
    // data: function(){
    //     return{
    //         list_of_products: []
    //     }
    // },
    computed: {
        // getter for stocklist
        productList(){
            return this.$store.getters.getProducts;
        }
    },
    components: {
        HomeProductListItem
    }
}
</script>
