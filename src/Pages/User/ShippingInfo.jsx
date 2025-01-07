import React from "react";

const ShippingInfo = () => {

    return(
        <>
          <div id="accShippingBilling" class="accTabContent block space-y-10 py-3">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
              <div class="flex flex-auto items-center justify-between px-4">
                <div class="w-1/2 whitespace-nowrap text-base font-semibold sm:text-lg">Shipping &amp; Delivery</div>
                <div class="flex w-1/2 flex-row items-center justify-end text-sm">
                  <button class="btn-gradient w-16 sm:w-40" data-target-modal="#nk-modal-new-address">
                    <span class="block sm:hidden">+ New</span>
                    <span class="hidden sm:block">Add New Address</span>
                  </button>
                </div>
              </div>
              <div class="bo4der-gray-300 w-full border-b"></div>
              <div class="flex flex-col items-center space-x-4">
                <div
                  class="flex w-full flex-auto flex-col space-y-4 space-x-0 px-2 py-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 sm:px-4"
                >
                  <div
                    class="border-g4ay-300 flex w-full flex-col space-x-0 space-y-2 rounded border p-3 sm:w-1/2 sm:flex-row sm:space-y-0"
                  >
                    <div class="w-full space-y-1 text-sm sm:w-5/6">
                      <p class="font-semibold">John Doe Smith</p>
                      <p>johndoesmith@email.com</p>
                      <p>(123) 345-6789</p>
                      <p>12345 N Park Ave,</p>
                      <p>STE 67110</p>
                      <p>Elkhart, IN, 46514, US</p>
                    </div>
                    <div class="w-full space-y-3 text-xs sm:w-1/6">
                      <div>
                        <button
                          class="w-full rounded border border-blue-600 py-1 text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-full rounded border border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="right-0 bottom-0">
                        <p class="hover:text-primary cursor-pointer text-xs italic text-gray-300">Default address</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border-g4ay-300 flex w-full flex-col space-x-0 space-y-2 rounded border p-3 sm:w-1/2 sm:flex-row sm:space-y-0"
                  >
                    <div class="w-full space-y-1 text-sm sm:w-5/6">
                      <p class="font-semibold">John Doe Smith</p>
                      <p>johndoesmith@email.com</p>
                      <p>(123) 345-6789</p>
                      <p>12345 N Park Ave,</p>
                      <p>STE 67110</p>
                      <p>New York, NY, 46514, US</p>
                    </div>
                    <div class="w-full space-y-3 text-xs sm:w-1/6">
                      <div>
                        <button
                          class="w-full rounded border border-blue-600 py-1 text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-full rounded border border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="right-0 bottom-0">
                        <p class="hover:text-primary cursor-pointer text-xs italic text-gray-300">Set as Default</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
              <div class="flex flex-auto items-center justify-between px-4">
                <div class="w-1/2 whitespace-nowrap text-base font-semibold sm:text-lg">Billing Address</div>
                <div class="flex w-1/2 flex-row items-center justify-end text-sm">
                  <button class="btn-gradient w-16 sm:w-40" data-target-modal="#nk-modal-new-billing">
                    <span class="block sm:hidden">+ New</span>
                    <span class="hidden sm:block">Add New Address</span>
                  </button>
                </div>
              </div>
              <div class="bo4der-gray-300 w-full border-b"></div>
              <div class="flex flex-col items-center space-x-4">
                <div
                  class="flex w-full flex-auto flex-col space-y-4 space-x-0 px-2 py-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 sm:px-4"
                >
                  <div
                    class="border-g4ay-300 flex w-full flex-col space-x-0 space-y-2 rounded border p-3 sm:w-1/2 sm:flex-row sm:space-y-0"
                  >
                    <div class="w-full space-y-1 text-sm sm:w-5/6">
                      <p class="font-semibold">John Doe Smith</p>
                      <p>johndoesmith@email.com</p>
                      <p>(123) 345-6789</p>
                      <p>12345 N Park Ave,</p>
                      <p>STE 67110</p>
                      <p>Elkhart, IN, 46514, US</p>
                    </div>
                    <div class="w-full space-y-3 text-xs sm:w-1/6">
                      <div>
                        <button
                          class="w-full rounded border border-blue-600 py-1 text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-full rounded border border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="right-0 bottom-0">
                        <p class="hover:text-primary cursor-pointer text-xs italic text-gray-300">Default address</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border-g4ay-300 flex w-full flex-col space-x-0 space-y-2 rounded border p-3 sm:w-1/2 sm:flex-row sm:space-y-0"
                  >
                    <div class="w-full space-y-1 text-sm sm:w-5/6">
                      <p class="font-semibold">John Doe Smith</p>
                      <p>johndoesmith@email.com</p>
                      <p>(123) 345-6789</p>
                      <p>12345 N Park Ave,</p>
                      <p>STE 67110</p>
                      <p>New York, NY, 46514, US</p>
                    </div>
                    <div class="w-full space-y-3 text-xs sm:w-1/6">
                      <div>
                        <button
                          class="w-full rounded border border-blue-600 py-1 text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-full rounded border border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="right-0 bottom-0">
                        <p class="hover:text-primary cursor-pointer text-xs italic text-gray-300">Set as Default</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
              <div class="flex flex-col items-center justify-between space-x-0 space-y-2 px-4 lg:flex-row lg:space-y-0">
                <div class="w-full text-base font-semibold sm:text-lg lg:w-3/5 xl:w-1/2">
                  Payment Methods |
                  <span class="text-sm font-normal">You can add up to three Credit/Debit Card only</span>
                </div>
                <div
                  class="flex w-full flex-col items-center justify-between space-x-0 space-y-2 text-sm sm:flex-row sm:justify-between sm:space-y-0 lg:w-2/5 xl:w-1/2"
                >
                  <button class="btn-gradient btn-full sm:w-40 lg:w-24 xl:w-40" data-target-modal="#nk-modal-new-card">
                    <span class="hidden lg:block xl:hidden">+ Card</span>
                    <span class="block lg:hidden xl:block">Add New Card</span>
                  </button>
                  <button class="btn-gradient btn-full sm:w-40 lg:w-24 xl:w-40">
                    <span class="hidden lg:block xl:hidden">+ Paypal</span>
                    <span class="block lg:hidden xl:block">Paypal Account</span>
                  </button>
                  <button class="btn-gradient btn-full sm:w-40 lg:w-24 xl:w-40">
                    <span class="hidden lg:block xl:hidden">+ Bank</span>
                    <span class="block lg:hidden xl:block">Add Bank Account</span>
                  </button>
                </div>
              </div>
              <div class="bo4der-gray-300 w-full border-b"></div>
              <div
                class="flex flex-col space-x-0 space-y-3 px-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 sm:px-4"
              >
                <div class="w-full space-y-2 rounded border border-gray-300 p-4 sm:w-1/2 lg:w-1/3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div><img src="./assets/img/svg/brands/mastercard.svg" alt="" /></div>
                      <div>
                        <p class="flex items-center text-sm font-semibold sm:space-x-2">
                          <span class="hidden sm:block">**** **** </span>
                          <span>**** 6789</span>
                        </p>
                        <p class="text-xs text-gray-400">Expiry 12/26</p>
                      </div>
                    </div>
                    <div class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">Primary</div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-blue-600">
                    <div class="cursor-pointer rounded border border-blue-600 bg-blue-200 py-1 px-5">Edit</div>
                    <div class="cursor-pointer text-gray-400 hover:underline">Delete</div>
                  </div>
                </div>
                <div class="w-full space-y-2 rounded border border-gray-300 p-4 sm:w-1/2 lg:w-1/3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div><img src="./assets/img/svg/brands/visa-2.svg" alt="" /></div>
                      <div>
                        <p class="flex items-center text-sm font-semibold sm:space-x-2">
                          <span class="hidden sm:block">**** **** </span>
                          <span>**** 9876</span>
                        </p>
                        <p class="text-xs text-gray-400">Expiry 12/24</p>
                      </div>
                    </div>
                    <div class="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">Primary</div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-blue-600">
                    <div class="cursor-pointer rounded border border-blue-600 bg-blue-200 py-1 px-5">Edit</div>
                    <div class="cursor-pointer text-gray-400 hover:underline">Delete</div>
                  </div>
                </div>
              </div>
              <div class="px-2 sm:px-4">
                <div class="w-full space-y-2 rounded border border-gray-300 p-4 sm:w-1/2 lg:w-1/3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div><img class="h-16" src="./assets/img/svg/brands/paypal.svg" alt="" /></div>
                      <div>
                        <p class="text-sm font-semibold">joh****@****.com</p>
                      </div>
                    </div>
                    <div class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">Primary</div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-blue-600">
                    <div class="cursor-pointer rounded border border-blue-600 bg-blue-200 py-1 px-5">Change Email</div>
                    <div class="cursor-pointer text-gray-400 hover:underline">Delete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );

}

export default ShippingInfo;