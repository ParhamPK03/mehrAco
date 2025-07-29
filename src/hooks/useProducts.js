import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, limit, searchTerm, brands, sort, maxPrice }] = queryKey;

  const allProductsResponse = await api.get(`/products?limit=100`);
  let filteredProducts = allProductsResponse.data.products;

 
  if (brands?.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      brands.includes(product.brand)
    );
  }

  
  if (maxPrice && maxPrice > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

 
  if (searchTerm && searchTerm.trim() !== "") {
    const searchTermLower = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => {
      const titleLower = product.title.toLowerCase();
      return (
        titleLower.startsWith(searchTermLower) ||
        titleLower.split(/\s+/).some((word) => word.startsWith(searchTermLower))
      );
    });
  }

  
  switch (sort) {
    case "cheapest":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "popular":
    case "top_rated":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    default:
      break;
  }

  return {
    products: filteredProducts.slice((page - 1) * limit, page * limit),
    total: filteredProducts.length,
    skip: (page - 1) * limit,
    limit,
  };
};

export const useProducts = ({
  page,
  limit,
  searchTerm,
  brands,
  sort,
  maxPrice,
}) => {
  return useQuery({
    queryKey: ["products", { page, limit, searchTerm, brands, sort, maxPrice }],
    queryFn: fetchProducts,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};
