
import React from 'react';
import { SortConfig, SortOrder, SortableKey, ColumnDefinition } from '../types';

interface SortableHeaderProps {
  column: ColumnDefinition;
  sortConfig: SortConfig | null;
  onSort: (key: SortableKey) => void;
}

const UpArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 14l5-5 5 5H7z"/>
  </svg>
);

const DownArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 10l5 5 5-5H7z"/>
  </svg>
);

export const SortableHeader: React.FC<SortableHeaderProps> = ({ column, sortConfig, onSort }) => {
  const isSorted = sortConfig?.key === column.key;
  const sortIconClass = "w-4 h-4 inline-block ml-2 transition-opacity duration-150";
  
  return (
    <th 
      scope="col"
      className={`px-4 py-3.5 text-left text-sm font-semibold text-gray-200 hover:bg-slate-700 cursor-pointer transition-colors duration-150 group ${column.isNumeric ? 'text-right' : 'text-left'}`}
      onClick={() => onSort(column.key)}
      title={column.description ? `${column.description} (Click to sort)` : `Sort by ${column.label}`}
      aria-sort={isSorted ? (sortConfig?.order === SortOrder.ASC ? 'ascending' : 'descending') : 'none'}
    >
      <div className={`flex items-center ${column.isNumeric ? 'justify-end' : 'justify-start'}`}>
        <span>{column.label}</span>
        {isSorted ? (
          sortConfig?.order === SortOrder.ASC ? <UpArrowIcon className={`${sortIconClass} text-cyan-400`} /> : <DownArrowIcon className={`${sortIconClass} text-cyan-400`} />
        ) : (
          <UpArrowIcon className={`${sortIconClass} text-slate-600 opacity-0 group-hover:opacity-100`} />
        )}
      </div>
    </th>
  );
};
