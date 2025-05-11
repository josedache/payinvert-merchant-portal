import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  TableOptions,
  getExpandedRowModel,
} from "@tanstack/react-table";

/**
 *
 * @param {import("@tanstack/react-table").TableOptions<any>} options
 * @returns
 */
function useTable(options: Partial<TableOptions<any>>) {
  return useReactTable({
    ...options,
    getCoreRowModel: options?.getCoreRowModel ?? getCoreRowModel(),
    getPaginationRowModel:
      options?.getPaginationRowModel ?? getPaginationRowModel(),
    getExpandedRowModel: options?.getExpandedRowModel ?? getExpandedRowModel(),
    debugTable: options?.debugTable ?? true,
    columns: options?.columns ?? columns,
    data: options.data ?? data,
    defaultColumn: {
      // cell: (info) => createElement('p', {}, info.getValue()),
      ...options?.defaultColumn,
    },
  });
}

export default useTable;

const data = [] as any[];

const columns = [{}] as any[];
