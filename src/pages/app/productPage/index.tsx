// ProductPage.tsx
import { useParams } from "react-router-dom";
import { useProduct } from "@/api/get-product";
import { useCart } from "@/context/cartContext";
import CartIcon from "@/assets/cart.svg";
import { isMobile } from "react-device-detect";
import { applyProductDiscounts } from "@/utils/product";

export function ProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useProduct(Number(productId));
  const { addToCart } = useCart();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const productWithDiscount = applyProductDiscounts(product);

  const handleAddToCartClick = () => {
    addToCart(productWithDiscount);
  };

  console.log(isMobile, "isMobile");

  return (
    <>
      <div className="flex w-full flex-col ">
        <div className="max-lg:pl-4 flex h-12 bg-[#F2F3F8] text-[13px] font-bold lg:text-2xl">
          <div className="mx-auto flex w-[1057px]">
            <h3 className="flex max-w-[575px] items-center truncate">
              {productWithDiscount.title}
            </h3>
          </div>
        </div>
        <div className="lg:mx-auto mx-4 lg:mt-9 mt-5 flex max-w-[1057px] gap-8">
          {isMobile ? (
            <div>
              <div className="flex justify-between gap-6 items-center">
                <div className="flex h-[43vw] w-[34vw] items-center justify-center rounded-[20px] border border-[#0B1A8E]">
                  <img
                    src={productWithDiscount.image}
                    alt={productWithDiscount.title}
                    className="h-[14vh] w-[28vw]"
                  />
                </div>
                <div>
                  <div className="relative flex h-[127px] w-[49vw] flex-col justify-end  rounded-[20px] px-[22px] pb-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
                    {productWithDiscount?.hasDiscount && (
                      <span className="absolute  -right-2 -top-2 flex h-[46px] w-[55px] items-center rounded-full bg-[#5062F0] text-center font-roboto text-[15px] font-bold leading-none text-white">
                        {productWithDiscount.discountPercentage}% OFF
                      </span>
                    )}

                    <p
                      className={`mt-0 flex font-roboto font-normal ${productWithDiscount.hasDiscount ? "text-xl text-black line-through " : "flex-col text-8xl"}`}
                    >
                      {productWithDiscount.hasDiscount ? (
                        <span className="font-bold">DE:</span>
                      ) : (
                        <span className="text-2xl">R$</span>
                      )}
                      {productWithDiscount.price}
                    </p>
                    {productWithDiscount.hasDiscount && (
                      <p className="m-0  mt-0 flex text-2xl font-normal text-black lg:text-5xl">
                        <span className="font-bold">POR:</span>{" "}
                        {productWithDiscount.discountedPrice}
                      </p>
                    )}
                    <button
                      onClick={handleAddToCartClick}
                      className="m-0 flex items-center justify-center gap-2 rounded-[10px] bg-[#0B1A8E] px-10 py-2 font-roboto text-[15px] font-bold text-white"
                    >
                      <img src={CartIcon} alt="Cart" className="h-5 w-5" />
                      COMPRAR
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-lato text-[24px] font-bold text-black ">
                    SKU {productWithDiscount.id}
                  </h3>
                  {/* Avaliação */}
                  <div className="flex flex-col ">
                    <span className="mr-2 text-yellow-500">
                      {"★".repeat(Math.round(product?.rating.rate))}
                      {"☆".repeat(5 - Math.round(product?.rating.rate))}
                    </span>
                    <span className="text-sm text-gray-600 ">
                      ({product?.rating.count} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-0 lg:mt-[42px]  ">
                  <p className="font-lato text-[24px] font-bold text-[#090909]">
                    CATEGORIA
                  </p>
                  <span className="font-lato text-xl font-normal uppercase text-[#090909]">
                    {productWithDiscount.category}
                  </span>
                </div>
              </div>
              <div className="">
                <p className="font-lato text-[24px] font-bold">Descrição</p>
                <p className="w-full min-h-[162px] rounded-[20px] bg-[#D9D9D9] px-4 py-[14px] font-lato text-xs font-bold text-black">
                  {productWithDiscount.description}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex h-[44vw] min-w-[35vw] items-center justify-center rounded-[20px] border border-[#0B1A8E] lg:min-h-[451px] lg:min-w-[385px]">
                <img
                  src={productWithDiscount.image}
                  alt={productWithDiscount.title}
                  className="h-[14vh] w-[28vw] lg:h-[406px] lg:w-[284px]"
                />
              </div>
              <div className="flex flex-col justify-between ">
                <div className="flex justify-between">
                  <div className="">
                    <h3 className="font-lato text-[32px] font-bold text-black ">
                      SKU {productWithDiscount.id}
                    </h3>
                    {/* Avaliação */}
                    <div className="flex flex-col ">
                      <span className="mr-2 text-yellow-500">
                        {"★".repeat(Math.round(product?.rating.rate))}
                        {"☆".repeat(5 - Math.round(product?.rating.rate))}
                      </span>
                      <span className="text-sm text-gray-600 ">
                        ({product?.rating.count} reviews)
                      </span>
                    </div>
                    <div className="mt-0 lg:mt-[42px]  ">
                      <p className="font-lato text-[32px] font-bold text-[#090909]">
                        CATEGORIA
                      </p>
                      <span className="font-lato text-2xl font-normal uppercase text-[#090909]">
                        {productWithDiscount.category}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="relative flex h-[233px] max-w-[312px] flex-1 flex-col justify-end space-y-4 rounded-[20px] px-10 pb-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
                      {productWithDiscount?.hasDiscount && (
                        <span className="absolute  -right-2 -top-2 flex h-[76px] w-[91px] items-center rounded-full bg-[#5062F0] text-center font-roboto text-[24px] font-bold leading-none text-white">
                          {productWithDiscount.discountPercentage}% OFF
                        </span>
                      )}

                      <p
                        className={`flex font-roboto font-normal ${productWithDiscount.hasDiscount ? "text-4xl text-black line-through " : "flex-col text-8xl"}`}
                      >
                        {productWithDiscount.hasDiscount ? (
                          <span className="font-bold">DE:</span>
                        ) : (
                          <span className="text-2xl">R$</span>
                        )}
                        {productWithDiscount.price}
                      </p>
                      {productWithDiscount.hasDiscount && (
                        <p className="m-0 flex text-5xl font-normal text-black">
                          <span className="font-bold">POR:</span>{" "}
                          {productWithDiscount.discountedPrice}
                        </p>
                      )}
                      <button
                        onClick={handleAddToCartClick}
                        className="m-0 flex items-center justify-center gap-2 rounded-[10px] bg-[#0B1A8E] px-10 py-[13px] font-roboto text-2xl font-bold text-white"
                      >
                        <img src={CartIcon} alt="Cart" className="h-5 w-5" />
                        COMPRAR
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="font-lato text-[32px] font-bold">Descrição</p>
                  <p className="w-[657px] rounded-[20px] bg-[#D9D9D9] px-4 py-[14px] font-lato text-xs font-bold text-black">
                    {productWithDiscount.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
