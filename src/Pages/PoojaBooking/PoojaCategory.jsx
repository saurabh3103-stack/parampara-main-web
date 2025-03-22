import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Search } from "lucide-react";

const PoojaCategory = ({ selectedCategory, setSelectedCategory }) => {
  const { categoryData } = useContext(AppContext);
  const categoryArray = categoryData?.data ? Object.values(categoryData.data) : [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredCategories = categoryArray.filter((val) => 
    val?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <h2 className="font-semibold text-lg mb-4">Shop by Categories</h2>

      {/* Search Input */}
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

      {/* Categories List */}
      <div className="space-y-2">
        {/* "All" Category */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="all-category"
            checked={selectedCategory === null}
            onChange={() => handleCategoryClick(null)}
            className="accent-primary"
          />
          <label htmlFor="all-category" className="text-sm font-medium">All Categories</label>
        </div>

        {/* Dynamic Categories */}
        {filteredCategories.map((val) => (
          <div key={val._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`category-${val._id}`}
              checked={selectedCategory === val._id}
              onChange={() => handleCategoryClick(val._id)}
              className="accent-primary"
            />
            <label htmlFor={`category-${val._id}`} className="text-sm">{val.category}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoojaCategory;