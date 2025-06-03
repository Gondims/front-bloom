import { createBrowserRouter } from 'react-router-dom'


import { NotFound } from './pages/404'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/app/home'
import { ProductPage } from './pages/app/productPage'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:productId',
        element: <ProductPage />,
      }
    ],
  },
])