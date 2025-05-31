import { QueryClient } from "@tanstack/react-query";

// Configuração básica do QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Tentará 2 vezes antes de falhar
      refetchOnWindowFocus: false, // Não recarrega quando a janela ganha foco
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});