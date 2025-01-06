'use client';
import { Badge } from '@/components/ui/badge';
import { BlurIn } from '@/components/ui/blur-in';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMoods } from '@/hooks';
import { TMood } from '@/types';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { THandleUpdateRecord, TRecordState } from './record.steps.types';
import { motion } from 'framer-motion';

const roundScore = (score: number) => Math.round(score);

const scoreDetails = [
  { title: 'Very Unpleasant', color: 'text-orange-600' },
  { title: 'Unpleasant', color: 'text-yellow-600' },
  { title: 'Slightly Unpleasant', color: 'text-green-600' },
  { title: 'Natural', color: 'text-cyan-500' },
  { title: 'Slightly Pleasant', color: 'text-blue-400' },
  { title: 'Pleasant', color: 'text-blue-700' },
  { title: 'Very Pleasant', color: 'text-purple-700' },
];

export const MoodStep: FC<
  PropsWithChildren<{
    onUpdateRecord: THandleUpdateRecord;
    record: TRecordState;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ onUpdateRecord, record, onClickNext }) => {
  const { moods } = useMoods();

  const toggleMood = (mood: TMood) => {
    onUpdateRecord(
      'moods',
      record.moods?.includes(mood)
        ? record.moods.filter(({ id }) => id !== mood.id)
        : [...(record.moods || []), mood]
    );
  };

  const handleScoreChange = (score: number) => {
    const roundedScore = roundScore(score);
    onUpdateRecord('score', roundedScore);
  };

  const roundedScore = roundScore(record.score);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.3 },
        }}
        className='flex gap-2 flex-wrap justify-start items-start mt-auto pb-40 md:pb-60'
      >
        {moods.map((mood) => (
          <Badge
            key={mood.id}
            variant={record?.moods?.includes(mood) ? 'default' : 'outline'}
            className='text-base sm:text-lg py-2 px-3 cursor-pointer transition-all duration-200 select-none'
            onClick={() => toggleMood(mood)}
          >
            {mood.emoji} {mood.title}
          </Badge>
        ))}
      </motion.div>

      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg'>
        <Slider
          value={[record.score]}
          onValueChange={(value) => onUpdateRecord('score', value[0])}
          onValueCommit={(value) => handleScoreChange(value[0])}
          min={0}
          max={6}
          step={0.01}
          className='mb-4'
        />
        <div className='flex items-stretch justify-center mb-4'>
          <span className='text-lg font-semibold'>
            <BlurIn
              key={scoreDetails[roundedScore].title}
              duration={0.5}
              word={scoreDetails[roundedScore].title}
              className={`text-2xl font-bold ${scoreDetails[roundedScore].color} dark:text-white`}
            />
          </span>
        </div>
        <Button
          className='w-full py-6 text-lg font-semibold'
          variant='gradient'
          onClick={onClickNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};
