'use client';

import { TMood, TRecord, TRecords, TTag } from '@/types';
import { IDBPDatabase, openDB } from 'idb';
import { getCurrentTime } from './utils';

const DB_NAME = 'MoodifyDB';
const DB_VERSION = 1;
const MOODS_STORE = 'moods';
const TAGS_STORE = 'tags';
const RECORDS_STORE = 'records';

interface DatabaseSchema {
  moods: TMood;
  tags: TTag;
  records: TRecord;
}

// Default Moods and Tags
const defaultMoods: TMood[] = [
  { title: 'Amazed', emoji: '😲' },
  { title: 'Amused', emoji: '😄' },
  { title: 'Angry', emoji: '😡' },
  { title: 'Annoyed', emoji: '😒' },
  { title: 'Anxious', emoji: '😰' },
  { title: 'Ashamed', emoji: '😳' },
  { title: 'Brave', emoji: '🦁' },
  { title: 'Calm', emoji: '🧘' },
  { title: 'Confident', emoji: '😎' },
  { title: 'Content', emoji: '😊' },
  { title: 'Disappointed', emoji: '😞' },
  { title: 'Discouraged', emoji: '😔' },
  { title: 'Disgusted', emoji: '🤢' },
  { title: 'Drained', emoji: '😩' },
  { title: 'Embarrassed', emoji: '😅' },
  { title: 'Excited', emoji: '🤩' },
  { title: 'Frustrated', emoji: '😤' },
  { title: 'Grateful', emoji: '🙏' },
  { title: 'Guilty', emoji: '😣' },
  { title: 'Happy', emoji: '😀' },
  { title: 'Hopeful', emoji: '🌟' },
  { title: 'Hopeless', emoji: '😟' },
  { title: 'Indifferent', emoji: '😐' },
  { title: 'Irritated', emoji: '😠' },
  { title: 'Jealous', emoji: '😒💚' },
  { title: 'Joyful', emoji: '🥳' },
  { title: 'Lonely', emoji: '😢' },
  { title: 'Overwhelmed', emoji: '😵' },
  { title: 'Passionate', emoji: '❤️‍🔥' },
  { title: 'Peaceful', emoji: '☮️' },
  { title: 'Proud', emoji: '🎖️' },
  { title: 'Relieved', emoji: '😌' },
  { title: 'Sad', emoji: '😢' },
  { title: 'Satisfied', emoji: '😋' },
  { title: 'Scared', emoji: '😱' },
  { title: 'Stressed', emoji: '😫' },
  { title: 'Surprised', emoji: '😮' },
  { title: 'Worried', emoji: '😟' },
].map((mood, index) => ({
  ...mood,
  createdAt: new Date().toISOString(),
  id: index + 1,
}));

const defaultTags: TTag[] = [
  { title: 'Health' },
  { title: 'Fitness' },
  { title: 'Self-Care' },
  { title: 'Hobbies' },
  { title: 'Identity' },
  { title: 'Spirituality' },
  { title: 'Community' },
  { title: 'Family' },
  { title: 'Friends' },
  { title: 'Partner' },
  { title: 'Dating' },
  { title: 'Tasks' },
  { title: 'Work' },
  { title: 'Education' },
  { title: 'Travel' },
  { title: 'Weather' },
  { title: 'Current Events' },
  { title: 'Money' },
].map((tag, index) => ({
  ...tag,
  createdAt: new Date().toISOString(),
  id: index + 1,
}));

// Open Database
async function getDatabase(): Promise<IDBPDatabase<DatabaseSchema>> {
  return openDB<DatabaseSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(MOODS_STORE)) {
        const moodsStore = db.createObjectStore(MOODS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
        defaultMoods.forEach((mood) => moodsStore.put(mood));
      }

      if (!db.objectStoreNames.contains(TAGS_STORE)) {
        const tagsStore = db.createObjectStore(TAGS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
        defaultTags.forEach((tag) => tagsStore.put(tag));
      }

      if (!db.objectStoreNames.contains(RECORDS_STORE)) {
        db.createObjectStore(RECORDS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });
}

// **Mood Operations**
export type TMoodInput = Omit<TMood, 'id' | 'createdAt' | 'updatedAt'>;
export const mood = {
  add: async (mood: TMoodInput) => {
    const db = await getDatabase();
    await db.put(MOODS_STORE, mood);
  },

  delete: async (id: string) => {
    const db = await getDatabase();
    await db.delete(MOODS_STORE, id);
  },

  edit: async (id: string, updatedMood: Partial<TMoodInput>) => {
    const db = await getDatabase();
    const existingMood = await db.get(MOODS_STORE, id);
    if (existingMood) {
      await db.put(MOODS_STORE, { ...existingMood, ...updatedMood });
    }
  },

  get: async (filter?: (mood: TMood) => boolean): Promise<TMood[]> => {
    const db = await getDatabase();
    const allMoods = await db.getAll(MOODS_STORE);
    return filter ? allMoods.filter(filter) : allMoods;
  },
};

// **Tag Operations**
export type TTagInput = Omit<TTag, 'id' | 'createdAt' | 'updatedAt'>;
export const tag = {
  add: async (tag: TTagInput) => {
    const db = await getDatabase();
    await db.put(TAGS_STORE, tag);
  },

  delete: async (id: string) => {
    const db = await getDatabase();
    await db.delete(TAGS_STORE, id);
  },

  edit: async (id: string, updatedTag: Partial<TTagInput>) => {
    const db = await getDatabase();
    const existingTag = await db.get(TAGS_STORE, id);
    if (existingTag) {
      await db.put(TAGS_STORE, { ...existingTag, ...updatedTag });
    }
  },

  get: async (filter?: (tag: TTag) => boolean): Promise<TTag[]> => {
    const db = await getDatabase();
    const allTags = await db.getAll(TAGS_STORE);
    return filter ? allTags.filter(filter) : allTags;
  },
};

// **Record Operations**
export type TRecordInput = Omit<TRecord, 'id' | 'createdAt' | 'updatedAt'>;
export const record = {
  add: async (record: TRecordInput) => {
    const db = await getDatabase();
    const time = getCurrentTime();
    await db.put(RECORDS_STORE, {
      ...record,
      createdAt: time,
      updatedAt: time,
    });
  },

  delete: async (id: string) => {
    const db = await getDatabase();
    await db.delete(RECORDS_STORE, id);
  },

  edit: async (id: string, updatedRecord: Partial<TRecordInput>) => {
    const db = await getDatabase();
    const existingRecord = await db.get(RECORDS_STORE, id);
    if (existingRecord) {
      await db.put(RECORDS_STORE, {
        ...existingRecord,
        ...updatedRecord,
        updatedAt: getCurrentTime(),
      });
    }
  },

  get: async (filter?: (record: TRecord) => boolean): Promise<TRecords> => {
    const db = await getDatabase();
    const allRecords = await db.getAll(RECORDS_STORE);
    return filter ? allRecords.filter(filter) : allRecords;
  },
};
