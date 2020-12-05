<template>
    <div class="error-page container mx-auto bg-white border-blue-500 grid sm:grid-cols-2">
        <div class="px-4 py-6 md:py-12 text-left">
            <h2 class="text-4xl">Oops!</h2>
            <h3 class="text-gray-700 text-2xl break-words mb-4">We can't seem to find the page you're looking for.</h3>
            <p class="text-xl font-semibold text-gray-600 mb-4 md:mb-8">Error code: 404</p>

            <div class="text-xl text-gray-600">
                <p class="text-sm tracking-wide leading-10">Here are some helpful links instead</p>

                <div class="leading-10 py-4">
                    <p class="text-sm  tracking-wide leading-3">
                        Looking to buy something?
                    </p>
                    <router-link :to="{path: '/#products'}" tag="a" class="text-teal-500 hover:text-orange-400 font-semibold leading-4">
                        Our Products <span class="fa fa-long-arrow-alt-right"></span>
                    </router-link>
                </div>
                <div class="leading-10 py-4">
                    <p class="text-sm tracking-wide leading-3">
                        Facing a problem with our website?
                    </p>
                    <router-link :to="{path: '/#contact'}" tag="a" class="text-teal-500 hover:text-orange-400 font-semibold leading-4">
                        Contact Us <span class="fa fa-long-arrow-alt-right"></span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="px-4 row-start-1 sm:row-start-auto">
            <lottie-player class="lottie-player" src="https://assets4.lottiefiles.com/packages/lf20_aap7mtcc.json" loop autoplay></lottie-player>
        </div>    
    </div>    
</template>

<script>
import "@lottiefiles/lottie-player";
// import animationError from '../assets/error.json';
export default {
    created(){
        this.$store.dispatch('action_syncCart');
    },
    mounted(){
        console.log("Mounted 404 page");
        // add lottieplayer script to head of document
        // let lottiePlayerScript = document.createElement('script')
        // lottiePlayerScript.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
        // document.head.appendChild(lottiePlayerScript)
    }
}
</script>

<style lang="scss" scoped>
    .error-page{
        min-height: calc(100vh - 200px);
    }
</style>