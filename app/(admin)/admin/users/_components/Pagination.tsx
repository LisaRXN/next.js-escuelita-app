"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between w-full py-4 text-white">
      <p className="text-sm text-mylightgray">
        {total} voluntario{total !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 rounded-lg border border-white disabled:opacity-30 hover:bg-white/10 transition"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <span className="text-sm">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 rounded-lg border border-white disabled:opacity-30 hover:bg-white/10 transition"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
