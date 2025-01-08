import { useDatabase } from '@/context/database-context';
import { record, TRecordInput } from '@/lib/idb';

export function useRecords() {
  const { records, fetchRecords, isLoadingRecords } = useDatabase();

  const addRecord = async (newRecord: TRecordInput) => {
    await record.add({ ...newRecord });
    await fetchRecords();
  };

  const editRecord = async (id: number, updatedRecord: TRecordInput) => {
    await record.edit(id, updatedRecord);
    await fetchRecords();
  };

  const deleteRecord = async (id: number) => {
    await record.delete(id);
    await fetchRecords();
  };

  return { records, addRecord, editRecord, deleteRecord, isLoadingRecords };
}
