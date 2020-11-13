<template>
    <div class="productcard">
        <div class="">
            <img :src=item.image alt="Product image" class="h-48 mx-auto">
        </div>
        Name: {{item.name}} <br>
        Desc: {{item.description}} <br>
        Price: {{item.price}} <br>
        Wish: {{item.wishlisted}} <br>
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

<style lang="css" scoped>
.productcard{
    padding: 10px;
    word-wrap: break-word;
    border: 1px solid #ccc;
    /* box-shadow: 0px 0px 20px #eee; */
    border-radius: 5px;
}
</style>