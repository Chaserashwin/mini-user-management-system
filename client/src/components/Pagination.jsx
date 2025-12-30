import React from "react";
export default function Pagination({ page, setPage }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-medium">Page {page}</span>

      <button
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
}
