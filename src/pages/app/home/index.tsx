import { Helmet } from 'react-helmet-async'
import { ProductsList } from '../../../components/productsList'

export function Home() {
  return (
    <>
      <Helmet title="home" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold ">Dashboard</h1>

        <div className="">
        AQUI
        </div>

        <div className="">
          <ProductsList />
        </div>
      </div>
    </>
  )
}