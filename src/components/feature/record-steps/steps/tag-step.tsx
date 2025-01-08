'use client';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTags } from '@/hooks';
import { TTag } from '@/types';
import { FC } from 'react';
import { StepComponentProps } from '../record.steps.types';
import { StepContainer } from '../step-container';

export const TagStep: FC<StepComponentProps> = ({
  onUpdateRecord,
  record,
  ...props
}) => {
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
    <StepContainer
      title={`What's having the biggest impact on your?`}
      {...props}
      className='h-full'
    >
      <ScrollArea className=''>
        <div className='flex flex-row gap-1 flex-wrap h-52 items-stretch content-start'>
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
        </div>
      </ScrollArea>
    </StepContainer>
  );
};
