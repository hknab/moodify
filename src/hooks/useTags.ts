import { useDatabase } from '@/context/database-context';
import { tag } from '@/lib/idb';
import { TTag } from '@/types';

type TTagWithoutId = Omit<TTag, 'id'>;
export function useTags() {
  const { tags, fetchTags } = useDatabase();

  const addTag = async (newTag: TTagWithoutId) => {
    await tag.add(newTag);
    await fetchTags();
  };

  const editTag = async (id: string, updatedTag: TTagWithoutId) => {
    await tag.edit(id, updatedTag);
    await fetchTags();
  };

  const deleteTag = async (id: string) => {
    await tag.delete(id);
    await fetchTags();
  };

  return { tags, addTag, editTag, deleteTag };
}
