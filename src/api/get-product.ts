import { applyProductDiscounts } from '@/utils/product';
import { useQuery } from '@tanstack/react-query';

// Tipagem para o produto (baseado na API fake store)
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  discountedPrice?: number; 
  discountPercentage?: number
  hasDiscount?: boolean
  rating: {
    rate: number;
    count: number;
  };
}
interface UseProductsParams {
  pageIndex?: number;
  pageSize?: number;
  category?: string;
      searchTerm?: string;
}

interface ProductsResponse {
  products: Product[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;

}


// Função base para fetch
const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


const API_ROUTES = {
  products: {
    getAll: () => 'https://fakestoreapi.com/products',
    getById: (id: number) => `https://fakestoreapi.com/products/${id}`,
  },
};

export const useAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Network response was not ok');
      const products = await response.json();
      return products.map(applyProductDiscounts);
    },
  });
};


export const useProducts = ({
  pageIndex = 0,
  pageSize = 5,
  category,
   searchTerm = '',
}: UseProductsParams) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', pageIndex, pageSize, category, searchTerm],
    queryFn: async () => {
      const baseUrl = 'https://fakestoreapi.com/products';
      const params = new URLSearchParams();

      if (category) params.append('category', category);
    

      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error('Network response was not ok');
  

      let allProducts = await response.json();

            if (searchTerm) {
        allProducts = allProducts.filter((product: { title: string; }) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const startIndex = pageIndex * pageSize;
      const productsWithDiscount = allProducts.map(applyProductDiscounts);
      
      const paginatedProducts = productsWithDiscount.slice(startIndex, startIndex + pageSize);

      return {
        products: paginatedProducts,
        totalCount: allProducts.length,
        pageIndex,
        pageSize,
      };
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchApi<Product>(API_ROUTES.products.getById(id)),
  });
};

// Você pode exportar as funções diretamente se precisar usar sem React Query
export const api = {
  products: {
    getAll: () => fetchApi<Product[]>(API_ROUTES.products.getAll()),
    getById: (id: number) => fetchApi<Product>(API_ROUTES.products.getById(id)),
  },
};

