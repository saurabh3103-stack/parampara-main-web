import React from "react";
import Breadcrumb from "../../Component/Breadcrumb";

const ContactUs = () =>{
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Contact Us', url: '/contact-us' },
        { pagename: 'Contact Us' },
    ];
    return(
        <>
            <Breadcrumb links={breadcrumbLinks} />
            <div>
        <div class="mx-auto w-full space-y-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:max-w-6xl xl:px-4">
          <div class="flex space-x-0 sm:space-x-8 xl:space-x-16">
            <div class="w-full space-y-6 sm:w-1/2 md:w-2/5">
              <div class="pt-6">
                <div class="space-y-5">
                  <div>
                    <p>Please feel free to us a message or questions.</p>
                  </div>
                  <div class="relative z-0 w-full">
                    <input
                      type="text"
                      id="contact-full-name"
                      class="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required=""
                    />
                    <label
                      for="contact-full-name"
                      class="peer-focus:text-primary-600 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                      >Full Name <span class="font-semibold text-red-600">*</span></label
                    >
                  </div>
                  <div class="relative z-0 w-full">
                    <input
                      type="email"
                      id="contact-email-address"
                      class="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required=""
                    />
                    <label
                      for="contact-email-address"
                      class="peer-focus:text-primary-600 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                      >Email address <span class="font-semibold text-red-600">*</span></label
                    >
                  </div>
                  <div class="relative z-0 w-full">
                    <input
                      type="email"
                      id="contact-tel-number"
                      class="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                      placeholder=" "
                      required=""
                    />
                    <label
                      for="contact-tel-number"
                      class="peer-focus:text-primary-600 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                      >Phone number (<i>Optional</i>)</label
                    >
                  </div>
                  <div class="relative">
                    <textarea
                      id="contact-message"
                      placeholder=" "
                      class="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                      autocomplete="off"
                      cols="30"
                      rows="3"
                    ></textarea>
                    <label
                      for="contanct-message"
                      class="peer-focus:text-primary-600 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                      >Message <span class="font-semibold text-red-600">*</span></label
                    >
                  </div>
                  <button id="submitButton" class="btn-gradient w-40">Send</button>
                </div>
              </div>
            </div>
            <div class="hidden h-full sm:block sm:w-1/2 md:w-3/5">
              <img class="h-full w-full rounded object-fill" src="assets/img/map/map.png" alt="" />
            </div>
          </div>
          <div>
            <div class="w-full space-y-3 sm:w-3/5">
              <h1 class="text-xl font-bold text-gray-600">Call or Chat with us</h1>
              <div class="w-24 border-2 border-gray-600"></div>
            </div>
            <div class="pt-6"></div>
            <div class="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-16">
              <div class="col-span-1 grid space-y-2">
                <h1 class="text-lg font-semibold">Sale Support</h1>
                <div
                  class="flex flex-col space-y-1 text-gray-600 lg:flex-row lg:items-center lg:justify-between lg:space-y-0"
                >
                  <div class="space-x-2">
                    <span><i class="fas fa-phone"></i></span>
                    <span>(123) 456-7890, (111) 222-3333</span>
                  </div>
                  <div class="space-x-2">
                    <span><i class="fas fa-envelope"></i></span>
                    <span>sales@email.com</span>
                  </div>
                </div>
                <div class="text-gray-600">
                  <span>Time: (Mon - Fri)</span>
                  <span>8am - 6pm</span>
                </div>
              </div>
              <div class="col-span-1 grid">
                <h1 class="text-lg font-semibold">Technical Support</h1>
                <div
                  class="flex flex-col space-y-1 text-gray-600 lg:flex-row lg:items-center lg:justify-between lg:space-y-0"
                >
                  <div class="space-x-2">
                    <span><i class="fas fa-phone"></i></span>
                    <span>(123) 456-7890, (111) 222-3333</span>
                  </div>
                  <div class="space-x-2">
                    <span><i class="fas fa-envelope"></i></span>
                    <span>tech.support@email.com</span>
                  </div>
                </div>
                <div class="text-gray-600">
                  <span>Time: (Mon - Mon)</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="w-3/5 space-y-3">
              <h1 class="text-xl font-bold text-gray-600">Our Offices</h1>
              <div class="w-24 border-2 border-gray-600"></div>
            </div>
            <div class="pt-6"></div>
            <div class="pb-3">Please choose the Office which is nearest to you.</div>
            <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
              <div class="col-span-2 grid rounded bg-white px-4 py-6 shadow">
                <div class="text-base font-semibold">Head Office</div>
                <div class="text-base font-semibold">Neykart LLC</div>
                <div class="space-y-1 py-2 text-sm">
                  <p>info@email.com</p>
                  <p>(123) 345-6789</p>
                  <p>12345 N Park Ave,</p>
                  <p>STE 67110</p>
                  <p>Elkhart, IN</p>
                  <p>46514, United States</p>
                </div>
              </div>
              <div class="col-span-2 grid rounded bg-white px-4 py-6 shadow">
                <div class="text-base font-semibold">California Office</div>
                <div class="text-base font-semibold">Neykart LLC</div>
                <div class="space-y-1 py-2 text-sm">
                  <p>info.ca@email.com</p>
                  <p>(123) 345-6789</p>
                  <p>12345 N Park Ave,</p>
                  <p>STE 67110</p>
                  <p>Los Angeles, CA</p>
                  <p>12345, United States</p>
                </div>
              </div>
              <div class="col-span-2 grid rounded bg-white px-4 py-6 shadow">
                <div class="text-base font-semibold">UK Office</div>
                <div class="text-base font-semibold">Neykart LLC</div>
                <div class="space-y-1 py-2 text-sm">
                  <p>info.uk@email.com</p>
                  <p>(123) 345-6789</p>
                  <p>12345 N Park Ave,</p>
                  <p>STE 67110</p>
                  <p>London, United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default ContactUs;