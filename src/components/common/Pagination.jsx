import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ 
  pagination, 
  onPageChange, 
  onLimitChange,
  showCounts = true 
}) => {
  const { 
    current_page, 
    per_page, 
    total_records, 
    total_pages, 
    has_next, 
    has_prev 
  } = pagination;

  if (total_pages <= 1 && total_records <= per_page) return null;

  const startRecord = (current_page - 1) * per_page + 1;
  const endRecord = Math.min(current_page * per_page, total_records);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(total_pages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white border-t border-gray-200">
      {showCounts && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startRecord}</span> to{' '}
          <span className="font-medium">{endRecord}</span> of{' '}
          <span className="font-medium">{total_records}</span> results
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        {/* Items per page */}
        <select
          value={per_page}
          onChange={(e) => onLimitChange(parseInt(e.target.value))}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[10, 20, 50, 100].map(size => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>

        {/* Pagination controls */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(current_page - 1)}
            disabled={!has_prev}
            className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded border ${
                current_page === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(current_page + 1)}
            disabled={!has_next}
            className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};