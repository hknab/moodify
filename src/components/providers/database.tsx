'use client';
import { TMood, TRecord, TTag } from '@/types';
import { useEffect, useState } from 'react';
import { mood, record, tag } from '@/lib/idb';
import { DatabaseContext } from '@/context/database-context';

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<TMood[]>([]);
  const [tags, setTags] = useState<TTag[]>([]);
  const [records, setRecords] = useState<TRecord[]>([]);

  // Fetch moods
  const fetchMoods = async () => {
    const allMoods = await mood.get();
    setMoods(allMoods);
  };

  // Fetch tags
  const fetchTags = async () => {
    const allTags = await tag.get();
    setTags(allTags);
  };

  // Fetch records
  const fetchRecords = async () => {
    const allRecords = await record.get();
    setRecords(allRecords);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchMoods();
    fetchTags();
    fetchRecords();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{ moods, tags, records, fetchMoods, fetchTags, fetchRecords }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
