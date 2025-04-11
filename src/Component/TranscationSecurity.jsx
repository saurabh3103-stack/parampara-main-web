import React from "react";

const TranscationSecurity = () => {
    return(
        <>
            <div className="bg-primary-100 space-y-3 p-3 text-xs">
                <p className="text-primary font-semibold">Get it in 7 days</p>
                <div className="space-y-2">
                    <div>
                        <span><i className="fas fa-store"></i></span>
                        &nbsp;<span className="font-semibold">Store Pickup: </span>
                        <span>Order now for pickup on Wed, Jul 7 at Neykart Store.</span>
                        <span className="cursor-pointer underline">Discover all pickup locations</span>
                    </div>
                    <div>
                        <span><i className="fas fa-truck-fast"></i></span>
                        &nbsp;<span className="font-semibold">Shipping &amp; Delivery: </span>
                        <span>Available in your Area.</span>
                        <span className="cursor-pointer underline">Enter your location</span>
                    </div>
                    <div>
                        <span><i className="fas fa-circle-arrow-left"></i></span>
                        &nbsp;<span className="font-semibold">Easy Return: </span>
                        <span>Return this items until Jul 22, Learn more about</span>
                        <span className="underline"><a href="#">Return Policy</a></span>
                    </div>
                </div>
            </div>
            <img src="http://localhost:5173/image/trust-symbols_a.webp" className="img-fluid w-fullmax-w-full h-auto" alt="transcation"/>                        
            <div>
                <p className="text-xs">
                    <span><i className="fas fa-lock"></i></span> This is the secure transaction.
                </p>
            </div>
        </>
    )
}
export default TranscationSecurity;