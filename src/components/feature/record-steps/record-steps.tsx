'use client';
import { routes } from '@/const';
import { useRecords } from '@/hooks';
import { useGeoInfo } from '@/hooks/useGeoInfo';
import { TRecordInput } from '@/lib/idb';
import { Save } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import {
  THandleClickNext,
  THandleUpdateRecord,
  TStep,
} from './record.steps.types';
import { MoodStateStep } from './steps';
import { DescriptionStep } from './steps/description-step';
import { MoodStep } from './steps/mood-step';
import { TagStep } from './steps/tag-step';

const initialRecord = {
  feeling: '' as TRecordInput['feeling'],
  moods: [],
  tags: [],
};
const RecordSteps = () => {
  const { geoInfo } = useGeoInfo();

  const [step, setStep] = useState<TStep>(0);

  const [record, setRecord] = useState<TRecordInput>(initialRecord);

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
    try {
      await addRecord({ ...(record as TRecordInput), ...geoInfo });
      handleChangeStep(4);
    } catch {
      console.log('error: there was a problem with recoding your mood');
    }
  }

  const gotNextStep = () => {
    setStep(step + 1);
  };
  const gotPreviousStep = () => {
    setStep(step - 1);
  };

  return {
    0: (
      <MoodStateStep
        onClickNext={gotNextStep}
        onUpdateRecord={handleUpdateRecord}
        record={record}
        disableNext={!record.feeling.length}
      />
    ),
    1: (
      <MoodStep
        onClickNext={gotNextStep}
        onClickBack={gotPreviousStep}
        onUpdateRecord={handleUpdateRecord}
        record={record}
        disableNext={!record.moods.length}
      />
    ),
    2: (
      <TagStep
        onClickNext={gotNextStep}
        onClickBack={gotPreviousStep}
        onUpdateRecord={handleUpdateRecord}
        record={record}
        disableNext={!record.tags.length}
      />
    ),
    3: (
      <DescriptionStep
        onClickNext={() => {
          handleAddRecord().then(() => {
            setRecord(initialRecord);
            redirect(routes.app.children.records.route);
          });
        }}
        onClickBack={gotPreviousStep}
        onUpdateRecord={handleUpdateRecord}
        record={record}
        nextCta={
          <>
            <Save /> SAVE RECORD
          </>
        }
      />
    ),
  }[step];
};

export default RecordSteps;
