import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-red-600 text-white" : "bg-white"}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
