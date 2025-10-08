import { useCallback,useMemo,useState } from "react";
import type { DataTableProps } from '../../types';
import type{ ReactNode } from "react";
import {
  LoaderIcon,
  SortIcon,
  SortAscIcon,
  SortDescIcon,
  Checkbox,
} from '../utils/Icons';

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyStateText = 'No data available.',
  rowKey = 'id' as keyof T,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<any>>(new Set());

  // Sorting logic
  const sortData = useCallback((a: T, b: T) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  }, [sortConfig]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const sortableData = [...data];
    return sortableData.sort(sortData);
  }, [data, sortData, sortConfig]);

  // Handle column header click for sorting
  const handleSort = useCallback((key: keyof T, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  // Handle row selection
  const handleRowToggle = useCallback((key: any) => {
    setSelectedKeys(prev => {
      const newKeys = new Set(prev);
      if (newKeys.has(key)) {
        newKeys.delete(key);
      } else {
        newKeys.add(key);
      }
      
      if (onRowSelect) {
        const newSelectedRows = data.filter(row => newKeys.has(row[rowKey]));
        onRowSelect(newSelectedRows);
      }
      return newKeys;
    });
  }, [onRowSelect, data, rowKey]);

  // Handle Select All/Deselect All
  const handleSelectAll = useCallback((checked: boolean) => {
    const allKeys = new Set(data.map(row => row[rowKey]));
    const newKeys = checked ? allKeys : new Set();
    setSelectedKeys(newKeys);

    if (onRowSelect) {
      const newSelectedRows = checked ? [...data] : [];
      onRowSelect(newSelectedRows);
    }
  }, [data, onRowSelect, rowKey]);

  // Derived selection state (for indeterminate styling)
  const isAllSelected = selectedKeys.size > 0 && selectedKeys.size === data.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 h-64">
        <LoaderIcon className="w-8 h-8 text-indigo-500 mr-2" />
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading Data...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 h-40">
        <p className="text-gray-500 dark:text-gray-400">{emptyStateText}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" role="table">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr role="row">
            {/* Selection Column Header */}
            {selectable && (
              <th scope="col" className="p-4 w-12 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <Checkbox
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {/* Data Column Headers */}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition' : ''}`}
                onClick={() => handleSort(column.dataIndex, column.sortable)}
                aria-sort={column.dataIndex === sortConfig?.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                role="columnheader"
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && (
                    <span className="ml-1 text-gray-400">
                      {column.dataIndex === sortConfig?.key ? (
                        sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                      ) : (
                        <SortIcon className="opacity-50" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row) => {
            const rowKeyValue = row[rowKey];
            const isSelected = selectedKeys.has(rowKeyValue);

            return (
              <tr
                key={rowKeyValue}
                className={`transition duration-150 ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                role="row"
              >
                {/* Selection Column Cell */}
                {selectable && (
                  <td className="p-4 w-12 whitespace-nowrap" role="cell">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleRowToggle(rowKeyValue)}
                      aria-checked={isSelected}
                    />
                  </td>
                )}
                {/* Data Columns Cells */}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                    role="cell"
                  >
                    {column.render ? column.render(row[column.dataIndex], row) : (row[column.dataIndex] as ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
