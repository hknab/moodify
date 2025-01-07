import { TRecord, TScore } from '@/types';

export type TStep = number;

export type THandleUpdateRecord = (
  key: keyof TRecord,
  newValue: TRecord[keyof TRecord]
) => void;

export type TRecordState = Partial<TRecord> & {
  score: TScore;
  moods: string[];
  tags: string[];
};

export type THandleClickNext = (nextStep: number) => void;

export type TScoreDetail = {
  title: TScore;
  textColor: string;
  backgroundColor?: string;
};

export type TScoreDetails = TScoreDetail[];
