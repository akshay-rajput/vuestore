<template>
    <div class="container mx-auto">
      <div class="text-gray-800 pb-8">
        <img src="../assets/Ghost_Logo_grey.png" alt="ghost logo" class="mx-auto h-16">
        <!-- <h3 class="text-2xl font-medium">Welcome back</h3> -->
      </div>
      <form @submit.prevent="onSubmit">
        <div class="formgroup mb-3">
          <label for="user_username" class="text-xs leading-6 text-gray-700">Username</label>
          <input type="text" v-model="username" name="user_username" id="user_username" placeholder="Enter your username" class="form-input focus:bg-white" required>
        </div>
        <div class="formgroup mb-3">
          <label for="user_email" class="text-xs leading-6 text-gray-700">Email</label>
          <input type="email" v-model="email" name="user_email" id="user_email" placeholder="john@xyz.com" class="form-input focus:bg-white" required>
        </div>
        <!-- <div class="inputgroup m-2">
          <label for="">Email</label>
          <input type="email" v-model="email" name="user_email" id="user_email" placeholder="Example: abc@gmail.com" class="bg-gray-200 rounded p-1 text-gray-900">
        </div> -->
        <div class="formgroup mb-3">
          <label for="user_password" class="text-xs leading-6 text-gray-700">Password</label>
          <input type="password" v-model="password" name="user_password" id="user_password" class="form-input focus:bg-white" required>
        </div>
        <!-- <div class="inputgroup m-2">
          <label for="">Password</label>
          <input type="password" v-model="password" name="user_password" id="user_password" class="bg-gray-200 rounded p-1 text-gray-900">
        </div> -->
        <div class="">
          <!-- <button type="submit" class="button bg-purple-700 text-white">Signup</button> -->

          <button type="submit" class="btn-app btn-signup my-4">
            <span class="">
              <span class=" antialiased mx-2 tracking-wider">Signup</span>
              <span class="fa fa-angle-right text-xs"></span>
            </span>
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import {eventBus} from '../main'
export default {
    data () {
        return {
            username: '',
            email: '',
            password: ''
      }
    },

    methods: {
        onSubmit () {
            const formData = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            // console.log("signup: ");
            // console.log(formData)

            // call actions inside store.js
            this.$store.dispatch('action_signup', formData);
            setTimeout(() => {
              // close modal after 1sec
              eventBus.$emit('closeModal');
            }, 1000);
        }
    }
}
</script>

<style lang="scss" scoped>
  .btn-signup{
    background: teal;
    width: 100%;
    color: white;
    transition: all ease 0.35s;

    &:hover{
      color:white;
      background: darken($color: teal, $amount: 10%);
    }
  }
</style>