import React from "react";
import { Filter, Grid, List } from "lucide-react";

export default function BhajanFilterRight({
  view,
  setView,
  itemsPerPage,
  setItemsPerPage,
  sortBy,
  setSortBy,
  isMobile,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            className="rounded-full p-2 border"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <button
            className={`h-8 w-8 p-2 ${view === "grid" ? "bg-red-600 text-white" : "border"}`}
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            className={`h-8 w-8 p-2 ${view === "list" ? "bg-red-600 text-white" : "border"}`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="w-16 p-1 border rounded"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1 md:flex-none">
          <span className="text-sm whitespace-nowrap">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-[180px] p-1 border rounded"
          >
            <option value="popularity">popularity</option>
            <option value="price-low-high">price: low to high</option>
            <option value="price-high-low">price: high to low</option>
            <option value="name-a-z">name: A to Z</option>
            <option value="name-z-a">name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}