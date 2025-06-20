import { CartItem, Product } from '@/types';
import { applyProductDiscounts } from '@/utils/product';
import { createContext, useContext, useState } from 'react';

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
}

// Create a context with default values
const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartTotal: 0,
  cartCount: 0,
});

interface Props {
  children: React.ReactNode;
}

// Create a provider component that wraps the children components
export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const productWithDiscount = applyProductDiscounts(product);

    // check if the product is already in the cart or not
    console.log('Adding to cart:', product); 
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === productWithDiscount.id
    );

    // if the product is in the cart, update the quantity by 1
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
        product: productWithDiscount
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    }
    // if the product is not in the cart, add the product with quantity 1
    else {
      setCartItems([...cartItems, { product: productWithDiscount, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    }
  };

  
  const cartTotal = cartItems.reduce(
  (total, item) => total + (item.product.discountedPrice || item.product.price) * item.quantity,
  0
);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  if (CartContext === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return useContext(CartContext);
};