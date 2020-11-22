<template>
    <div class="contact-container py-10 w-full bg-gray-200">
        <div id="contact" class="container mx-auto px-3">
            <div class="grid sm:grid-cols-2 gap-12 ">
                <div class="contact-info-section py-3 md:py-6">
                    <!-- <img src="../assets/contactus.svg" alt="contact us" class="h-48 mx-auto"> -->
                    <div class="section-heading">
                        <h2 class="my-2 text-3xl text-gray-700">Contact us</h2>
                    </div>
                    <div class="contact-info py-5">
                        <div class="contact-info-group flex items-baseline text-gray-600 mb-4">
                            <div class="w-6 font-semibold">
                                <span class="flaticon flaticon-placeholder ml-0 text-sm"></span>
                            </div>
                            <span class="px-2 break-words text-lg">Office no. 2, Janice Complex, Janice Street, Yemen road, Yemen - 121121</span>
                        </div>
                        <div class="contact-info-group flex items-baseline text-gray-600 mb-4">
                            <div class="w-6 font-semibold">
                                <span class="flaticon flaticon-phone-call text-sm"></span>
                            </div>
                            <a href="tel:+1076548329764">
                                <span class="px-2 break-words text-lg tracking-wider">(+107)6548329764</span>
                            </a>
                        </div>
                        <div class="contact-info-group flex items-baseline text-gray-600 mb-4">
                            <div class="w-6 font-semibold">
                                <span class="flaticon flaticon-email text-sm"></span>
                            </div>
                            <a href="mailto:support@ghostfitnessproducts.com">
                                <span class="px-2 break-words text-lg">support@ghostfitnessproducts.com</span>
                            </a>
                        </div>

                        <div class="contact-social mt-4 md:mt-20">
                            <small class="">Follow us</small>
                            <div class=" flex items-center justify-items-start py-1">
                                <a href="javascript:void(0);" class="text-xl py-1 px-3 rounded-full bg-gray-700 hover:bg-teal-600 text-white mr-3">
                                    <span class="fab fa-facebook-f"></span>
                                </a>
                                <a href="javascript:void(0);" class="text-xl py-1 px-2 rounded-full bg-gray-700 hover:bg-teal-600 text-white mr-3">
                                    <span class="fab fa-twitter"></span>
                                </a>
                                <a href="javascript:void(0);" class="text-xl py-1 px-2 rounded-full bg-gray-700 hover:bg-teal-600 text-white mr-3">
                                    <span class="fab fa-instagram"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-form py-3 md:py-6">
                    <div class="section-heading">
                        <h2 class="my-2 text-3xl text-gray-700">Drop a message</h2>
                    </div>
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
                                <span class="flaticon-email-1 text-xs"></span>
                                <span class="font-semibold antialiased mx-2 tracking-wider">SEND</span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .flaticon::before{
        margin-left: 0px;
    } 
</style>