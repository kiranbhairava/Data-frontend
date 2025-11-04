import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (defaultLimit = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || defaultLimit.toString());
  const sortBy = searchParams.get('sort_by') || 'id';
  const sortOrder = searchParams.get('sort_order') || 'desc';

  const updatePagination = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const setPage = useCallback((newPage) => {
    updatePagination({ page: newPage });
  }, [updatePagination]);

  const setLimit = useCallback((newLimit) => {
    updatePagination({ limit: newLimit, page: 1 }); // Reset to page 1 when changing limit
  }, [updatePagination]);

  const setSort = useCallback((newSortBy, newSortOrder) => {
    updatePagination({ sort_by: newSortBy, sort_order: newSortOrder });
  }, [updatePagination]);

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    setPage,
    setLimit,
    setSort,
    updatePagination
  };
};
