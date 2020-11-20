<template>
    <div class="footer mt-16">
        <div class="container mx-auto px-3 pt-8 text-gray-500">
            <div class="flex justify-between items-center">
                <div class="mr-4">
                    <a href="javascript:void(0);" class="">
                        <img src="../assets/Ghost_Logo_grey.png" alt="Ghost Logo" class="h-16">
                    </a>
                </div>
                <ul class="flex justify-center items-center">
                    <li class="mr-4">
                        <a href="javascript:void(0);" class="text-sm  ">
                            Home
                        </a>
                    </li>
                    <li class="">
                        <router-link v-if="$route.name != 'Home'" :to="{path: '/#products'}" class=" text-sm  mr-4">
                            Products
                        </router-link>
                    </li>
                    <li class="">
                        <router-link v-if="$route.name != 'Home'" :to="{path: '/#contact'}" class=" text-sm  mr-4">
                            Contact
                        </router-link>                
                    </li>
                    
                    <li class="">
                        <!-- if on homepage show these links instead to scroll to sections -->
                        <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('products')" class="text-sm  mr-4">
                            Products 
                        </a>
                    </li>
                    <li class="">
                        <a href="javascript:void(0);" v-if="$route.name == 'Home'" @click="gotosection('contact')" class="text-sm  mr-4">
                            Contact
                        </a>
                    </li>
                </ul>
                <ul class="flex justify-start items-center">
                    <li class="mr-3">
                        <a href="https://instagram.com" class="">
                            <span class="fab fa-instagram"></span>
                        </a>
                    </li>
                    <li class="mr-3">
                        <a href="https://fb.com" class="">
                            <span class="fab fa-facebook"></span>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" class="">
                            <span class="fab fa-twitter"></span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="copyright text-center text-xs text-gray-600 pb-3">
                <span class="font-semibold">Disclaimer: </span>All images & products featured belong to their respective copyright holders. This website is just for illustration purposes. 
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
    .footer{
        background: $dark;
    }
</style>