import { useQuery } from '@tanstack/react-query';

// Tipagem para o produto (baseado na API fake store)
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Função base para fetch
const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Rotas da API
const API_ROUTES = {
  products: {
    getAll: () => 'https://fakestoreapi.com/products',
    getById: (id: number) => `https://fakestoreapi.com/products/${id}`,
    // Você pode adicionar mais rotas conforme necessário
  },
  // Adicione outros endpoints aqui
};

// Hooks para React Query
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => fetchApi<Product[]>(API_ROUTES.products.getAll()),
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