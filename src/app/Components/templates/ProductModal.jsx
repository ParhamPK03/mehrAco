import Loader from "../../../utils/Loader";
import React, { useState } from "react";

export default function ProductModal({ product, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50 font-ShabnamMedium text-blue-900">
      <div className="bg-blue-200 p-6 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-4xl font-bold cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        {!imgLoaded && (
          <div className="mt-10">
            <Loader />
          </div>
        )}

        <img
          src={product.images[0]}
          alt={product.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            display: imgLoaded ? "block" : "none",
            maxHeight: "300px",
            margin: "auto",
          }}
        />

        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

        <p>
          <strong>قیمت:</strong> {product.price} $
        </p>
        <p>
          <strong>برند:</strong> {product.brand}
        </p>
        <p>
          <strong>دسته‌بندی:</strong> {product.category}
        </p>
        <p>
          <strong>تعداد موجودی:</strong> {product.stock}
        </p>
        <p className="mt-3">
          <strong>توضیحات:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}
