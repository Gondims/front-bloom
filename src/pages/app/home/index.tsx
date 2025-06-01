import { Helmet } from "react-helmet-async";
import { ProductsList } from "../../../components/productsList";
import { ViewControls } from "@/components/viewControls";

export function Home() {
  return (
    <>
      <Helmet title="home" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold ">Dashboard</h1>

        <div className="">
          <p className="">MEN'S CLOTHING</p>
        </div>

        <div className="pt-[86px]">
          <ViewControls />
          <ProductsList />
        </div>
      </div>
    </>
  );
}
