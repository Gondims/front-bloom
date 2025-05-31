import { useProducts } from "@/api/get-product";

export function ProductsList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className="gap-[61px] grid">
      {products?.map((product) => (
        <li key={product.id} className="py-[19px] pl-[14px] max-w-[1057px] h-[176px] drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)] bg-white">
          <div className="flex">
            <div className="min-w-[127px] max-w-[127px] h-[138px] flex justify-center">
              <img src={product.image}/>
            </div>
            <div>
              <h3>{product.title}</h3>
              <span>{product.category}</span>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
            <button>cart</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
