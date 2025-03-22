import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const RelatedPooja = ({ currentPujaId }) => {
  const relatedProducts = [
    {
      id: 1,
      title: "Sunderkand Paath",
      price: 11999,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 87,
    },
    {
      id: 2,
      title: "Satyanarayan Puja",
      price: 8999,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 3,
      title: "Navgraha Shanti Puja",
      price: 15999,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 92,
    },
  ];

  return (
    <div className="mt-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Related Items</h2>
        <button className="text-primary text-sm flex items-center">
          <i className="bi bi-info-circle mr-1"></i>
          <span>Sponsored</span>
        </button>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden group bg-white shadow-sm">
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0 flex items-center justify-center">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">Puja Services</div>
              <h3 className="font-medium text-lg mb-2 truncate">{product.title}</h3>

              {/* Rating & Reviews */}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
                </div>
                <span className="mx-1 text-gray-300">|</span>
                <span className="text-xs text-gray-600">{product.reviews} Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-4">
                <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
              </div>

              {/* Select Button */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                SELECT OPTIONS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPooja;
