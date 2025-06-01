import { useProducts } from "@/api/get-product";
import { useSearchParams } from "react-router-dom";
import CartIcon from "@/assets/cart.svg";
import { Pagination } from "./pagination";
import { z } from "zod";

export function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  // Estilo para grid
  if (viewMode === "grid") {
    return (
      <>
        <ul className="grid grid-cols-3 gap-6">
          {data?.products?.map((product) => (
            <li
              key={product.id}
              className="flex h-[300px] flex-col bg-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]"
            >
              <div className="flex p-4 h-full">
                <div className="mb-2 flex justify-center">
                  <div className="flex h-[138px] min-w-[127px] max-w-[127px] justify-center self-center">
                    <img src={product.image} />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <h3 className="font-bold text-black max-h-[57px] line-clamp-3 text-[16px]">
                    {product.title}
                  </h3>
                  <span className="mt-[7px] font-lato text-xs font-bold uppercase text-grayBloom">
                    {product.category}
                  </span>
                  <p className="h-full font-lato text-40 font-normal text-black flex items-end justify-end">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mb-1 ml-[14px] line-clamp-4 font-bold text-xs text-[#434141]">
                  {product.description}
                </p>
                <button className=" flex justify-center bg-blueCart py-2">
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
      </>
    );
  }

  // Estilo padrão (lista)
  return (
    <>
      <ul className="grid gap-[61px]">
        {data?.products?.map((product) => (
          <li
            key={product.id}
            className="h-[176px] w-full bg-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]"
          >
            <div className="flex h-full justify-between">
              <div className="flex gap-2 py-[19px] pl-[14px]">
                <div className="flex h-[138px] min-w-[127px] max-w-[127px] justify-center self-center">
                  <img src={product.image} />
                </div>
                <div className="content-center">
                  <h3 className="text-base font-bold text-black">
                    {product.title}
                  </h3>
                  <span className="font-lato text-xs font-bold uppercase text-grayBloom">
                    {product.category}
                  </span>
                  <p className="font-lato text-40 font-normal text-black">
                    {product.price}
                  </p>
                  <p className="h-[28px] max-w-[600px] overflow-hidden text-ellipsis font-lato text-xs font-bold text-grayBloom400">
                    {product.description}
                  </p>
                </div>
              </div>

              <button className="min-w-[49px] justify-items-center bg-blueCart">
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
    </>
  );
}
