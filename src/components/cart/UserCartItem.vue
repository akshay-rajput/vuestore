<template>
    <div class="cart-item-wrap">
        <div class="cart-item text-gray-800 border-t border-dashed border-gray-600 py-4">
            <div class="cart-item-nameimage md:mb-0">
                <div class="cart-item-image">
                    <img :src=cart_item.image alt="Product Image" class="rounded shadow">
                </div>
                <div class="cart-item-info">
                    <small class="hidden md:block md:invisible text-xs leading-6 tracking-wide text-gray-600">Product</small>
                    <h5 class="cart-item-name text-lg">{{cart_item.name}}</h5>
                    <small class="font-semibold text-gray-600">{{cart_item.type}}</small>
                </div>
            </div>
            <div class="cart-item-otherinfo">
                <div class="cart-item-quantity">
                    <label for="cart-item-quantity" class="text-xs leading-6 tracking-wide text-gray-600">Quantity</label> <br>
                    <select name="cart-item-quantity" id="cart-item-quantity"
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
                        <span class="cart-item-price-placeholder text-lg">{{cart_item.price}}</span> USD
                    </h5>
                </div>
                <div class="cart-item-actions">
                    <small class="text-xs leading-6 tracking-wide text-gray-600">Actions</small> <br>
                    <button class="cart-item-wishlist text-red-700 text-xl mr-6" title="Add to wishlist">
                        <span class="far fa-heart"></span>
                    </button>
                    <button class="cart-item-remove text-red-700 text-xl" title="Remove product">
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
    }
}
</script>

<style lang="scss" scoped>
    .cart-item{
        display: flex;
        flex-wrap: wrap;
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
            border: 1px dashed brown;

            // use space on larger devices
            @media (min-width: 1200px) {
                width: 130px;
                bottom: 3px solid brown;
            }
        }
    }
</style>