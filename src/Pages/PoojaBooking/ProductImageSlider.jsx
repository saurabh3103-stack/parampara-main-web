import React, { useState } from "react";

const ProductImageGallery = ({slider}) => {
  const IMGURL="http://localhost:3000";
  const image= slider ;
  // const images = [
  //   "http://localhost:5173/assets/img/products/fashion/women/18.jpg",
  //   "http://localhost:5173/assets/img/products/fashion/women/19.jpg",
  //   "http://localhost:5173/assets/img/products/fashion/women/20.jpg",
  // ];

  // const [currentImage, setCurrentImage] = useState(images[0]);

  // const handleThumbnailClick = (image) => {
  //   setCurrentImage(image);
  // };

  return (
    <div className="flex justify-center">
      {/* Large Image Section */}
      <div className="relative w-full">
        <div className="overflow-hidden w-full h-full">
          <img
            src={IMGURL+image}
            alt="Product"
            className="w-3/4 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
