<template>
    <div class="container mx-auto my-3 py-3 px-3">
        <div class="section-heading">
            <h2 class="my-2 text-4xl text-gray-700">Products</h2>
        </div>
        <div class="flex justify-between items-center mb-8">
            <div class="filter-info flex-grow">
                <p class="text-gray-600 text-md" v-if="appliedFilter != 'All Products'">
                    Showing <span class="text-semibold" v-if="appliedFilter == 'Muscle Builder'">5</span>
                    <span class="text-semibold" v-if="appliedFilter == 'Merchandise'">7</span>
                     products from {{appliedFilter}}.</p>
            </div>
            <div class="productlist-options">
                <div class="filters">
                    <label for="filter_products" class="bg-gray-300 border border-gray-400 hover:border-gray-500 p-2 rounded-r-none rounded-md shadow text-gray-800" title="Filter Products">
                        <span class="flaticon flaticon-filter font-semibold"></span>
                        <!-- <span class="fa fa-filter"></span> -->
                    </label>
                    <div class="inline-block">
                        <select name="filter_products" id="filter_products" v-model="appliedFilter" 
                                class=" w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded-md rounded-l-none shadow leading-tight focus:outline-none">
                            <option value="All Products">All Products</option>
                            <option value="Muscle Builder">Muscle Builder</option>
                            <option value="Merchandise">Merchandise</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- display all products -->
        <div id="products" v-if="appliedFilter == 'All Products'" class="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-12 my-2">
            <home-product-list-item v-for="item in productList" :key="item.id" :item=item ></home-product-list-item>
        </div>
        
        <!-- display only muscle builders -->
        <div id="products" v-if="appliedFilter == 'Muscle Builder'" class="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-12 my-2">
            <home-product-list-item v-for="item in muscleBuilderList" :key="item.id" :item=item ></home-product-list-item>
        </div>
        
        <!-- display merchandise -->
        <div id="products" v-if="appliedFilter == 'Merchandise'" class="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-12 my-2">
            <home-product-list-item v-for="item in merchandiseList" :key="item.id" :item=item ></home-product-list-item>
        </div>
    </div>
</template>

<script>
import HomeProductListItem from '@/components/HomeProductListItem.vue'

export default {
    data: function(){
        return{
            appliedFilter: 'All Products'
        }
    },
    created(){
        this.$store.dispatch('action_syncCart');
    },
    computed: {
        // getter for stocklist
        productList(){
            return this.$store.getters.getProducts;
        },
        muscleBuilderList(){
            var muscleBuilders = this.productList.filter(function (eachproduct) {
                return eachproduct.type == "Muscle Builder"
            });
            console.log("Muscle Builders: ", muscleBuilders);
            return muscleBuilders;
        },
        merchandiseList(){
            var merchandise = this.productList.filter(function (eachproduct) {
                return eachproduct.type == "Merchandise"
            });
            console.log("Merch: ", merchandise);
            return merchandise;    
        }
    },
    components: {
        HomeProductListItem
    },
    methods: {
        applyFilter(){
            console.log("APplying filter: ", this.appliedFilter);

            if(this.appliedFilter == 'Muscle Builder'){
                console.log('apply muscle builder');    
            }
            else if(this.appliedFilter == 'Merchandise'){
                console.log("``````apply merchandise ``````");
            }
            else{
                console.log(this.productList);
            }
        }
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