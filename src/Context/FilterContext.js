"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const router = useRouter();

  // خواندن پارامترهای URL بدون استفاده از useSearchParams
  const getInitialPage = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return parseInt(params.get("page")) || 1;
    }
    return 1;
  };

  const [page, setPage] = useState(getInitialPage());
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sort, setSort] = useState("cheapest");
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedBrands]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const value = {
    page,
    searchTerm,
    debouncedSearchTerm,
    selectedBrands,
    sort,
    maxPrice,
    setSearchTerm,
    setSelectedBrands,
    setSort,
    setMaxPrice,
    handlePageChange,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
