<template>
    <div class="productpage bg-white sm:grid lg:grid-cols-2 gap-12">
        <div class="product-image border border-green-500">
            <img :src=product.image :alt=product.name class="mx-auto">
        </div>
        <div class="product-info p-4 flex flex-col justify-between">
            <div class="product-info-group">
                <div class="product-title mb-2">
                    <h4 class="text-2xl truncate tracking-wide">{{product.name}}</h4>
                    <small class="text-sm text-gray-600 font-semibold tracking-wider">{{product.type}}</small>
                </div>
            
                <div class="product-desc mb-4">
                    <label for="" class="text-xs text-gray-600 font-semibold">Description</label>
                    <div class="product-desc-box leading-6 tracking-wide py-1 border-b border-t border-gray-300 border-dashed">
                        <span id="product-desc-short">
                            <!-- dynamic description -->
                            {{dynamicDescription}}
                        </span>
                        <a href="javascript:void(0);" class="ml-4 text-blue-700" @click="toggleDescription">
                            <span class="" v-if="shortDescription == true">See More</span>
                            <span class="" v-if="shortDescription == false">See Less</span>
                        </a>
                        <!-- <span v-if="shortDescription == true" class="cursor-pointer" @click="showFullDescription">See More</span> 
                        <span v-if="shortDescription == false" class="cursor-pointer" @click="showFullDescription">See Less</span> -->

                        <!-- <div class="" v-if="!shortDescription">
                            {{product.description}}
                            {{product.details}}
                        </div> -->
                    </div>
                </div>

                <div class="product-price-qty flex justify-start items-center mb-2">
                    <div class="">
                        <label for="" class="text-xs text-gray-600 font-semibold">Price</label>
                        <h5 class="text-2xl leading-7">{{product.price}} USD</h5>
                    </div>

                    <div class="product-qty-group mx-12">
                        <label for="" class="text-xs text-gray-600 font-semibold">Quantity</label>
                        
                        <div class="border border-black rounded-3xl">
                            <button><span class="fa fa-chevron-left px-2 text-md"></span></button>
                            <input type="text" name="product-quantity" id="product-quantity" readonly
                                    class="w-8 border-r border-l border-gray-600 text-center text-lg pt-0 font-extrabold bg-gray-100" value="1">
                            <button><span class="fa fa-chevron-right px-2 text-md"></span></button>
                        </div>
                    </div>

                    <div class="product-total">
                        <label for="" class="text-xs text-gray-600 font-semibold">Total Price</label>
                        <h5 class="text-2xl leading-7">{{product.price * product.quantity}} USD</h5>                    
                    </div>
                </div>
            </div>

            <div class="product-buttons flex justify-start items-center mt-8">
                <button class="btn-app btn-addToWishlist text-xl" @click="addToWishlist">
                    <span class="far fa-heart" v-if="!product.wishlisted"></span>
                    <span class="fa fa-heart" v-if="product.wishlisted"></span>
                </button>

                <button class="btn-app btn-addToCart mx-4 relative">
                    <span class="flaticon flaticon-shopping-bag-1 font-semibold"></span>
                    <span class="flaticon- absolute cart-plus-icon"></span>
                </button>

                <button class="btn-app btn-buyNow flex-grow text-lg leading-8">Buy Now</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
        
    },
    data(){
        return{
            shortDescription: Boolean,
            dynamicDescription: ''
        }
    },
    mounted(){
        this.trim_description();
    },
    methods: {
        trim_description(){
            var fullDesc = this.product.description + " " + this.product.details;
            var shortDesc = fullDesc.substring(0,200)+' ... ';

            console.log("fullDesc Length: ", fullDesc.length);

            if(fullDesc.length > 240){
                this.shortDescription = true;
                this.dynamicDescription = shortDesc;
            }
            else{
                // this.shortDescription = false;
                this.dynamicDescription = fullDesc;
            }
            // if(product.description)
        },
        toggleDescription(){
            var fullDesc = this.product.description + " " + this.product.details;
            var shortDesc = fullDesc.substring(0,200)+' ... ';
            
            if(this.shortDescription == true){
                this.dynamicDescription = fullDesc;
                this.shortDescription = !this.shortDescription;
            }
            else if(this.shortDescription == false){
                this.dynamicDescription = shortDesc;
                this.shortDescription = !this.shortDescription;

            }
        },

        addToWishlist(){
            this.product.wishlisted = !this.product.wishlisted;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_variables.scss';

.productpage{
    border: 1px dotted brown;

    .product-image {
        padding: 10px;

        img{
            height: 350px;
        }
    }

    .btn-addToWishlist{
        border: 1px solid coral;
        color: coral;

        &:hover{
            background:coral;
            color: white;
        }

    }
    .btn-addToCart{
        border: 1px solid lighten($color: $dark, $amount: 10%);
        color: lighten($color: $dark, $amount: 10%);

        &:hover{
            background: lighten($color: $dark, $amount: 10%);
            color: white;
        }
    }
    .btn-buyNow{
        // border: 1px solid $accent;
        background: $accent;
        color: white;

        &:hover{
            background: darken($color: $accent, $amount: 10%);
        }
    }
}
</style>