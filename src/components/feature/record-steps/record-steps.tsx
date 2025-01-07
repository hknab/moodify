'use client';
import React, { useState } from 'react';
import {
  THandleClickNext,
  THandleUpdateRecord,
  TRecordState,
  TStep,
} from './record.steps.types';
import { MoodStep } from './mood-step';
import { TagStep } from './tag-step';
import { DescriptionStep } from './description-step';
import { MoodRecordedStep } from './final-step';

const RecordSteps = () => {
  const [step, setStep] = useState<TStep>(1);

  const [record, setRecord] = useState<TRecordState>({
    score: 'Natural',
  });

  console.log({ record });

  const handleUpdateRecord: THandleUpdateRecord = (key, newValue) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      [key]: newValue,
    }));
  };
  const handleChangeStep: THandleClickNext = (nextStep) => {
    setStep(nextStep);
  };

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
        onClickNext={() => handleChangeStep(4)}
        onUpdateRecord={handleUpdateRecord}
        record={record}
      />
    ),
    4: <MoodRecordedStep onAnimationFinished={() => handleChangeStep(1)} />,
  }[step];
};

export default RecordSteps;
