<template>
    <div id="contact" class="container mx-auto border border-green-800">
        <div class="flex border border-yellow-500">
            <div class="contact-info sm:w-7/12">
                <!-- <img src="../assets/contactus.svg" alt="contact us" class="h-48 mx-auto"> -->
                <div class="contact-info px-3 py-5">
                    <div class="contact-info-group font-semibold text-gray-700 mb-4">
                        <span class="fa fa-map-marker-alt text-sm"></span>
                        <span class="px-2 break-words text-lg">Office no. 2, Janice Complex, Janice Street, Yemen road, Yemen - 121121</span>
                    </div>
                    <div class="contact-info-group font-semibold text-gray-700 mb-4">
                        <span class="fa fa-phone-alt text-sm"></span>
                        <a href="tel:+1076548329764">
                            <span class="px-2 break-words text-lg tracking-wider">(+107)6548329764</span>
                        </a>
                    </div>
                    <div class="contact-info-group font-semibold text-gray-700 mb-4">
                        <span class="fa fa-envelope text-sm"></span>
                        <a href="mailto:support@ghostfitnessproducts.com">
                            <span class="px-2 break-words text-lg">support@ghostfitnessproducts.com</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="contact-form sm:w-5/12 px-4 py-6">
                
                <form @submit.prevent="onSubmitContactForm">
                    <div class="formgroup mb-3">
                        <label for="contact_email" class="text-xs leading-6 text-gray-700">Email*</label>
                        <input type="email" name="contact_email" id="contact_email" placeholder="john@xyz.com" class="form-input focus:bg-white" required>
                    </div>
                    <div class="formgroup mb-3">
                        <label for="contact_subject" class="text-xs leading-6 text-gray-700">Subject*</label>
                        <input type="text" name="contact_subject" id="contact_subject" placeholder="Purpose of your message" class="form-input focus:bg-white" required>
                    </div>
                    <div class="formgroup mb-3">
                        <label for="contact_message" class="text-xs leading-6 text-gray-700">Message*</label>
                        <textarea name="contact_message" id="contact_message" rows="5" class="form-input focus:bg-white" placeholder="Write your message here." required></textarea>
                    </div>
                    <button type="submit" class="btn-contactform">
                        <!-- when sending the message (disable mouse event on button) -->
                        <span class="">
                            <span class="fa fa-circle-notch fa-spin"></span>
                            <span class="mx-2 font-semibold antialiased tracking-wider">Sending</span>
                        </span>
                        
                        <span class="">
                            <span class="fa fa-paper-plane text-xs"></span>
                            <span class="font-semibold antialiased mx-2 tracking-wider">SEND</span>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>