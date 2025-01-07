import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { TFeeling } from '@/types';
import { FC } from 'react';
import { StepComponentProps, TScoreDetails } from '../record.steps.types';
import { StepContainer } from '../step-container';

const feelingDescriptions: Record<TFeeling, string> = {
  'Very Unpleasant': 'Extremely negative emotions, discomfort, or distress',
  Unpleasant: 'Negative feelings or dissatisfaction',
  'Slightly Unpleasant': 'Mild discomfort or minor negative emotions',
  Natural: 'Neutral state, neither positive nor negative',
  'Slightly Pleasant': 'Mild positive feelings or slight enjoyment',
  Pleasant: 'Positive emotions or satisfaction',
  'Very Pleasant': 'Extremely positive emotions, joy, or delight',
};

const feelingGradients: Record<TFeeling, string> = {
  'Very Unpleasant': 'bg-gradient-to-r from-red-600 to-red-400',
  Unpleasant: 'bg-gradient-to-r from-red-500 to-orange-400',
  'Slightly Unpleasant': 'bg-gradient-to-r from-orange-400 to-yellow-300',
  Natural: 'bg-gradient-to-r from-yellow-300 to-green-300',
  'Slightly Pleasant': 'bg-gradient-to-r from-green-300 to-blue-300',
  Pleasant: 'bg-gradient-to-r from-blue-400 to-indigo-400',
  'Very Pleasant': 'bg-gradient-to-r from-indigo-400 to-purple-400',
};

const roundScore = (feeling: number) => Math.round(feeling);

const scoreDetails: TScoreDetails = [
  { title: 'Very Unpleasant', color: '#ea580c' },
  { title: 'Unpleasant', color: '#f97316' },
  { title: 'Slightly Unpleasant', color: '#fbbf24' },
  { title: 'Natural', color: '#27272a' },
  { title: 'Slightly Pleasant', color: '#10b981' },
  { title: 'Pleasant', color: '#0891b2' },
  { title: 'Very Pleasant', color: '#2563eb' },
];

export const MoodStateStep: FC<StepComponentProps> = ({
  onUpdateRecord,
  record,
  ...props
}) => {
  return (
    <StepContainer
      title='Choose how you felt in a previous moment'
      className='h-full'
      {...props}
    >
      <RadioGroup
        onValueChange={(value) => onUpdateRecord('feeling', value as TFeeling)}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 select-none'
      >
        {(Object.keys(feelingDescriptions) as TFeeling[]).map((feeling) => (
          <Label
            key={feeling}
            htmlFor={feeling}
            className={cn(
              'cursor-pointer flex items-start space-x-3 space-y-0 p-4 rounded-lg transition-all',
              'border hover:border-primary  border-gray-500',
              `hover:${feelingGradients[feeling]}`,
              'group',
              record.feeling === feeling
                ? `border-primary ${feelingGradients[feeling]}`
                : ''
            )}
          >
            <RadioGroupItem value={feeling} id={feeling} className='sr-only' />
            <div className='grid gap-1.5 leading-none'>
              <span
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  'transition-colors',
                  'group-hover:text-gray-700',
                  record.feeling === feeling
                    ? 'text-primary'
                    : 'text-foreground'
                )}
              >
                {feeling}
              </span>
              <p
                className={cn(
                  'text-sm transition-colors',
                  'group-hover:text-gray-700/90',
                  record.feeling === feeling
                    ? 'text-primary/90'
                    : 'text-muted-foreground'
                )}
              >
                {feelingDescriptions[feeling]}
              </p>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </StepContainer>
  );
};
