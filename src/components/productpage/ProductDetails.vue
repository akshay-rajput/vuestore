<template>
    <div class="productpage bg-gray-100 mb-12 rounded-md sm:grid lg:grid-cols-2 gap-12">
        <div class="product-image py-8 flex items-center justify-center">
            <img :src=product.image :alt=product.name class="mx-auto">
        </div>
        <div class="product-info bg-white pt-4 pb-6 md:py-8 px-3 md:px-8 flex flex-col justify-between">
            <div class="product-info-group">
                <div class="product-title mb-2">
                    <h4 class="text-2xl truncate tracking-wide">{{product.name}}</h4>
                    <small class="text-sm text-gray-600 font-semibold tracking-wider">{{product.type}}</small>
                </div>
            
                <div class="product-desc mb-4">
                    <label for="" class="text-xs text-gray-600 font-semibold">Description</label>
                    <div class="product-desc-box text-sm md:text-lg leading-6 tracking-wide py-1 border-b border-t border-gray-300 border-dashed">
                        <span id="product-desc-short">
                            <!-- dynamic description -->
                            {{dynamicDescription}}
                        </span>
                        <a href="javascript:void(0);" class="ml-4 text-blue-700" @click="toggleDescription">
                            <span class="" v-if="shortDescription == true">See More</span>
                            <span class="" v-if="shortDescription == false">See Less</span>
                        </a>
                    </div>
                </div>

                <div class="product-price-qty flex flex-wrap justify-start items-start mb-2">
                    <div class="mb-2 md:mb-0">
                        <label for="" class="text-xs text-gray-600 font-semibold">Price</label>
                        <h5 class="text-lg md:text-2xl leading-4 md:leading-7">{{product.price}} USD</h5>
                    </div>

                    <div class="product-qty-group mb-2 md:mb-0 mx-12">
                        <label for="" class="text-xs text-gray-600 font-semibold">Quantity</label>
                        
                        <div class="">
                            <button @click="decreaseQuantity" class="btn-quantity-control btn-quantity-less"><span class="fa fa-chevron-left "></span></button>

                            <input type="text" name="product-quantity" id="product-quantity" 
                                    :value="productQty_local"
                                    class="w-10 text-center font-extrabold ">
                            
                            <button @click="increaseQuantity" :class="productQty_local == 5 ? 'btn-disabled': ''" class="btn-quantity-control btn-quantity-more"><span class="fa fa-chevron-right"></span></button>
                        </div>
                    </div>

                    <div class="product-total">
                        <label for="" class="text-xs text-gray-600 font-semibold">Total Price</label>
                        <h5 class="text-lg md:text-2xl leading-4 md:leading-7">{{product.price * productQty_local}} USD</h5>                    
                    </div>
                </div>
            </div>

            <div class="product-buttons flex justify-start items-center mt-8">
                <button class="btn-app btn-addToWishlist text-xl" @click="addToWishlist" title="Wishlist?">
                    <span class="far fa-heart" v-if="!product.wishlisted"></span>
                    <span class="fa fa-heart" v-if="product.wishlisted"></span>
                </button>

                <button @click="addToCart" class="btn-app btn-addToCart mx-4 relative" title="Add to cart?">
                    <span v-if="addingToCart" style="font-size: 20px;">
                        <span class="fa fa-circle-notch fa-spin font-semibold"></span>
                    </span>
                    <span v-if="!addingToCart">
                        <span class="flaticon flaticon-shopping-bag-1 font-semibold"></span>
                        <!-- <span class="fa fa-plus absolute cart-plus-icon"></span> -->
                    </span>
                </button>

                <button @click="buyNow" class="btn-app btn-buyNow flex-grow text-lg leading-8">Buy Now</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import {eventBus} from "../../main";

export default {
    props: {
        product: Object,
    },
    data(){
        return{
            shortDescription: Boolean,
            addingToCart: false,
            dynamicDescription: '',
            productQty_local: this.product.quantity
        }
    },
    created(){
        this.$store.dispatch('action_syncCart');
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

        increaseQuantity(){
            this.$emit('increaseQty_prop');
            // update local data
            this.productQty_local = this.product.quantity;
        },
        decreaseQuantity(){
            this.$emit('decreaseQty_prop');
            // update local data
            this.productQty_local = this.product.quantity;
        },

        addToCart(){
            if(localStorage.token){
                console.log("adding " + this.product + ' to cart');

                this.addingToCart = true;
                
                console.log("check updated Prop here: ", this.product.quantity);

                this.$store.dispatch( 'action_addToCart', this.product);
                setTimeout(() => {
                    this.addingToCart = false;
                }, 1500);
            }
            else{
                eventBus.$emit('openModal');
                console.log("You need to login to add product to cart");
            }
        },
        addToWishlist(){
            // check if login
            if(localStorage.token){
                // toggle wishlist button
                this.product.wishlisted = !this.product.wishlisted;

                // get db userid of logged in user
                const userId = localStorage.userId;
                console.log("store USERID: ", userId);
                
                // post product to firebase cart
                const fbUserWishlistPath = '/users/'+userId+'/wishlist.json';
                
                // Add to wishlist
                if(this.product.wishlisted){
                    axios.post(fbUserWishlistPath, this.product)
                    .then(response => {
                        console.log("Wishlist response: ", response);
                    })
                    .catch(error => {
                        console.log("Error in AddWishlist: ", error);
                    })
                }

                // remove from wishlist
                else{
                    // path of wishlist
                    const fbWishlistPath = '/users/'+userId+'/wishlist.json';
                    
                    // get wishlist
                    axios.get(fbWishlistPath)
                    .then(gotWishlist => {
                        console.log("GOT WIshlist: ", gotWishlist);
                        
                        // find id of item in wishlist & remove that id.item
                        const wishlistItems = gotWishlist.data;
                        for (const recordId in wishlistItems) {

                            const currentItem = wishlistItems[recordId];
                            if (currentItem.id == this.product.id) {
                                console.log("removing : ", currentItem.name);                            
                                // path of item to be removed from wishlist
                                const fbRemoveWishlistPath = '/users/'+userId+'/wishlist/'+recordId+'.json';
                            
                                axios.delete(fbRemoveWishlistPath, this.product)
                                .then(response => {
                                    console.log("RemoveWishlist response: ", response);
                                })
                                .catch(error => {
                                    console.log("Error in RemoveWishlist: ", error);
                                })
                            }
                        }

                    })
                    .catch(error => {
                        console.log("Error fetching wishlist", error);
                    })
                    
                }
            }
            else{
                // this.$refs.signupModal.openModal();
                eventBus.$emit('openModal');
                console.log("Cannot add to wishlist: please login");
            }
        },

        buyNow(){
            if(localStorage.token){
                console.log("buying " + this.item);

                // add quantity to cart item
                // this.item.quantity = this.productQty;

                // this.$store.dispatch( 'action_addToCart', this.item);
                this.$router.push({ name: 'Cart' })
            }
            else{
                eventBus.$emit('openModal');
                console.log("You need to login to add product to cart");
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_variables.scss';

.productpage{
    border: 1px solid #ddd;

    .product-image {
        padding: 10px;

        img{
            height: 350px;

            @media (max-width: 767px) {
                height: 200px;
            }
        }
    }

    #product-quantity{
        font-size: 17px;
        border-bottom: 1px solid $accent;
        border-top: 1px solid $accent;
        cursor: default;

        @media (max-width:767px) {
            font-size: 14px;
            width: 30px;
        }
    }

    .btn-quantity-control{
        padding: 1px 8px;
        font-size: 16px;
        color: $accent;
        border: 1px solid $accent;

        @media (max-width:767px) {
            font-size: 13px;
        }

        &:hover{
            background: $accent;
            color:white;
        }
    }
    .btn-quantity-less{
        border-radius: 50% 0px 0px 50%;
    }
    .btn-quantity-more{
        border-radius: 0% 50% 50% 0%;
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