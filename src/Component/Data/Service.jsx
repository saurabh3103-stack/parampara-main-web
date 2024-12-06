import React from "react";


const Service = () => {
    const services=[
        {image:'https://deificindia.com/namonamah/assets/image/service/pandit.png', title:'Pooja Booking',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/shoping.jpeg', title:'E-Store',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/brahman.png', title:'Brahman Bhoj',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/bhajan3.png', title:'Bhajan Mandal',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/donate.jpg', title:'Temple Donation',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/dailypandit.png', title:'Daily Pandit',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/pooja.png', title:'Puja at Temple',url:'javascript:void(0)'},
        {image:'https://deificindia.com/namonamah/assets/image/service/darshan1.png', title:'Darshan Booking',url:'javascript:void(0)'},
    ];
    return(
        <section className="bg-white px-5 rashi_wrapper" id="zodiac_Sign">
            <div className="container mx-auto px-12">
                <div className="heading_wrapper">
                    <h2>Choose Our <span>Services</span></h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:px-12">
                    {services.map((Service,index) =>(
                        <div key={index} className="rashi_sign_box ">
                            <div className="sign_box_img  flex justify-center">
                                <img src={Service.image} alt={services.title} className="object-cover" style={{height:"92px",width:"62px"}}/>
                            </div>
                            <div className="sign_box_cont text-center p-4">
                                <h4 className="text-xl font-semibold">{Service.title}</h4>
                                <a href={Service.url} className="btn btn-outline w-28 p-3 uppercase sm:w-52 book_now  text-white px-4 py-2 rounded hover:bg-[#ff7e00]">
                                    Book Now
                                </a>
                            </div>
                        </div>
                    ))
                    
                    }
                </div>
            </div>
        </section>    
    );  
}   

export default Service;