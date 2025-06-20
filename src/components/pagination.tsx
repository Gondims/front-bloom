interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1


  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page - 1)} 
              className={`h-8 w-8 rounded-xl border border-blueCart font-lato font-bold text-xs ${
                pageIndex === page - 1
                  ? 'bg-[#1F2445] text-white '
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

       
      </div>
    </div>
  )
}