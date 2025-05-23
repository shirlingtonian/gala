
import React, { useState, useMemo, useCallback } from 'react';
import { UniversityTable } from './components/UniversityTable';
import { University, SortConfig, SortOrder, SortableKey, ColumnDefinition } from './types';

const initialUniversities: University[] = [
  { id: 1, name: 'Princeton University', usNewsRank: 1, avgSAT: 1545, acceptanceRate: 4.0, studentFacultyRatio: 5, endowmentPerStudent: 3578, location: 'Princeton, NJ' },
  { id: 2, name: 'Massachusetts Institute of Technology (MIT)', usNewsRank: 2, avgSAT: 1555, acceptanceRate: 4.8, studentFacultyRatio: 3, endowmentPerStudent: 1870, location: 'Cambridge, MA' },
  { id: 3, name: 'Harvard University', usNewsRank: 3, avgSAT: 1550, acceptanceRate: 3.4, studentFacultyRatio: 5, endowmentPerStudent: 2275, location: 'Cambridge, MA' },
  { id: 4, name: 'Stanford University', usNewsRank: 3, avgSAT: 1545, acceptanceRate: 3.7, studentFacultyRatio: 5, endowmentPerStudent: 2150, location: 'Stanford, CA' },
  { id: 5, name: 'Yale University', usNewsRank: 5, avgSAT: 1540, acceptanceRate: 5.3, studentFacultyRatio: 4, endowmentPerStudent: 2682, location: 'New Haven, CT' },
  { id: 6, name: 'University of Pennsylvania', usNewsRank: 6, avgSAT: 1535, acceptanceRate: 6.5, studentFacultyRatio: 4, endowmentPerStudent: 813, location: 'Philadelphia, PA' },
  { id: 7, name: 'California Institute of Technology (Caltech)', usNewsRank: 7, avgSAT: 1570, acceptanceRate: 3.9, studentFacultyRatio: 3, endowmentPerStudent: 1620, location: 'Pasadena, CA' },
  { id: 8, name: 'Duke University', usNewsRank: 7, avgSAT: 1525, acceptanceRate: 6.3, studentFacultyRatio: 5, endowmentPerStudent: 670, location: 'Durham, NC' },
  { id: 9, name: 'Johns Hopkins University', usNewsRank: 9, avgSAT: 1530, acceptanceRate: 7.5, studentFacultyRatio: 4, endowmentPerStudent: 375, location: 'Baltimore, MD' },
  { id: 10, name: 'Northwestern University', usNewsRank: 9, avgSAT: 1520, acceptanceRate: 7.5, studentFacultyRatio: 4, endowmentPerStudent: 590, location: 'Evanston, IL' },
  { id: 11, name: 'Columbia University', usNewsRank: 12, avgSAT: 1535, acceptanceRate: 4.1, studentFacultyRatio: 6, endowmentPerStudent: 850, location: 'New York, NY' },
  { id: 12, name: 'Cornell University', usNewsRank: 12, avgSAT: 1505, acceptanceRate: 8.0, studentFacultyRatio: 9, endowmentPerStudent: 380, location: 'Ithaca, NY' },
  { id: 13, name: 'University of Chicago', usNewsRank: 12, avgSAT: 1545, acceptanceRate: 5.4, studentFacultyRatio: 5, endowmentPerStudent: 580, location: 'Chicago, IL' },
  { id: 14, name: 'University of California, Berkeley (UCB)', usNewsRank: 15, avgSAT: 1480, acceptanceRate: 11.6, studentFacultyRatio: 19, endowmentPerStudent: 130, location: 'Berkeley, CA' },
  { id: 15, name: 'University of California, Los Angeles (UCLA)', usNewsRank: 15, avgSAT: 1470, acceptanceRate: 9.9, studentFacultyRatio: 18, endowmentPerStudent: 115, location: 'Los Angeles, CA' },
  { id: 16, name: 'University of Michigan - Ann Arbor', usNewsRank: 21, avgSAT: 1465, acceptanceRate: 17.7, studentFacultyRatio: 10, endowmentPerStudent: 280, location: 'Ann Arbor, MI' },
  { id: 17, name: 'New York University (NYU)', usNewsRank: 35, avgSAT: 1495, acceptanceRate: 12.5, studentFacultyRatio: 8, endowmentPerStudent: 100, location: 'New York, NY'},
  { id: 18, name: 'University of Southern California (USC)', usNewsRank: 28, avgSAT: 1485, acceptanceRate: 12.0, studentFacultyRatio: 9, endowmentPerStudent: 160, location: 'Los Angeles, CA'},
];

const columns: ColumnDefinition[] = [
  { key: 'name', label: 'University Name', description: 'Name of the institution.' },
  { key: 'usNewsRank', label: 'Rank', isNumeric: true, description: 'Overall US News & World Report ranking.' },
  { key: 'location', label: 'Location', description: 'City and state of the main campus.' },
  { key: 'avgSAT', label: 'Avg SAT', isNumeric: true, description: 'Average SAT score of admitted students.' },
  { key: 'acceptanceRate', label: 'Accept %', isNumeric: true, format: (val: number) => `${val.toFixed(1)}%`, description: 'Percentage of applicants admitted.' },
  { key: 'studentFacultyRatio', label: 'S/F Ratio', isNumeric: true, format: (val: number) => `${val}:1`, description: 'Ratio of students to faculty members.' },
  { key: 'endowmentPerStudent', label: 'Endow./Std (K$)', isNumeric: true, format: (val: number) => `$${val.toLocaleString()}K`, description: 'Endowment per student in thousands of USD.' },
];

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'usNewsRank', order: SortOrder.ASC });

  const handleSort = useCallback((key: SortableKey) => {
    setSortConfig(prevSortConfig => {
      let order = SortOrder.ASC;
      if (prevSortConfig && prevSortConfig.key === key && prevSortConfig.order === SortOrder.ASC) {
        order = SortOrder.DESC;
      }
      return { key, order };
    });
  }, []);

  const sortedUniversities = useMemo(() => {
    if (!sortConfig) return universities;

    const { key, order } = sortConfig;
    
    return [...universities].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      let comparison = 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        comparison = valA.localeCompare(valB);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      }
      // For other types, or if one is null/undefined, they are treated as equal or handled as needed
      // For simplicity, this example assumes data is clean and types match.

      return order === SortOrder.ASC ? comparison : -comparison;
    });
  }, [universities, sortConfig]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600">
          US University Rankings Explorer
        </h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl">
          Explore and sort data for top American universities. Click on column headers to sort.
        </p>
      </header>
      
      <main className="w-full max-w-7xl bg-slate-800 shadow-2xl rounded-xl overflow-hidden">
        <UniversityTable 
          universities={sortedUniversities}
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </main>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} University Rankings Explorer. Data is illustrative.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
