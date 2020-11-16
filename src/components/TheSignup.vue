<template>
    <div class="container mx-auto">
      <div class="text-gray-800 pb-8">
        <img src="../assets/Ghost_Logo_grey.png" alt="ghost logo" class="mx-auto h-16">
        <!-- <h3 class="text-2xl font-medium">Welcome back</h3> -->
      </div>
      <form @submit.prevent="onSubmit">
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

          <button type="submit" class="btn-signup my-4">
            <!-- when sending the message (disable mouse event on button) -->
            <!-- <span class="">
                <span class="fa fa-circle-notch fa-spin"></span>
                <span class="mx-2 font-semibold antialiased tracking-wider">Sending</span>
            </span> -->
            
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
            this.$store.dispatch('action_signup', formData);
        }
    }
}
</script>