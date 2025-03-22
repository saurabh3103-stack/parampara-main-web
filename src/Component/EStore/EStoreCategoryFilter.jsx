import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Search } from "lucide-react";

const EStoreCategoryFilter = () => {
  const { filtercategoryID, setFilterCategoryID, categoryData } = useContext(AppContext);
  const categoryArray = categoryData?.data ? Object.values(categoryData.data) : [];

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setFilterCategoryID(categoryId);
  };

  const handleAllClick = () => {
    setActiveCategory(null);
    setFilterCategoryID(null);
  };

  const filteredCategories = categoryArray.filter((val) =>
    val.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      <h2 className="font-semibold text-lg mb-4">Shop by Categories</h2>

      {/* Search Bar */}
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

      {/* Category Filters */}
      <div className="space-y-2">
        {/* All Button */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="all-category"
            checked={activeCategory === null}
            onChange={handleAllClick}
            className="accent-primary"
          />
          <label htmlFor="all-category" className="text-sm font-medium">
            All Categories
          </label>
        </div>

        {/* Dynamic Category List */}
        {filteredCategories.map((category) => (
          <div key={category._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`category-${category._id}`}
              checked={activeCategory === category._id}
              onChange={() => handleCategoryClick(category._id)}
              className="accent-primary"
            />
            <label htmlFor={`category-${category._id}`} className="text-sm">
              {category.category_name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EStoreCategoryFilter;