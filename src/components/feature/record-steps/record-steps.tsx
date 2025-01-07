'use client';
import { useRecords } from '@/hooks';
import { useGeoInfo } from '@/hooks/useGeoInfo';
import { TRecordInput } from '@/lib/idb';
import { useState } from 'react';
import { DescriptionStep } from './description-step';
import { MoodRecordedStep } from './final-step';
import { MoodStep } from './mood-step';
import {
  THandleClickNext,
  THandleUpdateRecord,
  TStep,
} from './record.steps.types';
import { TagStep } from './tag-step';

const RecordSteps = () => {
  const { error, loading, geoInfo } = useGeoInfo();

  const [step, setStep] = useState<TStep>(1);

  const [record, setRecord] = useState<TRecordInput>({
    score: 'Natural',
    moods: [],
    tags: [],
  });

  const { addRecord, records } = useRecords();
  console.log({ records });

  const handleUpdateRecord: THandleUpdateRecord = (key, newValue) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      [key]: newValue,
    }));
  };
  const handleChangeStep: THandleClickNext = (nextStep) => {
    setStep(nextStep);
  };

  async function handleAddRecord() {
    await addRecord({ ...record, ...geoInfo });
    handleChangeStep(4);
  }
  return {
    1: (
      <MoodStep
        onClickNext={() => handleChangeStep(2)}
        onUpdateRecord={handleUpdateRecord}
        record={record}
      />
    ),
    2: (
      <TagStep
        onClickNext={() => handleChangeStep(3)}
        onUpdateRecord={handleUpdateRecord}
        record={record}
      />
    ),
    3: (
      <DescriptionStep
        onClickNext={handleAddRecord}
        onUpdateRecord={handleUpdateRecord}
        record={record}
      />
    ),
    4: <MoodRecordedStep onAnimationFinished={() => handleChangeStep(1)} />,
  }[step];
};

export default RecordSteps;
