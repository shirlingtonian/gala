
export interface University {
  id: number;
  name: string;
  usNewsRank: number;
  avgSAT: number;
  acceptanceRate: number; // Percentage e.g. 5 for 5%
  studentFacultyRatio: number; // e.g. 6 for 6:1
  endowmentPerStudent: number; // In thousands of USD
  location: string;
}

export type SortableKey = keyof University;

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortConfig {
  key: SortableKey;
  order: SortOrder;
}

export interface ColumnDefinition {
  key: SortableKey;
  label: string;
  isNumeric?: boolean;
  description?: string; // Optional: for tooltips on headers
  format?: (value: any, university?: University) => string | React.ReactNode;
}
