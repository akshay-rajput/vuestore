<template>
    <div class="cart-item-wrap" v-if="productExistsInCart">
        <div class="cart-item text-gray-800 border-t border-dashed border-gray-600 py-4">
            <div class="cart-item-nameimage md:mb-0">
                <div class="cart-item-image">
                    <img :src=cart_item.image alt="Product Image" class="rounded ">
                </div>
                <div class="cart-item-info">
                    <small class="hidden md:block md:invisible text-xs leading-6 tracking-wide text-gray-600">Product</small>
                    <h5 class="cart-item-name break-words text-lg">{{cart_item.name}}</h5>
                    <small class="font-semibold text-gray-600">{{cart_item.type}}</small>
                </div>
            </div>
            <div class="cart-item-otherinfo">
                <div class="cart-item-quantity">
                    <label for="cart-item-quantity" class="text-xs leading-6 tracking-wide text-gray-600">Quantity</label> <br>
                    <select name="cart-item-quantity" id="cart-item-quantity" v-model="cart_item.quantity" @change="updateProduct()"
                            class="bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:border-gray-600">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="cart-item-price">
                    <small class="text-xs leading-6 tracking-wide text-gray-600">Price</small>
                    <h5 class="">
                        <span class="cart-item-price-placeholder text-lg">{{cart_item.price * cart_item.quantity}}</span> USD
                    </h5>
                </div>
                <div class="cart-item-actions">
                    <small class="text-xs leading-6 tracking-wide text-gray-600">Actions</small> <br>
                    <button class="cart-item-wishlist text-red-700 text-xl mr-6" title="Add to wishlist" @click="wishlistProduct">
                        <span class="far fa-heart" v-if="!cart_item.wishlisted"></span>
                        <span class="fa fa-heart" v-if="cart_item.wishlisted"></span>
                    </button>
                    <button @click="removeProduct" class="cart-item-remove text-red-700 text-xl" title="Remove product">
                        <span class="far fa-trash-alt"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props:{
        cart_item: Object
        // cart_item: Array
    },
    data(){
        return{
            productExistsInCart: true
        }
    },
    methods: {
        removeProduct(){
            console.log("Delete this", this.cart_item);
            this.$store.dispatch('action_removeFromCart', this.cart_item)
                .then(removalResponse => {
                    this.productExistsInCart = false;
                    console.log("Removed now sync cart:", removalResponse);
                    // resolve(removalResponse);
                    this.$store.dispatch('action_syncCart');
                })
        },

        updateProduct(){
            this.$store.dispatch('action_updateProduct', this.cart_item);
        },

        wishlistProduct(){
            this.cart_item.wishlisted = !this.cart_item.wishlisted;
            this.$store.dispatch('action_updateProduct', this.cart_item);
        }
    }
}
</script>

<style lang="scss" scoped>
    .cart-item{
        display: flex;
        // flex-wrap: wrap;
        flex-direction: row;
        
        // mobile layout
        @media (max-width: 767px) {
            flex-direction: column;
        }

        .cart-item-nameimage{
            flex-grow: 2;
            display: flex;
        }
        .cart-item-image{
            padding: 5px;
            flex-grow: auto;
            width: 100px;

            img{
                height: 100px;
                width: 100px;
            }
        }
        .cart-item-info{
            padding: 0px 10px;
            width: calc(100% - 110px);
            word-wrap: break-word;
        }

        .cart-item-otherinfo{
            display: flex;
            justify-content: space-between;
        }
        .cart-item-quantity, .cart-item-price, .cart-item-actions{
            width: 90px;
            padding: 0px 10px;

            // use space on larger devices
            @media (min-width: 1200px) {
                width: 130px;
                bottom: 3px solid brown;
            }
        }
    }
</style>