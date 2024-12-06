import React from "react";

const AboutDetails = () => {
    return(
        <>
            <div className="bg-gray-100 ">
            <div className="container max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4">
                        <h2 className="text-2xl font-semibold mb-4">astrology revels the will of god
                        </h2>
                        <p className="text-gray-700">
                        Astrology as a predictive science facilitates fortune tellers and astrologers to dive deep into the study of a person’s unique
                         traits right from the moment he or she is born, the native’s strengths and weaknesses and life ahead, etc. The zodiac is the belt of
                          constellations through which the Sun, the Moon and the planets transit across the sky. There are many passionate believers who feel that
                           the future can indeed be predicted by studying the position of the Sun, the Moon and the planets’ position at the time of birth. There 
                           are various popular schools of astrology worldwide and significant among these are – Western, Indian, Chinese and Egyptian, etc. 
                           The astrological chart which holds an all-important place in astrological readings is of course, what we commonly refer to as the ‘Horoscope’.
                            This acts as a guide to analyzing one’s future, likes, dislikes and events that are likely to occur in one’s life as per interpretations available in astrology.
                        </p>
                        <div class="mt-16 flex w-full items-center justify-center space-x-4 lg:mt-14 lg:justify-start">
                        <span class="btn btn-outline w-36 p-3 uppercase sm:w-52"><a href="#">Read More</a></span></div>
                    </div>
                    <div className="bg-gray-100 p-4">
                        <img src="https://deificindia.com/namonamah/assets/image/about_img.jpg" />
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default AboutDetails;