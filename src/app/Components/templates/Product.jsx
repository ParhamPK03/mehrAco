"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";
import ProductCard from "../../Components/templates/ProductCard";
import HeadSection from "./HeadSection";
import Sidebar from "../../Components/templates/filters/Sidebar";
import { useFilter } from "../../../Context/FilterContext";
import ProductModal from "./ProductModal";
import { useState } from "react";
import Loader from "../../../utils/Loader";

export default function MyProducts() {
  const {
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
  } = useFilter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const limit = 8;

  const { data, isLoading, error } = useProducts({
    page,
    limit,
    searchTerm: debouncedSearchTerm,
    brands: selectedBrands,
    sort,
    maxPrice,
  });

  const productsToShow = data?.products || [];
  const totalProducts = data?.total || 0;

  return (
    <div className="flex font-ShabnamMedium">
      <Sidebar
        selectedBrands={selectedBrands}
        onBrandChange={setSelectedBrands}
        onSortChange={setSort}
        onPriceChange={setMaxPrice}
      />

      <div className="w-full">
        <HeadSection onSearchChange={setSearchTerm} />

        {error && <p className="text-red-500 mt-4">خطا: {error.message}</p>}

        {isLoading ? (
          <div className="mt-96">
            <Loader />
          </div>
        ) : productsToShow.length === 0 ? (
          <p className="mt-80 text-3xl text-red-500 flex items-center justify-center">
            محصولی یافت نشد.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10 gap-6 px-4">
              {productsToShow.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.thumbnail}
                  name={product.title}
                  brand={product.brand || "نامشخص"}
                  price={product.price}
                  inStock={product.stock > 0}
                  onMoreInfo={() => setSelectedProduct(product)}
                />
              ))}
              {selectedProduct && (
                <ProductModal
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                />
              )}
            </div>

            <div className="flex justify-center gap-4 my-10 text-white">
              <button
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-400 rounded-lg disabled:opacity-50 hover:bg-blue-500 duration-300 cursor-pointer"
              >
                قبلی
              </button>

              <span className="px-4 py-2">
                صفحه {page} از {Math.ceil(totalProducts / limit)}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page * limit >= totalProducts}
                className="px-4 py-2 bg-blue-400 hover:bg-blue-500 duration-300 cursor-pointer rounded-lg disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
