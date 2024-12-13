import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getVisiblePages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage, '...', totalPages);
            }
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex flex-row items-center justify-center py-7">
            {/* Previous Button */}
            <span
                className={`px-3 ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'hover:text-primary-800'}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
                <a>
                    <i className="fas fa-chevron-left"></i>
                </a>
            </span>

            {/* Page Numbers */}
            <span className="space-x-3">
                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return <span key={index}>...</span>;
                    }

                    return (
                        <a
                            key={page}
                            className={`rounded px-2 py-1 ${
                                page === currentPage
                                    ? 'bg-primary text-gray-50'
                                    : 'hover:bg-primary-300 hover:text-gray-50'
                            }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    );
                })}
            </span>

            {/* Next Button */}
            <span
                className={`px-3 ${
                    currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'hover:text-primary-800'
                }`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
                <a>
                    <i className="fas fa-chevron-right"></i>
                </a>
            </span>
        </div>
    );
};

export default Pagination;
