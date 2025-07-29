"use client"
import React from "react";
import { Search } from "lucide-react";

const HeadSection = ({ onSearchChange }) => {
  return (
    <div className="w-full h-[100px] bg-blue-200 px-4 py-6 font-ShabnamMedium">
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="جستجوی محصولات..."
          className="w-full pl-12 pr-4 py-3 border border-blue-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-500 text-blue-800"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
      </div>
    </div>
  );
};

export default HeadSection;
