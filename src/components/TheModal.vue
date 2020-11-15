<template>
    <transition name="fademodal">
        <div class="vuemodal" v-if="show_modal">
            <!-- behind modal -->
            <div class="vuemodal-backdrop" @click="closeModal()"></div>
            
            <!-- actual modal -->
            <div class="vuemodal-dialog">
                <!-- name of modal & close button -->
                <div class="vuemodal-header">
                    <slot name="header"></slot>
                    <button @click="closeModal()" title="Close">
                        <span class="fa fa-times"></span>
                    </button>
                </div>

                <!-- body of modal -->
                <div class="vuemodal-body">
                    <slot name="body"></slot>
                </div>

                <!-- footer of modal (optional) -->
                <div class="vuemodal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'modal',
    data(){
        return{
            show_modal : false
        }
    },
    methods: {
        closeModal(){
            this.show_modal = false;
            document.querySelector('body').classList.remove('overflow-hidden');
        },
        openModal(){
            this.show_modal = true;
            document.querySelector('body').classList.add('overflow-hidden');
        }
    }
}
</script>

<style lang="scss" scoped>
    // fade animation
    .fade-enter-active, .fade-leave-active{
        transition: opacity 0.2s ease;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

    // styles for modal
    .vuemodal{
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left:0;
        z-index: 9;

        &-backdrop{
            background-color: rgba($color: #000, $alpha: 0.76);
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left:0;
            z-index: 1;            
        }

        &-dialog{
            background-color: white;
            position: relative;
            border-radius: 6px;

            display: flex;
            flex-direction: column;
            z-index: 2; // higher than backdrop

            // you can change below values
            width: 500px;
            margin: 50px auto;

            // adjust width on mobile
            @media screen and (max-width: 560px) {
                width: 90%;
            }
        }

        // close button
        &-close{
            width: 30px;
            height: 30px;
        }

        &-header{
            padding: 10px 15px 0px 0px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between; // space between title & close button
        }

        &-body{
            padding: 15px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        // footer styles below
        // &-footer{

        // }
    }
</style>