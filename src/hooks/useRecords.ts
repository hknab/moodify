import { useDatabase } from '@/context/database-context';
import { record } from '@/lib/idb';
import { TRecord } from '@/types';

type TRecordWithoutId = Omit<TRecord, 'id'>;
export function useRecords() {
  const { records, fetchRecords } = useDatabase();

  const addRecord = async (newRecord: TRecordWithoutId) => {
    await record.add(newRecord);
    await fetchRecords();
  };

  const editRecord = async (id: string, updatedRecord: TRecordWithoutId) => {
    await record.edit(id, updatedRecord);
    await fetchRecords();
  };

  const deleteRecord = async (id: string) => {
    await record.delete(id);
    await fetchRecords();
  };

  return { records, addRecord, editRecord, deleteRecord };
}
