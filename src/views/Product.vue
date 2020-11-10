<template>
  <div class="product">
    <h1>This is a product page</h1>
    <product-details></product-details>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductDetails from '@/components/productpage/ProductDetails.vue'

export default {
  name: 'Product',
  components: {
    ProductDetails
  }
}
</script>