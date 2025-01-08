'use client';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { StepComponentProps } from '../record.steps.types';
import { StepContainer } from '../step-container';

export const DescriptionStep: FC<StepComponentProps> = ({
  onUpdateRecord,
  record,
  ...props
}) => {
  return (
    <StepContainer
      title='Describe your mood'
      description='Why do you having these feelings?'
      className='h-full'
      {...props}
    >
      <Textarea
        value={record.description}
        onChange={(e) => onUpdateRecord('description', e.target.value)}
        className='w-full p-4 font-normal h-40'
        placeholder='I have been burnout for days and my boss is not giving me off...'
        maxLength={250}
      />
      <span className='text-sm dark:text-gray-300 text-gray-700'>
        {250 - (record?.description?.length || 0)} characters left
      </span>
    </StepContainer>
  );
};
