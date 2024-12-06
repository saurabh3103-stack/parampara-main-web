import React from "react";

const PromotionalBanner = () =>{

    return(
        <>
            <div class="mx-auto mt-12 mb-12 w-full px-4 sm:w-full sm:px-6 xl:max-w-7xl xl:px-2">
            <div id="sponsoredItems">
                <div class="mt-7 space-y-1">
                <h1 class="text-sm font-semibold sm:text-2xl">Explore our Black Friday Deals.</h1>
                <p class="cursor-pointer text-xs hover:underline">
                    sponsored <span><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"></path></svg></span>
                </p>
                <div>
                    <a href="#!"><img src="../public/assets/img/banners/black_friday.png" alt=""/></a>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default PromotionalBanner;