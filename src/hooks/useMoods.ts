import { useDatabase } from '@/context/database-context';
import { mood } from '@/lib/idb';
import { TMood } from '@/types';

type TMoodWithoutId = Omit<TMood, 'id'>;
export function useMoods() {
  const { moods, fetchMoods } = useDatabase();

  // Add a new mood and refresh state
  const addMood = async (newMood: TMoodWithoutId) => {
    await mood.add(newMood);
    await fetchMoods(); // Re-fetch after adding
  };

  // Edit a mood and refresh state
  const editMood = async (id: string, updatedMood: TMoodWithoutId) => {
    await mood.edit(id, updatedMood);
    await fetchMoods(); // Re-fetch after editing
  };

  // Delete a mood and refresh state
  const deleteMood = async (id: string) => {
    await mood.delete(id);
    await fetchMoods(); // Re-fetch after deleting
  };

  return { moods, addMood, editMood, deleteMood };
}
