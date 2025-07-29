"use client";
import React, { useState, useEffect } from "react";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import Category from "./Category";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../lib/axios";
import { Menu, X } from "lucide-react";

const Sidebar = ({
  selectedBrands,
  onBrandChange,
  onSortChange,
  onPriceChange,
}) => {
  const [localBrands, setLocalBrands] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await api.get("/products");
      const brands = [
        ...new Set(res.data.products.map((product) => product.brand)),
      ];
      setLocalBrands(brands);
      return brands;
    },
    staleTime: 60 * 60 * 1000,
  });

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar container */}
      <aside
        className={`w-full md:w-64 bg-blue-200 font-ShabnamMedium text-blue-900
          fixed md:static inset-y-0 z-40 transition-all duration-300 overflow-y-auto
          ${isMobileMenuOpen ? "right-0" : "-right-full md:right-0"}`}
      >
        {/* Sidebar content with full height */}
        <div className="min-h-full flex flex-col">
          <div className="p-4">
            <h2 className="text-lg font-semibold pt-4">اعمال فیلتر :</h2>
          </div>

          <div className="flex-grow px-4 pb-4 space-y-6 overflow-y-auto">
            {isLoading ? (
              <div className="p-4">در حال بارگذاری برندها...</div>
            ) : error ? (
              <div className="p-4 text-red-600">
                خطا در دریافت برندها: {error.message}
              </div>
            ) : (
              <>
                <BrandFilter
                  selectedBrands={selectedBrands}
                  onBrandChange={onBrandChange}
                  brands={localBrands.length > 0 ? localBrands : []}
                />

                <hr className="border-blue-950/40 my-4" />

                <PriceFilter onPriceChange={onPriceChange} />

                <hr className="border-blue-950/40 my-4" />

                <Category onSortChange={onSortChange} />
              </>
            )}
          </div>
          <h2 className="text-red-500 text-center">طراحی و ساخته شده توسط پرهام پورخانی</h2>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
