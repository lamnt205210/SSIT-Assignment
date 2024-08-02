/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";

interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
}

interface DataGridProps<T> {
  columns: Column[];
  rows: T[];
}

const DataTable = <T,>({ columns, rows }: DataGridProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedRows = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...rows].sort((a: any, b: any) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return rows;
  }, [rows, sortConfig]);

  const requestSort = (field: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.field === field &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-400 border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.field)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                onClick={() => column.sortable && requestSort(column.field)}
              >
                {column.headerName}
                {sortConfig?.field === column.field
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={String(column.field)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.field === "thumbnail" ? (
                    <img
                      src={
                        // @ts-ignore
                        row[column.field]
                      }
                      alt="Thumbnail"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    // @ts-ignore
                    row[column.field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
