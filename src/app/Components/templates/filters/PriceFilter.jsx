"use client";
import React, { useState } from "react";

const PriceFilter = ({ onPriceChange }) => {
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);
  
    onPriceChange(value > 0 ? value : null);
  };

  return (
    <div className="px-4 py-5">
      <h3 className="font-medium mb-2">فیلتر قیمت (دلار)</h3>
      <div className="flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={price}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
          <span>0$</span>
          <span>1000$</span>
        </div>
        {price > 0 ? (
          <span className="mt-2 text-blue-800 font-bold">
            حداکثر قیمت: {price}$
          </span>
        ) : (
          <span className="mt-2 text-gray-500">فیلتر قیمت غیرفعال است</span>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
