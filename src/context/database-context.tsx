'use client';

import { createContext, useContext } from 'react';
import { TMood, TRecord, TTag } from '@/types';

interface DatabaseContextType {
  moods: TMood[];
  tags: TTag[];
  records: TRecord[];
  fetchMoods: () => Promise<void>;
  fetchTags: () => Promise<void>;
  fetchRecords: () => Promise<void>;
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

// Custom hook for accessing the context
export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context)
    throw new Error('useDatabase must be used within a DatabaseProvider');
  return context;
};
