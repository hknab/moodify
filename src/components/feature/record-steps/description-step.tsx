'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TRecordInput } from '@/lib/idb';
import { motion } from 'framer-motion';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { THandleUpdateRecord } from './record.steps.types';

export const DescriptionStep: FC<
  PropsWithChildren<{
    onUpdateRecord: THandleUpdateRecord;
    record: TRecordInput;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ onUpdateRecord, record, onClickNext }) => {
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
        <Textarea
          value={record.description}
          onChange={(e) => onUpdateRecord('description', e.target.value)}
          className='w-full p-4 text-md md:text-lg font-normal h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg'
          placeholder='Describe your mood...'
          maxLength={250}
        />
        <span className='text-sm dark:text-gray-300 text-gray-700'>
          {250 - (record?.description?.length || 0)} characters left
        </span>
      </motion.div>

      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg'>
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
