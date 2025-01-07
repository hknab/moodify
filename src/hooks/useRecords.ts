import { useDatabase } from '@/context/database-context';
import { record, TRecordInput } from '@/lib/idb';

export function useRecords() {
  const { records, fetchRecords } = useDatabase();

  const addRecord = async (newRecord: TRecordInput) => {
    console.log('add record called');
    await record.add({ ...newRecord });
    await fetchRecords();
  };

  const editRecord = async (id: string, updatedRecord: TRecordInput) => {
    await record.edit(id, updatedRecord);
    await fetchRecords();
  };

  const deleteRecord = async (id: string) => {
    await record.delete(id);
    await fetchRecords();
  };

  return { records, addRecord, editRecord, deleteRecord };
}
