<template>
    <div class="productcard relative border border-gray-400 rounded-md">
        <div class="productcard-imagewrap flex items-center rounded-md bg-gray-100">
            <img :src=item.image alt="Product image" class="productcard-image">
            <i class="wishlist cursor-pointer fa-heart text-red-700" 
                :class="item.wishlisted ? 'fa': 'far'" @click="item.wishlisted = !item.wishlisted" title="Add to wishlist"></i>
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
                        <button class="btn-quantity-minus">
                            <span class="fa fa-minus"></span>
                        </button>
                        
                        <input type="text" name="product_quantity" :id="item.id + 'product_quantity'"  value="1" 
                                class="text-xl leading-4 font-bold text-center focus:outline-none cursor-default" readonly>
                        
                        <!-- plus qty -->
                        <button class="btn-quantity-plus">
                            <span class="fa fa-plus"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="productcard-buttons border-gray-400 border-t border-dashed flex justify-between">
            <div class="">
                <button class="btn-viewDetails">
                    View Details >
                </button>    
            </div>
            <div class="flex-grow">
                <button class="btn-viewDetails w-full">
                    Add to cart 
                </button>    
            </div>
        </div> -->
        <div class="productcard-buttons">
            <button class="btn-addToCart">
                Add to cart
            </button>
            <a href="javascript:void(0);" class="text-blue-600 hover:text-teal-600">View details <span class="fa fa-long-arrow-alt-right"></span></a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // title: String,
        // likes: Number,
        // isPublished: Boolean,
        item: Object
    },
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

    #product_quantity{
        width: 40px;    
        border: 1px solid lighten($color: $dark, $amount: 50%);
    }

    .btn-quantity-minus, .btn-quantity-plus{
        background: lighten($color: $dark, $amount: 50%);
        color: white;
        padding: 1px 4px;
        font-size: 1.25rem;

        &:hover{
            background: $accent;
        }
    }
    .btn-quantity-minus{
        border-radius: 4px 0px 0px 4px;
    }
    .btn-quantity-plus{
        border-radius: 0px 4px 4px 0px;
    }
}

.btn-addToCart{
    margin-right: 8px;
    padding: 8px 16px;
    background: $accent;
    border: 1px solid $accent;
    color: white;
    border-radius: 0px 0px 0px 4px;

    &:hover{
        color: $accent;
        background: transparent;
        transition: all ease 0.35s;
    }
}
</style>