import { useDatabase } from '@/context/database-context';
import { mood, TMoodInput } from '@/lib/idb';

export function useMoods() {
  const { moods, fetchMoods } = useDatabase();

  // Add a new mood and refresh state
  const addMood = async (newMood: TMoodInput) => {
    await mood.add(newMood);
    await fetchMoods(); // Re-fetch after adding
  };

  // Edit a mood and refresh state
  const editMood = async (id: number, updatedMood: TMoodInput) => {
    await mood.edit(id, updatedMood);
    await fetchMoods(); // Re-fetch after editing
  };

  // Delete a mood and refresh state
  const deleteMood = async (id: number) => {
    await mood.delete(id);
    await fetchMoods(); // Re-fetch after deleting
  };

  return { moods, addMood, editMood, deleteMood };
}
