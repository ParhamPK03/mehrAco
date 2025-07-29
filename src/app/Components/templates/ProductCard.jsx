import Image from "next/image";
import React from "react";

const ProductCard = ({ image, name, brand, price, inStock, onMoreInfo }) => {
  return (
    <div className="md:w-[300px] sm:w-[600px] w-[90%] max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-sm mt-10 mb-10 mx-auto border-blue-400/40 shadow-blue-400/60 border">
      
      <div className="relative w-full h-[220px] flex justify-center items-center">
        <Image
          alt={name || "تصویر محصول"}
          src={image}
          width={260}
          height={220}
          className="object-contain rounded-t-2xl"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2 text-right">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">برند: {brand}</p>
        <p className="text-base text-gray-700 font-medium">
          قیمت: {typeof price === "number" ? `${price}$` : "نامشخص"}
        </p>
        <span
          className={`text-sm font-bold ${
            inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          {inStock ? "موجود" : "ناموجود"}
        </span>
        <button
          onClick={onMoreInfo}
          className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:scale-105 transition cursor-pointer duration-300"
        >
          اطلاعات بیشتر
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
