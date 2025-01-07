'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTags } from '@/hooks';
import { TRecordInput } from '@/lib/idb';
import { TTag } from '@/types';
import { motion } from 'framer-motion';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { THandleUpdateRecord } from './record.steps.types';

export const TagStep: FC<
  PropsWithChildren<{
    onUpdateRecord: THandleUpdateRecord;
    record: TRecordInput;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ onUpdateRecord, record, onClickNext }) => {
  const { tags } = useTags();

  const toggleTag = (tag: TTag) => {
    onUpdateRecord(
      'tags',
      record.tags?.includes(tag)
        ? record.tags.filter(({ id }) => id !== tag.id)
        : [...(record.tags || []), tag]
    );
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
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={record?.tags?.includes(tag) ? 'default' : 'outline'}
            className='text-sm sm:text-md font-thin py-2 px-3 cursor-pointer transition-all duration-200 select-none'
            onClick={() => toggleTag(tag)}
          >
            #{tag.title}
          </Badge>
        ))}
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
