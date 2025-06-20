import { QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import "./global.css";

import { ThemeProvider } from "./components/theme-provider";
import { router } from "./routes";
import { queryClient } from "./lib/react-query";
import { CartProvider } from "./context/cartContext";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="-theme">
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
