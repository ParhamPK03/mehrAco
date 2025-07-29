"use client";
import React from "react";

const BrandFilter = ({ selectedBrands, onBrandChange, brands = [] }) => {
  const handleChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="py-5 px-4">
      <h3 className="font-medium mb-2">برند</h3>
      <div className="space-y-1">
        {brands
          .filter((brand) => typeof brand === "string" && brand.trim() !== "")
          .map((brand, index) => (
            <label
              key={`${brand}-${index}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleChange(brand)}
                className="accent-black cursor-pointer"
              />
              <span>{brand}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default BrandFilter;
