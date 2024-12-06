import React from "react";

const VirtualService = () =>{
    const services=[
        {image:'https://deificindia.com/namonamah/assets/image/service/horoscope.png', title:'Daily Horoscope'},
        {image:'https://deificindia.com/namonamah/assets/image/service/ask.png', title:'Ask Pandit Ji'},
        {image:'https://deificindia.com/namonamah/assets/image/service/locater.png', title:'Temple Locator'},
    ];
    return(
        <>
            <section className="bg-white px-5 rashi_wrapper" id="zodiac_Sign" style={{backgroundColor:"#fff"}}>
            <div className="container mx-auto px-12">
                <div className="heading_wrapper">
                    <h2>Virtual <span>Services</span></h2>
                    <p>Ask Pandit Ji</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 lg:px-12">
                    {services.map((Service,index) =>(
                        <div key={index} className="rashi_sign_box bg-white">
                            <div className="sign_box_img  flex justify-center">
                                <img src={Service.image} alt={services.title} className="object-cover" style={{height:"160px",width:"160px"}}/>
                            </div>
                            <div className="sign_box_cont text-center p-4">
                                <h4 className="text-xl font-semibold">{Service.title}</h4>
                                <a href="javascript:void(0)" className="btn btn-outline w-28 p-3 uppercase sm:w-52 book_now  text-white px-4 py-2 rounded hover:bg-[#ff7e00]">
                                    Book Now
                                </a>
                            </div>
                        </div>
                    ))
                    
                    }
                </div>
            </div>
        </section>  
        </>
    );
}

export default VirtualService;