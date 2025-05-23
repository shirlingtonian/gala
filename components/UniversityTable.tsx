
import React from 'react';
import { University, SortConfig, SortableKey, ColumnDefinition } from '../types';
import { SortableHeader } from './SortableHeader';

interface UniversityTableProps {
  universities: University[];
  columns: ColumnDefinition[];
  sortConfig: SortConfig | null;
  onSort: (key: SortableKey) => void;
}

export const UniversityTable: React.FC<UniversityTableProps> = ({ universities, columns, sortConfig, onSort }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700/50 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <SortableHeader
                key={col.key}
                column={col}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700 bg-slate-800">
          {universities.map((uni, index) => (
            <tr key={uni.id} className={`hover:bg-slate-700/70 transition-colors duration-150 ${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}`}>
              {columns.map((col) => (
                <td 
                  key={`${uni.id}-${col.key}`} 
                  className={`px-4 py-3.5 text-sm whitespace-nowrap ${col.isNumeric ? 'text-right' : 'text-left'} ${col.key === 'name' ? 'font-medium text-sky-300' : 'text-slate-300'}`}
                >
                  {col.format ? col.format(uni[col.key], uni) : (uni[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {universities.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                No universities to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
