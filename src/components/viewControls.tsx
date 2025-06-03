// components/view-controls.tsx
import { useSearchParams } from "react-router-dom";

export function ViewControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get("perPage") || "5";
  const viewMode = searchParams.get("viewMode") || "list";

  const handlePerPageChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("perPage", value);
      prev.set("page", "1");
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
    <div className="flex lg:h-12 h-8 bg-[#F2F3F8]">
      <div className="lg:gap-[43px] gap-2 flex mx-auto w-full pr-[31px] lg:pr-0 lg:w-[1057px] justify-end">
        <div className="flex items-center">
          <span className="font-lato text-xs font-normal text-black">
            Exibir
          </span>
          <select
            value={perPage}
            onChange={(e) => handlePerPageChange(e.target.value)}
            className="bg-transparent font-lato text-xs font-normal text-black"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <span className="font-lato text-xs  font-normal text-black hidden lg:block">
            por vez
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleViewModeChange("list")}
            aria-label="Visualização em lista"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
            >
              <rect
                width="20"
                height="4"
                fill={` ${viewMode === "list" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                y="5"
                width="20"
                height="4"
                fill={` ${viewMode === "list" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                y="10"
                width="20"
                height="4"
                fill={` ${viewMode === "list" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                y="15"
                width="20"
                height="4"
                fill={` ${viewMode === "list" ? "#5062F0" : "#D0D3E2"}`}
              />
            </svg>
          </button>
          <button
            onClick={() => handleViewModeChange("grid")}
            aria-label="Visualização em grade"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <rect
                width="9"
                height="9"
                fill={` ${viewMode === "grid" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                y="10"
                width="9"
                height="9"
                fill={` ${viewMode === "grid" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                x="10"
                y="10"
                width="9"
                height="9"
                fill={` ${viewMode === "grid" ? "#5062F0" : "#D0D3E2"}`}
              />
              <rect
                x="10"
                width="9"
                height="9"
                fill={` ${viewMode === "grid" ? "#5062F0" : "#D0D3E2"}`}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
