<template>
    <div class="top-slider-bg bg-gray-800 mb-5">
        <div class="container mx-auto pt-5 pb-10 px-3">
            <div class="grid sm:grid-cols-2 gap-4 items-center ">
                <div class="text-section md:py-5">
                    <h2 class="text-2xl lg:text-4xl break-words font-bold tracking-wider text-gray-200 mb-2">
                        GHOST is the world's first lifestyle sports nutrition brand.
                    </h2>
                    <p class="text-md lg:text-xl text-gray-400 mb-10">
                        The name GHOST® and mantra "be seen" come from that feeling of being behind the scenes and wanting to be heard, wanting to make an impact; we're all ghosts. This is our time.
                    </p>
                    <div class="slider-button-group flex flex-wrap">
                        <a href="javascript:void(0);" @click="showSlide(item)" v-for="item in slideProducts" :key="item.id"
                            class="btn-topslider mb-4" :class="{'btn-topslider-active' : item.isActive}">
                            {{item.name}}
                        </a>
                        <!-- <a href="javascript:void(0);" @click="showSlide" class="btn-topslider" :class="isActive ? 'btn-topslider-active': ''"><span class="fa fa-star-of-life text-sm"></span> LEGEND</a>
                        <a href="javascript:void(0);" @click="showSlide" class="btn-topslider" :class="isActive ? 'btn-topslider-active': ''"><span class="fa fa-dumbbell text-sm"></span> PUMP</a> -->
                    </div>
                </div>
                <div class="image-section md:py-5">
                    <img :src=sliderImage alt="" class="slideImage mx-auto sm:mt-10">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            sliderImage: '',
            productsToShow : []
        }
    },
    created() {
        this.setInitialSlide();        
    },
    methods: {
        setInitialSlide(){
            // this.slideProducts.forEach(element => {
            //     if(element.isActive == true){
            //         this.sliderImage = element.image
            //     }
            // });
            for (let index = 0; index < this.slideProducts.length; index++) {
                const element = this.slideProducts[index];
                if(element.isActive == true){
                    this.sliderImage = element.image;
                }
            }
        },
        showSlide(selectedSlide){
          this.sliderImage = selectedSlide.image;
          this.slideProducts.forEach(product => {
              product.isActive = (product.name == selectedSlide.name);
          })
          console.log("Method showslide: ", selectedSlide.name);
          console.log("updated computed ", this.slideProducts);
      }  
    // toggle slider buttons
    },
    computed: {
        // getter for stocklist
        slideProducts(){
            const filteredProducts = this.$store.getters.getProducts.filter(function(product){
                return product.type == 'Muscle Builder'
            });
            console.log("here is filtered: ", filteredProducts);
            
            // return only 3 of filtered products
            const productsToShow = [];
            for (let index = 0; index < 3; index++) {
                const element = filteredProducts[index];
                productsToShow.push(element);
            }

            for (let index = 0; index < productsToShow.length; index++) {
                if(index == 0){
                    productsToShow[index].isActive = true;
                    // this.sliderImage = productsToShow[index].image;
                }
                else{
                    productsToShow[index].isActive = false;
                }
                
            }

            console.log("Product to show: ", productsToShow);
            return productsToShow;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';


.btn-topslider{
    padding: 12px 6px;
    border: 2px solid #999;
    border-radius: 5px;
    font-weight: bold;
    color: #999;
    margin-right: 20px;

    @media (max-width: 992px) {
        padding: 10px 5px;
        font-size: 0.6rem;
    }
}
.btn-topslider:hover, .btn-topslider-active{
    border-color: $primary;
    color: $primary;
}    

.slideImage{
    height: 350px;

    @media (max-width: 767px) {
        height: 200px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
        height: 275px;
    }
}
</style>