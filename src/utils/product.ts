import { Product } from "@/types";

export function applyProductDiscounts(product: Product): Product {
  const isMensClothing = product.category.toLowerCase() === "men's clothing";
  const discountPercentage = isMensClothing ? 10 : 0;

  return {
    ...product,
    discountedPrice: isMensClothing ? product.price * 0.9 : product.price,
   discountPercentage,
   hasDiscount: isMensClothing
  };
}