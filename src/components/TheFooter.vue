<template>
    <div class="footer">
        <div class="container mx-auto px-3 pt-4 md:pt-12 pb-0 text-gray-500">
            <div class="flex flex-wrap justify-between items-center py-3">
                <div class="author-links mb-4">
                    <p class="text-gray-600 text-sm mb-2">Reach out to developer</p>
                    <!-- Place this tag where you want the button to render. -->
                    <div class="dev-buttons flex items-center">
                        <a class="github-button" href="https://github.com/root-0" data-size="large" aria-label="Follow @root-0 on GitHub">Follow Me</a>
                    
                        <a href="https://www.linkedin.com/in/akshay-rajput/" rel="noopener noreferrer" class="btn-linkedin">
                            Connect | <span class="fab fa-linkedin text-"></span>
                        </a>
                    </div>
                </div>
                <div class="site-credits">
                    <span class="fa fa-code"></span> by 
                    <h5 class="inline">
                        <a href="https://root-0.github.io/" target="_blank" title="Developer website"
                            rel="noreferrer noopener" class="hover:text-orange-300 text-teal-400">Akshay</a>
                    </h5>
                </div>
            </div>
        </div>
        
        <div class="copyright md:text-center text-xs text-gray-500 p-3 border-t border-dashed border-gray-600">
            <span class="font-semibold leading-6">Disclaimer: </span>All images & products featured belong to their respective copyright holders. <br> This website is just for illustration purposes. 
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';
    .footer{
        background: $dark;

        .btn-linkedin{
            padding: 4px 8px;
            font-size: 0.8rem;
            line-height: 1rem;
            border: slateblue 1px solid;
            background: slateblue;
            color: white;
            margin-top: -6px;
            margin-left: 10px;
            border-radius: 4px;

            &:hover{
                background: teal;
                border-color: teal;
                transition: all ease 0.35s;
            }

            span{
                font-size: 1rem;
            }
        }
    }
</style>