import { useCart } from "@/context/cartContext";
import { CartItem } from "@/types";
import { useState } from "react";

export function Cart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal } =
    useCart();

  const [editingQuantities, setEditingQuantities] = useState<
    Record<string, number>
  >({});

  const handleQuantityChange = (productId: number, value: string) => {
    const newValue = parseInt(value) || 0;
    setEditingQuantities((prev) => ({ ...prev, [productId]: newValue }));
  };

  const handleQuantityBlur = (productId: number) => {
    const currentItem = cartItems.find(
      (item: CartItem) => item.product.id === productId,
    );

    if (!currentItem) return;

    const newQuantity = editingQuantities[productId] ?? currentItem.quantity;

    if (newQuantity === 0) {
      removeFromCart(productId);
    } else if (newQuantity > 0) {
      updateCartItemQuantity(productId, newQuantity);
    }

    setEditingQuantities((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"} top-[64px]`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 h-[calc(100%-64px)] w-[409px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[calc(100%-64px)] overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => {
                const currentQuantity = editingQuantities[item.product.id] ?? item.quantity;
                return (
                  <li
                    key={item.product.id}
                    className="flex flex-col p-[6px] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    <div>
                      <div className="flex">
                        <div className="relative h-[108px] min-w-[101px] content-center justify-items-center rounded-[10px] border border-[#0B1A8E]">
                          {item.product?.hasDiscount && (
                            <span className="absolute -right-2 -top-2 flex h-6 w-7 items-center rounded-full bg-[#5062F0] text-center font-roboto text-[8px] font-bold leading-none text-white">
                              {item.product.discountPercentage}% OFF
                            </span>
                          )}

                          <img
                            className="h-[91px] w-[68px]"
                            src={item?.product?.image}
                            alt={item.product.title}
                          />
                        </div>
                        <div className="w-full pl-2">
                          <p className="line-clamp-3 font-lato text-base font-bold text-black">
                            {item.product.title}
                          </p>
                          <p
                            className={`text-end font-roboto text-base font-bold ${item.product?.hasDiscount ? "line-through" : ""}`}
                          >
                            {item.product?.hasDiscount ? "DE:" : "R$"}
                            <span className="font-normal">
                              {" "}
                              {item.product.price}
                            </span>
                          </p>
                          {item.product?.hasDiscount && (
                            <p className="text-end font-roboto text-base font-bold">
                              POR:{" "}
                              <span className="font-normal">
                                {item.product.discountedPrice?.toFixed(2)}
                              </span>
                            </p>
                          )}

                          <div className="flex items-end justify-end gap-1 font-roboto text-base font-bold">
                            <span className="justify-end leading-none">
                              QTDE:
                            </span>
                            <input
                              value={currentQuantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item?.product?.id,
                                  e.target.value,
                                )
                              }
                              onBlur={() => handleQuantityBlur(item.product.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleQuantityBlur(item.product.id);
                                }
                              }}
                              className="h-[25px] w-[45px] rounded-[10px] bg-[#D9D9D9] text-center"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                        <p className="font-roboto text-lg font-bold text-black">
                          Total
                          <span className="font-normal">
                            {" "}
                            R$ {
                            (item.product.price * item.quantity).toFixed(2)
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
          <div className="mb-4 flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
