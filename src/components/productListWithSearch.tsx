import { useAllProducts } from "@/api/get-product";
import { useState } from "react";
import SearchBar from "./searchBar";
import React from "react";
export const ProductListWithSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  const { data: allProducts, isLoading, error } = useAllProducts();

  // Filtra os produtos localmente
  const filteredProducts = React.useMemo(() => {
    if (!allProducts) return [];
    
    
    if (searchTerm.length < 2) return [];
   
    
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);


  const startIndex = pageIndex * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);


  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      Erro ao carregar produtos
    </div>
  );

  return (
    <div className="">

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setPageIndex(0); // Resetar paginação ao pesquisar
        }} 
      />
      

      {/* Lista de resultados */}
      {searchTerm.length >= 2 && (
        <>
          <ul className="divide-y divide-gray-200 fixed bg-white z-10 p-4 rounded-xl">
            {paginatedProducts.map(product => (
              <li key={product.id} className="py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">{product.title}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ${product?.discountedPrice?.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
        </>
      )}
      

    </div>
  );
};

export default ProductListWithSearch;
