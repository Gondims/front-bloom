import { useState } from 'react';
import { Badge } from "./badge";
import { useCart } from '@/context/cartContext';
import { Cart } from './cart';
import { Link } from 'react-router-dom';
import CartIcon from "@/assets/cart.svg";

export function Header() {
const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  

  return (
    <div className="border-b bg-regalBlue">
      <div className="mx-auto max-lg:px-4 flex h-16 max-w-[1057px] justify-between items-center gap-6">
        <Link className="flex items-center font-sans text-2xl lg:text-32 font-bold text-white" to={`/`}>
          Bloom Store
        </Link>
        <div className="relative">
          <Badge
            count={cartCount}
            color="red"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <img src={CartIcon} alt="Cart" className="h-6 w-6" />
          </Badge>

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
