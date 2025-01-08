'use client';
import { DatabaseContext } from '@/context/database-context';
import { mood, record, tag } from '@/lib/idb';
import { TMood, TRecord, TTag } from '@/types';
import { useEffect, useState } from 'react';

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<TMood[]>([]);
  const [tags, setTags] = useState<TTag[]>([]);
  const [records, setRecords] = useState<TRecord[]>([]);
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);

  // Fetch moods
  const fetchMoods = async () => {
    setIsLoadingMoods(true);
    try {
      const allMoods = await mood.get();
      setMoods(allMoods);
    } finally {
      setIsLoadingMoods(false);
    }
  };

  // Fetch tags
  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const allTags = await tag.get();
      setTags(allTags);
    } finally {
      setIsLoadingTags(false);
    }
  };

  // Fetch records
  const fetchRecords = async () => {
    setIsLoadingRecords(true);
    try {
      const allRecords = await record.get();
      setRecords(allRecords);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchMoods();
    fetchTags();
    fetchRecords();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        moods,
        tags,
        records,
        isLoadingMoods,
        isLoadingTags,
        isLoadingRecords,
        fetchMoods,
        fetchTags,
        fetchRecords,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
