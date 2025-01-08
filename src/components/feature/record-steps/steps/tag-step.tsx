'use client';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTags } from '@/hooks';
import { cn } from '@/lib/utils';
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
  const isSelectMoreTagsDisabled = record.tags.length >= 3;

  return (
    <StepContainer
      title={`What's having the biggest impact on your?`}
      {...props}
      className='h-full'
    >
      <ScrollArea className=''>
        <div className='flex flex-row gap-1 flex-wrap h-52 items-stretch content-start'>
          {tags.map((tag) => {
            const isMoodSelected = record?.tags?.includes(tag);
            return (
              <Badge
                key={tag.id}
                variant={isMoodSelected ? 'default' : 'outline'}
                className={cn(
                  'text-sm sm:text-md font-thin py-2 px-3 cursor-pointer transition-all duration-200 select-none',
                  isSelectMoreTagsDisabled &&
                    !isMoodSelected &&
                    'cursor-not-allowed hover:bg-none'
                )}
                onClick={
                  isSelectMoreTagsDisabled && !isMoodSelected
                    ? undefined
                    : () => toggleTag(tag)
                }
              >
                #{tag.title}
              </Badge>
            );
          })}
        </div>
      </ScrollArea>
    </StepContainer>
  );
};
