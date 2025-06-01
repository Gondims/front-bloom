// components/view-controls.tsx
import { useSearchParams } from "react-router-dom";

export function ViewControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Obter os parâmetros atuais ou usar valores padrão
  const perPage = searchParams.get("perPage") || "5";
  const viewMode = searchParams.get("viewMode") || "list";

  const handlePerPageChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("perPage", value);
      prev.set("page", "1"); // Resetar para a primeira página ao mudar itens por página
      return prev;
    });
  };

  const handleViewModeChange = (mode: "list" | "grid") => {
    setSearchParams((prev) => {
      prev.set("viewMode", mode);
      return prev;
    });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Itens por página:</span>
        <select
          value={perPage}
          onChange={(e) => handlePerPageChange(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleViewModeChange("list")}
          className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          aria-label="Visualização em lista"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button
          onClick={() => handleViewModeChange("grid")}
          className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          aria-label="Visualização em grade"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
      </div>
    </div>
  );
}