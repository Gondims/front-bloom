import { useProducts } from "@/api/get-product";
import { Link, useSearchParams } from "react-router-dom";
import CartIcon from "@/assets/cart.svg";
import { Pagination } from "./pagination";
import { z } from "zod";
import { Product } from "@/types";
import { useCart } from "@/context/cartContext";
import { formatPrice } from "@/utils/format";

export function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const perPage = z.coerce.number().parse(searchParams.get("perPage") ?? "5");

  const viewMode = searchParams.get("viewMode") || "list";

  const { data, isLoading, error } = useProducts({
    pageIndex,
    pageSize: perPage,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
  };

  // Estilo para grid
  if (viewMode === "grid") {
    return (
      <div className="mx-auto px-[22px] pt-[33px] lg:w-[1280px]">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {data?.products?.map((product) => (
            <li
              key={product.id}
              className="flex flex-col bg-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)] lg:h-[300px]"
            >
              <Link
                to={`/product/${product.id}`}
                className="flex h-full p-2 max-lg:gap-[11px] lg:p-4"
              >
                <div className="flex justify-center lg:mb-2">
                  <div className="flex h-[108px] w-[6vw] min-w-[48px]  justify-center self-center lg:h-[138px] lg:min-w-[127px] lg:max-w-[127px]">
                    <img src={product.image} className="object-contain" />
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col justify-between">
                  <div>
                    <h3 className=" line-clamp-3 font-lato text-[10px] font-bold text-black lg:text-[16px]">
                      {product.title}
                    </h3>
                    <span className="mt-[7px] font-lato text-[8px] font-bold max-lg:flex uppercase text-grayBloom lg:text-xs">
                      {product.category}
                    </span>
                  </div>

                  <p className="flex items-end justify-between font-lato text-[14px] font-normal text-black lg:justify-end lg:text-40">
                    <span className="font-bold">R$ </span>
                    {formatPrice(product?.discountedPrice)
                      .replace("R$", "")
                      .trim()}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col">
                <p className="mb-1 line-clamp-3 text-[8px] font-bold text-[#434141] max-lg:p-2 lg:ml-[14px] lg:line-clamp-4 lg:text-xs">
                  {product.description}
                </p>
                <button
                  className=" flex justify-center bg-blueCart py-2"
                  onClick={() => handleAddToCartClick(product)}
                >
                  <img src={CartIcon} alt="Carrinho" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {data && (
          <div className="mt-8">
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={pageIndex}
              totalCount={data.totalCount}
              perPage={data.pageSize}
            />
          </div>
        )}
      </div>
    );
  }

  // Estilo padrão (lista)
  return (
    <div className="mx-auto px-4 pt-[31px] lg:w-[1057px] lg:px-0 lg:pt-[86px]">
      <ul className="mb-[61px] grid gap-[61px]">
        {data?.products?.map((product) => (
          <li
            key={product.id}
            className="h-[176px] w-full bg-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]"
          >
            <div className="flex h-full justify-between">
              <Link to={`/product/${product.id}`} className="w-full">
                <div className="flex h-full gap-2 pl-[19px] lg:py-[19px] lg:pl-[14px]">
                  <div className="flex w-[16vw] min-w-[16vw] justify-center self-center lg:h-[138px] lg:min-w-[127px] lg:max-w-[127px]">
                    <img src={product.image} />
                  </div>
                  <div className="content-center max-lg:flex max-lg:h-full max-lg:flex-col max-lg:justify-around max-lg:py-[19px]">
                    <h3 className="line-clamp-3 text-[14px] font-bold text-black lg:text-base ">
                      {product.title}
                    </h3>
                    <span className="font-lato text-xs font-bold uppercase text-grayBloom">
                      {product.category}
                    </span>
                    <p className="font-lato text-[32px] font-normal leading-none text-black max-lg:flex max-lg:justify-between max-lg:pr-[14px] lg:text-40">
                      <span className="font-bold">R$ </span>
                      {formatPrice(product?.discountedPrice)
                        .replace("R$", "")
                        .trim()}
                    </p>
                    <p className="line-clamp-2 h-[28px] max-w-[600px] overflow-hidden text-ellipsis font-lato text-xs font-bold text-grayBloom400 lg:line-clamp-4">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="min-w-[49px] justify-items-center bg-blueCart"
                onClick={() => handleAddToCartClick(product)}
              >
                <img src={CartIcon} alt="Carrinho" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {data && (
        <div className="mt-8">
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            totalCount={data.totalCount}
            perPage={data.pageSize}
          />
        </div>
      )}
    </div>
  );
}
