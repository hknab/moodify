import { TRecordInput } from '@/lib/idb';
import { TFeeling, TRecord } from '@/types';
import { StepContainerProps } from './step-container';

export type TStep = number;

export type THandleUpdateRecord = (
  key: keyof TRecord,
  newValue: TRecord[keyof TRecord]
) => void;

export type TRecordState = Partial<TRecord> & {
  score: TFeeling;
  moods: string[];
  tags: string[];
};

export type THandleClickNext = (nextStep: number) => void;

export type TScoreDetail = {
  title: TFeeling;
  color: string;
};

export type TScoreDetails = TScoreDetail[];

export interface StepComponentProps
  extends Pick<
    StepContainerProps,
    'backCta' | 'nextCta' | 'onClickNext' | 'onClickBack' | 'disableNext'
  > {
  onUpdateRecord: THandleUpdateRecord;
  record: TRecordInput;
}
