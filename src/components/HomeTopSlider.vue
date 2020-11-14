<template>
    <div class="container mx-auto my-3 py-3 px-3 border border-blue-700">
        <div class="grid sm:grid-cols-2 gap-4 ">
            <div class="text-section py-10">
                <h2 class="text-4xl break-words font-semibold leading-10 mb-2">
                    GHOST is the world's first lifestyle sports nutrition brand.
                </h2>
                <h5 class="text-lg text-gray-700 mb-10">
                    The name GHOST® and mantra "be seen" come from that feeling of being behind the scenes and wanting to be heard, wanting to make an impact; we're all ghosts. This is our time.
                </h5>
                <div class="slider-button-group">
                    <a href="javascript:void(0);" @click="showSlide(item)" v-for="item in slideProducts" :key="item.id"
                        class="btn-topslider" :class="{'btn-topslider-active' : item.isActive}">
                        <span class="fa fa-ghost text-sm"></span> {{item.name}}
                    </a>
                    <!-- <a href="javascript:void(0);" @click="showSlide" class="btn-topslider" :class="isActive ? 'btn-topslider-active': ''"><span class="fa fa-star-of-life text-sm"></span> LEGEND</a>
                    <a href="javascript:void(0);" @click="showSlide" class="btn-topslider" :class="isActive ? 'btn-topslider-active': ''"><span class="fa fa-dumbbell text-sm"></span> PUMP</a> -->
                </div>
            </div>
            <div class="image-section">
                <img :src=sliderImage alt="" class="slideImage mx-auto sm:mt-10">
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
    border: 2px solid #ccc;
    border-radius: 5px;
    font-weight: bold;
    color: #aaa;
    margin-right: 20px;
}
.btn-topslider:hover, .btn-topslider-active{
    border-color: $linkcolor;
    color: $linkcolor;
}    

.slideImage{
    height: 350px;
}
</style>