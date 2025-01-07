import { useDatabase } from '@/context/database-context';
import { tag, TTagInput } from '@/lib/idb';

export function useTags() {
  const { tags, fetchTags } = useDatabase();

  const addTag = async (newTag: TTagInput) => {
    await tag.add(newTag);
    await fetchTags();
  };

  const editTag = async (id: string, updatedTag: TTagInput) => {
    await tag.edit(id, updatedTag);
    await fetchTags();
  };

  const deleteTag = async (id: string) => {
    await tag.delete(id);
    await fetchTags();
  };

  return { tags, addTag, editTag, deleteTag };
}
