import './index.css'

// import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'


import { ThemeProvider } from './components/theme-provider'
import { router } from './routes'
// import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <ThemeProvider defaultTheme="light" storageKey="ifood-theme">
        {/* <QueryClientProvider client={queryClient}> */}
          <RouterProvider router={router} />
        {/* </QueryClientProvider> */}
      </ThemeProvider>
    </HelmetProvider>
  )
}