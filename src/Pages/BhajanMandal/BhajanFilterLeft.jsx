import React, { useState } from "react";
import { Star } from "lucide-react"; // Importing the Star icon

export default function BhajanFilterLeft({
  priceRange,
  setPriceRange,
  selectedRatings,
  handleRatingChange,
  productStatus,
  handleProductStatusChange,
  selectedBrands,
  handleBrandChange,
  applyFilters,
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="font-semibold text-lg mb-4">Bhajan Mandal Filters</h2>

      {/* Price Filter */}
      <div className="border-t pt-4 mb-6">
        <h3 className="font-semibold mb-3">Filter By Price</h3>
        <div className="space-y-2 mb-3">
          {["₹0 - ₹500.00", "₹500.00 - ₹1,000.00", "₹1,000.00 - ₹1,500.00", "₹1,500.00 - ₹2,000.00"].map((range, i) => (
            <div key={i} className="flex items-center space-x-2">
              <input type="checkbox" id={`price-${i + 1}`} />
              <label htmlFor={`price-${i + 1}`} className="text-sm">
                {range}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          onClick={applyFilters}
        >
          APPLY
        </button>
      </div>

      {/* Rating Filter */}
      <div className="border-t pt-4 mb-6">
        <h3 className="font-semibold mb-3">Filter By Rating</h3>
        <div className="space-y-2">
          {[5, 4].map((rating) => (
            <div key={rating} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                  {rating === 5 ? (
                    [1, 2, 3, 4, 5].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)
                  ) : (
                    "4 & Up"
                  )}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">{rating === 5 ? 20 : 16}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Status Filter */}
      <div className="border-t pt-4 mb-6">
        <h3 className="font-semibold mb-3">Product Status</h3>
        <div className="space-y-2">
          {["In stock", "Out of stock", "On sale"].map((status) => (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={status.toLowerCase()}
                  checked={productStatus.includes(status)}
                  onChange={() => handleProductStatusChange(status)}
                />
                <label htmlFor={status.toLowerCase()} className="text-sm">
                  {status}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">{status === "In stock" ? 75 : status === "On sale" ? 29 : 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}