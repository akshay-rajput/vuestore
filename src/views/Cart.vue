<template>
    <div class="cartcontainer">
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

<style lang="scss" scoped>
.cartcontainer{
  // margin-top: 290px;
  min-height: calc(100vh - 200px);
}
</style>