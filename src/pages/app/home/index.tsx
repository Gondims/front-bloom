
import { ProductsList } from "../../../components/productsList";
import { ViewControls } from "@/components/viewControls";

export function Home() {
  return (
    <>
     
      <div className="flex w-full flex-col">
        <ViewControls />

        <div className="">
          <p className="">MEN'S CLOTHING</p>
        </div>

        <div>
          <ProductsList />
        </div>
      </div>
    </>
  );
}
