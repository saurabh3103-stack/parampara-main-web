// BhajanCategory.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";

const BhajanCategory = ({ 
  categories = [], 
  selectedCategory, 
  onSelectCategory 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryId) => {
    onSelectCategory(prev => prev === categoryId ? null : categoryId);
  };

  const filteredCategories = categories.filter(category => 
    category?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <h2 className="font-semibold text-lg mb-4">Shop by Categories</h2>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Find a category"
          className="pl-8 w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        <div 
          className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
            selectedCategory === null 
              ? 'bg-blue-50 border border-blue-200' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
            selectedCategory === null ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
          }`}>
            {selectedCategory === null && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium">All Categories</span>
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div 
              key={category._id} 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                selectedCategory === category._id 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                selectedCategory === category._id ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
              }`}>
                {selectedCategory === category._id && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{category.category}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            {categories.length === 0 
              ? "No categories available" 
              : `No categories found matching "${searchTerm}"`}
          </div>
        )}
      </div>
    </div>
  );
};

export default BhajanCategory;