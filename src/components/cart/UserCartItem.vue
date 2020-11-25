<template>
    <div class="cart-item-wrap">
        <div class="cart-item text-gray-800 border-t border-dashed border-gray-600 py-4">
            <div class="cart-item-main mb-4 md:mb-0">
                <div class="cart-item-image">
                    <img src="https://picsum.photos/400" alt="Product Image" class="rounded">
                </div>
                <div class="cart-item-info">
                    <small class="invisible text-xs leading-6 tracking-wide text-gray-600">Product</small>
                    <h5 class="cart-item-name">Some generic product name to see if it fits.</h5>
                    <small class="font-semibold text-gray-600">Product Type</small>
                </div>
            </div>
            <div class="cart-item-quantity">
                <label for="cart-item-quantity" class="text-xs leading-6 tracking-wide text-gray-600">Quantity</label> <br>
                <select name="cart-item-quantity" id="cart-item-quantity" 
                        class="bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:border-gray-600">
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
                    <span class="cart-item-price-placeholder">48.56</span> USD
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
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .cart-item{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        // justify-content: space-between;
        // @media (max-width: 767px) {
        //     flex-direction: column;
        // }

        .cart-item-main{
            flex-grow: 6;
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
        .cart-item-quantity, .cart-item-price, .cart-item-actions{
            // flex-grow: auto;
            flex-grow: 2;
            padding: 0px 10px;
        }
    }
</style>