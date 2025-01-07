'use client';
import { Badge } from '@/components/ui/badge';
import { BlurIn } from '@/components/ui/blur-in';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMoods } from '@/hooks';
import { TRecordInput } from '@/lib/idb';
import { TMood } from '@/types';
import { motion } from 'framer-motion';
import { FC, MouseEventHandler, PropsWithChildren, useState } from 'react';
import { THandleUpdateRecord, TScoreDetails } from './record.steps.types';

const roundScore = (score: number) => Math.round(score);

const scoreDetails: TScoreDetails = [
  { title: 'Very Unpleasant', textColor: 'text-orange-600' },
  { title: 'Unpleasant', textColor: 'text-yellow-600' },
  { title: 'Slightly Unpleasant', textColor: 'text-green-600' },
  { title: 'Natural', textColor: 'text-cyan-500' },
  { title: 'Slightly Pleasant', textColor: 'text-blue-400' },
  { title: 'Pleasant', textColor: 'text-blue-700' },
  { title: 'Very Pleasant', textColor: 'text-purple-700' },
];

export const MoodStep: FC<
  PropsWithChildren<{
    onUpdateRecord: THandleUpdateRecord;
    record: TRecordInput;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ onUpdateRecord, record, onClickNext }) => {
  const [score, setScore] = useState(
    scoreDetails.findIndex(({ title }) => title === record.score)
  );

  const { moods } = useMoods();

  const toggleMood = (mood: TMood) => {
    onUpdateRecord(
      'moods',
      record.moods?.includes(mood)
        ? record.moods.filter(({ id }) => id !== mood.id)
        : [...(record.moods || []), mood]
    );
  };

  const handleChangeSlider = (value: number[]) => {
    setScore(value[0]);
    const roundedScore = roundScore(value[0]);
    const newScore = scoreDetails[roundedScore];
    onUpdateRecord('score', newScore.title);
  };
  const handleCommitSlider = (value: number[]) => {
    setScore(roundScore(value[0]));
  };
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
          value={[score]}
          onValueChange={handleChangeSlider}
          onValueCommit={handleCommitSlider}
          min={0}
          max={6}
          step={0.01}
          className='mb-4'
        />
        <div className='flex items-stretch justify-center mb-4'>
          <span className='text-lg font-semibold'>
            <BlurIn
              key={record.score}
              duration={0.5}
              word={record.score}
              className={`text-2xl font-bold ${scoreDetails[roundScore(score)].textColor} dark:text-white`}
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
