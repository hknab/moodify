import { TRecord, TScore } from '@/types';

export type TSteps = 'mood' | 'tag' | 'description';

export type THandleUpdateRecord = (
  key: keyof TRecord,
  newValue: TRecord[keyof TRecord]
) => void;

export type TRecordState = Partial<TRecord> & { score: TScore };

export type THandleClickNext = (nextStep: TSteps) => void;
