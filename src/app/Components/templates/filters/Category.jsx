"use client";
import React, { useState } from "react";

const CATEGORIES = [
  { label: "گران‌ترین", value: "expensive" },
  { label: "ارزان‌ترین", value: "cheapest" },
  { label: "محبوب‌ترین", value: "popular" },
  { label: "جدیدترین", value: "newest" },  
  { label: "امتیاز بالا", value: "top_rated" },  
  { label: "پیشنهاد ویژه", value: "featured" },  
];

const Category = ({ onSortChange }) => {
  const [activeCategory, setActiveCategory] = useState("expensive");

  const handleChange = (value) => {
    setActiveCategory(value);
    onSortChange(value);
  };

  return (
    <div className="">
      <h2 className="font-bold mb-2 px-4 pb-4">دسته‌بندی محصولات :</h2>
      <div className="flex flex-col mx-auto justify-center items-center gap-y-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleChange(cat.value)}
            className={`w-[180px] flex flex-col items-center py-2 rounded-full border cursor-pointer ${
              activeCategory === cat.value
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
