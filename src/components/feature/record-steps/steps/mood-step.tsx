'use client';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMoods } from '@/hooks';
import { TMood } from '@/types';
import { FC } from 'react';
import { StepComponentProps } from '../record.steps.types';
import { StepContainer } from '../step-container';

export const MoodStep: FC<StepComponentProps> = ({
  onUpdateRecord,
  record,
  ...props
}) => {
  const { moods } = useMoods();

  const toggleMood = (mood: TMood) => {
    onUpdateRecord(
      'moods',
      record.moods?.includes(mood)
        ? record.moods.filter(({ id }) => id !== mood.id)
        : [...(record.moods || []), mood]
    );
  };

  return (
    <>
      <StepContainer
        title='How do you feel?'
        description='Select the mood(s) that best describes this feeling?'
        {...props}
        className='h-full'
      >
        <ScrollArea>
          <div className='flex flex-row gap-1 flex-wrap items-stretch content-start'>
            {moods.map((mood) => (
              <Badge
                key={mood.id}
                variant={record?.moods?.includes(mood) ? 'default' : 'outline'}
                className='text-sm sm:text-md font-thin py-2 px-3 cursor-pointer transition-all duration-200 select-none'
                onClick={() => toggleMood(mood)}
              >
                {mood.emoji} {mood.title}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </StepContainer>
    </>
  );
};
