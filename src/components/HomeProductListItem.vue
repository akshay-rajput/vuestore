<template>
    <div class="productcard relative border border-gray-400 rounded-md mb-6 sm:mb-0">
        <!-- Local: {{isWishlisted}} <br> -->
        <div class="productcard-imagewrap flex items-center rounded-md bg-gray-100">
            <img :src=item.image alt="Product image" class="productcard-image">
            <i class="wishlist cursor-pointer fa-heart text-red-700" @click="addToWishlist"
                :class="item.wishlisted ? 'fa': 'far'" title="Add to wishlist"></i>
        </div>
        <div class="productcard-info px-2 pb-4">
            <div class="productcard-name py-1 mb-2">
                <h4 class="truncate tracking-wider text-lg md:text-2xl" :title=item.name>{{item.name}}</h4>
            </div>
            <div class="productcard-description mb-2">
                <p class="fade-text tracking-wide text-gray-600 text-justify">
                    <span class=" text-gray-900 border-dashed border-b border-gray-400">Description:</span>
                 {{item.description}}  
                </p>
            </div>
            <div class="productcard-price-qty flex justify-between items-center">
                <div class="productcard-price ">
                    <small for="" class="text-gray-700 text-xs">Price</small>
                    <h5 class="text-gray-700 py-1"><span class="text-gray-700 pr-1">$</span>{{item.price}}</h5>
                </div>
                <div class="productcard-quantity">
                    <small class="text-gray-700 text-xs">Quantity</small>
                    <div class="product-quantity-control mt-1">
                        <!-- minus qty -->
                        <button class="btn-quantity-minus" @click="decreaseQty">
                            <span class="fa fa-chevron-left"></span>
                        </button>
                        
                        <input type="text" name="product_quantity" :id="item.id + 'product_quantity'" v-model="productQty"
                                class="text-xl leading-4 font-bold text-center focus:outline-none cursor-default" readonly>
                        
                        <!-- plus qty -->
                        <button class="btn-quantity-plus" @click="increaseQty">
                            <span class="fa fa-chevron-right"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="productcard-buttons flex items-center text-right py-4 px-2">
            <button class="btn-addToCart" :class="addingToCart ? 'disableBtn':''" @click="addToCart">
                <span v-if="addingToCart">
                    <span class="fa fa-circle-notch fa-spin"></span> Waiting...
                </span>
                
                <span  v-if="!addingToCart">
                    Add to cart
                </span>
            </button>
            <router-link tag="a" :to="{name: 'Product', path: '/product/:id', params: { id: item.id }}" class="btn-details">
                <span class="mr-1">View</span>
                <span class="text-sm fa fa-angle-right"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import {eventBus} from "../main";
export default {
    props: {
        // title: String,
        // likes: Number,
        // isPublished: Boolean,
        item: Object
    },
    data(){
        return{
            addingToCart: false,
            productQty: 1,
        }
    },
    methods: {
        increaseQty(){
            // increase if less than 5 quantity
            if(this.productQty < 5){
                this.productQty += 1;
                // console.log("Update: qty:", this.productQty);
            }
        },
        decreaseQty(){
            // decrease if more than 1 quantity
            if(this.productQty > 1){
                this.productQty -= 1;
                // console.log("Update: qty:", this.productQty);
            }
        },
        addToCart(){
            if(localStorage.token){
                // console.log("adding " + this.item + ' to cart');

                this.addingToCart = true;

                // add quantity to cart item
                this.item.quantity = this.productQty;

                this.$store.dispatch( 'action_addToCart', this.item);
                setTimeout(() => {
                    this.addingToCart = false;
                }, 1500);
            }
            else{
                eventBus.$emit('openModal');
                // console.log("You need to login to add product to cart");
            }
        },
        addToWishlist(){
            // check if login
            if(localStorage.token){
                // toggle wishlist button
                // this.isWishlisted = !this.isWishlisted;
                this.$emit('wishlistProp');

                this.$store.dispatch( 'action_addToWishlist', this.item);                
            }
            else{
                // this.$refs.signupModal.openModal();
                eventBus.$emit('openModal');
                // console.log("Cannot add to wishlist: please login");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.productcard{
    background: white;
    word-wrap: break-word;
}
.productcard-imagewrap{
    height: 200px;
    
    .productcard-image{
        height: 190px;
        margin: auto;
    }

    .wishlist{
        position: absolute;
        font-size: 1.5rem;
        top: 10px;
        right: 10px;
    }
}
.productcard-description{
    font-size: 0.8rem;
    height: 4.65rem;
    overflow: hidden;
    
    > p.fade-text{
        line-height: 1.5rem;
        height: 4.65rem;
        position: relative;
    }
    .fade-text:after {
        content: "";
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20%;
        height: 1.5rem;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%);
    }
}

.productcard-price h5{
    font-size: 2rem;
    line-height: 1.75rem;
}
.product-quantity-control{

    input{
        width: 40px;    
        background: transparent;
        // border-bottom: 1px solid lighten($color: $dark, $amount: 50%);
    }

    .btn-quantity-minus, .btn-quantity-plus{
        // background: lighten($color: $dark, $amount: 70%);
        color: #aaa;
        padding: 1px 4px;
        font-size: 1.2rem;

        &:hover{
            color: orange;
        }
    }
    .btn-quantity-minus{
        border-radius: 4px 0px 0px 4px;
    }
    .btn-quantity-plus{
        border-radius: 0px 4px 4px 0px;
    }
}

.btn-details{
    border-radius: 5px;
    padding: 6px 12px;
    border: 1px solid #777;
    color: #777;
    &:hover{
        background: $dark;
        color: white;
    }
}
.btn-addToCart{
    margin-right: 6px;
    padding: 6px 12px;
    // background: $accent;
    border: 1px solid $accent;
    color: white;
    background: $accent;
    border-radius: 5px;
    flex-grow: 1;
    transition: all ease 0.35s;

    &:hover{
        background: darken($color: $accent, $amount: 10%);
        transition: all ease 0.35s;
    }

    &.disableBtn{
        background: lighten($color: $accent, $amount: 5%);
        border-color: lighten($color: $accent, $amount: 5%);
        pointer-events: none;
        cursor: not-allowed;
    }
}
</style>