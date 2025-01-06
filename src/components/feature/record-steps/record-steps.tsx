'use client';
import React, { useState } from 'react';
import {
  THandleClickNext,
  THandleUpdateRecord,
  TRecordState,
  TSteps,
} from './record.steps.types';
import { MoodStep } from './mood-step';

const RecordSteps = () => {
  const [step, setStep] = useState<TSteps>('mood');

  const [record, setRecord] = useState<TRecordState>({
    score: 3,
  });
  const handleUpdateRecord: THandleUpdateRecord = (key, newValue) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      [key]: newValue,
    }));
  };
  const handleClickNext: THandleClickNext = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-purple-100  dark:from-blue-900 dark:to-purple-900 p-4 relative '>
      <h1 className='text-2xl font-bold mb-6 text-center'>Select Your Mood</h1>
      {
        {
          mood: (
            <MoodStep
              onClickNext={() => handleClickNext('tag')}
              onUpdateRecord={handleUpdateRecord}
              record={record}
            />
          ),
          description: <></>,
          tag: <></>,
        }[step]
      }
    </div>
  );
};

export default RecordSteps;
