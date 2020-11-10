<template>
    <div class="cartcontainer">
        <p class="text-blue-400">
            This is cart page ******
        </p>
        <user-cart></user-cart>
    </div>
</template>

<script>
// @ is an alias to /src
import UserCart from '@/components/cart/UserCart.vue'

export default {
  name: 'Home',
  components: {
    UserCart
  }
}
</script>