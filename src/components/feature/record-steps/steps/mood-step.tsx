'use client';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMoods } from '@/hooks';
import { cn } from '@/lib/utils';
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
  const isSelectMoreMoodDisabled = record.moods.length >= 3;
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
            {moods.map((mood) => {
              const isMoodSelected = record?.moods?.includes(mood);
              return (
                <Badge
                  key={mood.id}
                  variant={isMoodSelected ? 'default' : 'outline'}
                  className={cn(
                    'text-sm sm:text-md font-thin py-2 px-3 cursor-pointer transition-all duration-200 select-none',
                    isSelectMoreMoodDisabled &&
                      !isMoodSelected &&
                      'cursor-not-allowed hover:bg-none'
                  )}
                  onClick={
                    isSelectMoreMoodDisabled && !isMoodSelected
                      ? undefined
                      : () => toggleMood(mood)
                  }
                >
                  {mood.emoji} {mood.title}
                </Badge>
              );
            })}
          </div>
        </ScrollArea>
      </StepContainer>
    </>
  );
};
