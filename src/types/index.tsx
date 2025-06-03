export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  discountedPrice?: number;
  discountPercentage?: number
  hasDiscount?: boolean

};

export type CartItem = {
  product: Product;
  quantity: number;
};
