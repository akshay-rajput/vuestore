<template>
    <div class="container mx-auto my-3 py-3 px-3">
        <div class="section-heading">
            <h2 class="my-2 text-4xl text-gray-700">Products</h2>
        </div>
        <div class="flex justify-between items-center mb-8">
            <div class="filter-info flex-grow">
                <p class="text-gray-600 text-md">Showing 5 products from Merchandise.</p>
            </div>
            <div class="productlist-options">
                <div class="filters">
                    <label for="filter_products" class="bg-gray-300 border border-gray-400 hover:border-gray-500 p-2 rounded-r-none rounded-md shadow text-gray-800" title="Filter Products">
                        <span class="flaticon flaticon-filter font-semibold"></span>
                        <!-- <span class="fa fa-filter"></span> -->
                    </label>
                    <div class="inline-block">
                        <select name="" id="" class=" w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded-md rounded-l-none shadow leading-tight focus:outline-none">
                            <option value="1">All Products</option>
                            <option value="2">Protein Powder</option>
                            <option value="3">Merchandise</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div id="products" class="grid sm:grid-cols-3 gap-12 my-2">
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

<style lang="scss" scoped>
.productlist-options .flaticon::before{
  font-size: 14px;
  margin: 0px 0px 0px 0px;
//   margin-top: 5px;
//   padding-top: 5px;
//   padding-bottom:0;
}
</style>