<template>
    <div>
        <!-- if cart is empty -->
        <div v-if="userCartItems.length < 1" class="cart-empty flex flex-col justify-center items-center">
            <div class="py-8 text-center">
                <img src="../../assets/emptycart.svg" alt="Cart is empty" class="h-48">
                <h5 class="my-8 text-gray-600">Oop! It looks like your cart is empty.</h5>
                <router-link :to="{path: '/#products'}" class="cart-backlink text-xl font-semibold text-purple-600 hover:text-teal-700">
                    <span class="fa fa-long-arrow-alt-left"></span> 
                    <span class="hover:underline ml-4">Go Back & Add products</span>
                </router-link>
            </div>
        </div>
        <!-- if cart is not empty -->
        <div v-if="userCartItems.length > 0" class="cart-wrap justify-between">
            <div class="cart-items px-3 md:px-8 py-3 md:py-6">
                <h4 class="text-gray-700 text-2xl mb-4">Your Cart</h4>
                <!-- call cart item component -->
                <cart-item v-for="cart_item in userCartItems" :key="cart_item.id" :cart_item=cart_item ></cart-item>
            </div>
            <div class="cart-summary text-gray-300 text-left px-3 pt-3 md:pt-6">
                <div class="summary-info">
                    <h4 class="text-gray-600 text-2xl mb-4">Payment Summary</h4>
                
                    <div class="cart-couponcode mb-4 ">
                        <label for="couponcode" class="text-gray-500 text-sm tracking-wider">Coupon Code?</label>
                        <div class="couponcode-group flex ">
                            <input v-model="coupon" type="text" name="couponcode" id="couponcode" class="text-gray-700 px-2 focus:outline-none focus:bg-white bg-gray-200" placeholder="Enter coupon code">
                            <button class="btn-app btn-couponcode" @click="applyCoupon">Apply</button>
                        </div>
                        <p v-if="couponAlert" class="p-1 my-1 rounded bg-red-300 text-red-700 text-sm">Wrong coupon code entered.</p>
                    </div>
                    <!-- subtotal -->
                    <div class="cart-subtotal flex justify-between mb-4 ">
                        <span class="text-lg text-gray-400 mr-2">Subtotal</span>
                        <span class="subtotal text-lg">{{cartSubTotal}} USD</span>
                    </div>
                    <!-- discount -->
                    <div class="cart-discount flex justify-between mb-4 ">
                        <span class="text-lg text-gray-400 mr-2">
                            Discount
                            <span class="text-xs">(10%)</span>
                        </span>
                        <span class="discount text-lg">
                            - <span class="discount-value">{{cartDiscount}}</span> USD
                        </span>
                    </div>
                    <!-- shipping -->
                    <div class="cart-shipping flex justify-between mb-4 ">
                        <span class="text-lg text-gray-400 mr-2">Shipping</span>
                        <span class="shipping text-lg">
                            + <span class="shipping-charges">10.00</span> USD
                        </span>
                    </div>
                </div>

                <div class="summary-end border-t border-gray-400 border-dashed pt-3">
                    <!-- Grandtotal -->
                    <div class="cart-total flex justify-between mb-4">
                        <span class="text-lg font-semibold tracking-wide text-gray-400 mr-2">Grand Total</span>
                        <span class="total text-lg font-semibold tracking-wide">{{cartGrandTotal}} USD</span>
                    </div>
                    <button class="btn-app btn-checkout mb-2">
                        Checkout <span class="fa fa-long-arrow-alt-right"></span>
                    </button>

                    <button class="btn-app mb-3 text-center w-full">
                        <router-link :to="{path: '/#products'}" class=" font-semibold text-teal-400 hover:text-purple-400">
                            <span class="fa fa-long-arrow-alt-left mr-2"></span> Back to shop
                        </router-link>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
    
</template>
<script>
import CartItem from './UserCartItem';
export default {
    data(){
        return{
            userCart: false,
            coupon: '',
            couponAlert: false
        }
    },
    components: {
        CartItem
    },
    created(){
        // on page load sync state.cart with database cart
        this.syncUserCart();
    },
    computed: {
        userCartItems(){
            return this.$store.getters.getCartItems;
        },
        cartSubTotal(){
            var subtotal = 0.0;
            this.userCartItems.forEach(cartItem => {
                subtotal += parseFloat((cartItem.price * cartItem.quantity));
            });
            return subtotal;
        },
        cartDiscount(){
            return (this.cartSubTotal * 0.10).toFixed(2);
        },
        cartGrandTotal(){
            return (this.cartSubTotal - this.cartDiscount + 10.00);
        }
    },
    methods: {
        syncUserCart(){
            // console.log("Dispatching SYNC CART from component");
            this.$store.dispatch('action_syncCart');
        },
        applyCoupon(){
            if(this.coupon != ''){
                this.couponAlert = true;
                setTimeout(() => {
                    this.couponAlert = false;
                    this.coupon = ''
                }, 1200);
            }
            // else{
            //     console.log("Empty coupon");
            // }
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_variables.scss';
    .cart-backlink{
        transition: all ease 0.35s;
        &:hover{
            transform: scaleX(1.5);
            
        }
    }
    .cart-wrap{
        display: flex;
        @media (min-width: 992px) {
            flex-direction: row;
            // fix height of cart
            height: calc(100vh - 80px);
            overflow: hidden;
        }
        // justify-items: space-between;
        @media (max-width: 991px) {
            flex-direction: column;
            height: auto;
        }
        .cart-items{
            // width: 100vw;
            overflow-y: auto;

            @media (min-width: 992px) {
                width: calc(100vw - 320px);
            }
        }
        .cart-summary{
            background: lighten($color: $dark, $amount: 10%);
            
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: center;
            padding-inline: 15px;
            @media (max-width: 767px) {
                height: auto;
                padding-inline: 8px;
            }

            #couponcode{
                border-radius: 4px 0px 0px 4px;
            }
            .btn-couponcode{
                background: teal;
                border-radius: 0px 4px 4px 0px;

                &:hover{
                    background: darken($color: $accent, $amount: 10%);
                }
            }
            .btn-checkout{
                font-size: 1.25rem;
                background: $accent;
                width: 100%;
                transition: all ease 0.35s;
                
                .fa{
                    transition: all ease 0.35s;
                }
                
                &:hover{
                    background: darken($color: $accent, $amount: 10%);

                    .fa{
                        transform: translateX(15px);
                    }
                }
            }
        }
    }

</style>