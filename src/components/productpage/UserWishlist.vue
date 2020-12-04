<template>
    <div class="productcard flex-col md:flex-row relative border border-gray-400 rounded-md mb-6 sm:mb-0" v-if="item.wishlisted">
        
        <div class="productcard-imagewrap flex rounded-md bg-gray-100">
            <img :src=item.image alt="Product image" class="productcard-image mx-auto">
            <i class="visible md:invisible wishlist cursor-pointer fa-heart text-red-700" @click="removeFromWishlist"
                :class="item.wishlisted ? 'fa': 'far'" title="Remove from wishlist"></i>
        </div>
        
        <div class="productcard-info px-3 pb-4 pt-3">
            <!-- name & price -->
            <div class="productcart-topinfo flex justify-between mb-2">
                <div class="productcard-name py-1">
                    <h4 class="break-words tracking-wider text-lg md:text-xl" :title=item.name>{{item.name}}</h4>
                    <small class="text-sm font-semibold text-gray-600">{{item.type}}</small>
                </div>
                <div class="productcard-price py-1">
                    <!-- <small for="" class="text-gray-700 text-xs">Price</small> -->
                    <h5 class="text-gray-700 py-1"><span class="text-gray-700 pr-1">$</span>{{item.price}}</h5>
                </div>
            </div>
            
            <div class="productcard-buttons flex flex-col md:flex-row mt-2 md:mt-0 justify-between md:items-center">
                <div>
                    <button  @click="removeFromWishlist" class="hidden md:block btn-remove text-sm hover:bg-red-200 text-red-700 font-semibold">
                        <span class="far fa-trash-alt text-xs"></span> Delete
                    </button>
                </div>
                
                <div class="text-right">
                    <button class="font-semibold text-purple-600 hover:text-teal-600 mr-6">View details </button>
                    
                    <button class="btn-addToCart" :class="addingToCart ? 'disableBtn':''" @click="addToCart">
                        <span v-if="addingToCart">
                            <span class="fa fa-circle-notch fa-spin"></span> Waiting...
                        </span>
                        
                        <span  v-if="!addingToCart">
                            Add to cart
                        </span>
                        
                    </button>
                </div>
            </div>

        </div>
    
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    data(){
        return{
            addingToCart: false,
            productQty: 1
        }
    },
    methods: {
        addToCart(){
            console.log("WishlistPage: adding " + this.item + ' to cart');

            this.addingToCart = true;

            // add quantity to cart item
            this.item.quantity = this.productQty;

            this.$store.dispatch( 'action_addToCart', this.item);
            setTimeout(() => {
                this.addingToCart = false;
            }, 1500);
        },
        removeFromWishlist(){
            // check if login
            if(localStorage.token){
                // toggle wishlist button
                this.item.wishlisted = !this.item.wishlisted;

                this.$store.dispatch('action_addToWishlist', this.item);                
            }
        },

        
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_variables.scss';

.productcard{
    background: white;
    word-wrap: break-word;

    display: flex;
}
.productcard-imagewrap{
    // height: 200px;
    width: 125px;
    .productcard-image{
        max-height: 190px;
        margin: auto;
    }

    @media (max-width: 767px) {
        width: 100%;
        padding: 10px 0px;
    }

    .wishlist{
        position: absolute;
        font-size: 1.5rem;
        top: 10px;
        right: 10px;
    }
}
.productcard-info{
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // align side by side on tab & up
    @media (min-width: 767px) {
        min-width: calc(100% - 150px);
        flex-grow: 1;
    }

    // .productcard-name{
    //     // width: calc(100% - 45px);
    //     border: 1px solid green;
    // }
    
    .productcard-price h5{
        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    .btn-remove{
        transition: all ease 0.35s;
        padding: 5px 0px;
        border-radius: 4px;
        &:hover{
            padding: 5px;
        }
    }
}

// .productcard-description{
//     font-size: 0.8rem;
//     height: 4.65rem;
//     overflow: hidden;
    
//     > p.fade-text{
//         line-height: 1.5rem;
//         height: 4.65rem;
//         position: relative;
//     }
//     .fade-text:after {
//         content: "";
//         text-align: right;
//         position: absolute;
//         bottom: 0;
//         right: 0;
//         width: 20%;
//         height: 1.5rem;
//         background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%);
//     }
// }

// .product-quantity-control{

//     input{
//         width: 40px;    
//         border: 1px solid lighten($color: $dark, $amount: 50%);
//     }

//     .btn-quantity-minus, .btn-quantity-plus{
//         background: lighten($color: $dark, $amount: 50%);
//         color: white;
//         padding: 1px 4px;
//         font-size: 1.25rem;

//         &:hover{
//             background: $accent;
//         }
//     }
//     .btn-quantity-minus{
//         border-radius: 4px 0px 0px 4px;
//     }
//     .btn-quantity-plus{
//         border-radius: 0px 4px 4px 0px;
//     }
// }

.btn-addToCart{
    // margin-right: 8px;
    padding: 6px 12px;
    background: $accent;
    border: 1px solid $accent;
    color: white;
    border-radius: 0px 0px 0px 4px;

    &:hover{
        // color: $accent;
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