import { useState } from "react";
import { Badge } from "./badge";
import { useCart } from "@/context/cartContext";
import { Cart } from "./cart";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/cart.svg";
import ProductListWithSearch from "./productListWithSearch";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <div className="border-b bg-regalBlue  w-full z-[8px]">
      <div className="mx-auto flex h-16 max-w-[1057px] items-center justify-between gap-6 max-lg:px-4">
        <Link
          className="flex items-center font-sans text-2xl font-bold text-white lg:text-32"
          to={`/`}
        >
          Bloom Store
        </Link>
        <ProductListWithSearch />
        <div className="relative">
          <Badge
            count={cartCount}
            color="red"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <img src={CartIcon} alt="Cart" className="h-6 w-6" />
          </Badge>
          
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </div>
  );
}
