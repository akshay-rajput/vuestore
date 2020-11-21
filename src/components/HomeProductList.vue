<template>
    <div class="container mx-auto my-3 py-3 px-3">
        <div class="flex justify-between items-center">
            <div class="section-heading">
                <h2 class="my-2 text-4xl text-gray-700">Products</h2>
            </div>
            <div class="productlist-options">
                <div class="filters">
                    <label for="filter_products" class="bg-gray-400 border border-gray-400 hover:border-gray-500 p-2 rounded-r-none shadow text-gray-800" title="Filter Products">
                        <span class="flaticon flaticon-filter font-semibold"></span>
                        <!-- <span class="fa fa-filter"></span> -->
                    </label>
                    <div class="inline-block relative w-36 lg:w-64">
                        <select name="filter_products" id="filter_products" class="appearance-none z-0 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-l-none shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="all">All Products</option>
                            <option value="powder">Protien Powder</option>
                            <option value="merchandise">Merchandise</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
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