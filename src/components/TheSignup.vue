<template>
    <div class="container mx-auto">
      <form @submit.prevent="onSubmit">
        <div class="inputgroup m-2">
          <label for="">Email</label>
          <input type="email" v-model="email" name="user_email" id="user_email" placeholder="Example: abc@gmail.com" class="bg-gray-200 rounded p-1 text-gray-900">
        </div>
        <div class="inputgroup m-2">
          <label for="">Password</label>
          <input type="password" v-model="password" name="user_password" id="user_password" class="bg-gray-200 rounded p-1 text-gray-900">
        </div>
        <div class="">
          <button type="submit" class="button bg-purple-700 text-white">Signup</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: ''
      }
    },

    methods: {
        onSubmit () {
            const formData = {
                email: this.email,
                password: this.password
            }
            console.log("signup: ");
            console.log(formData)

            // call actions inside store.js
            this.$store.dispatch('signup', formData);
        }
    }
}
</script>