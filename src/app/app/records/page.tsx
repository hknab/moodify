'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRecords } from '@/hooks';
import { SmilePlus } from 'lucide-react';
import { redirect } from 'next/navigation';

import { MoodCard } from '@/components/feature/mood-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';

const Page = () => {
  const { records, deleteRecord, isLoadingRecords } = useRecords();
  console.log({ isLoadingRecords });
  const handleDelete = async (id: number) => {
    await deleteRecord(id).then(() => {
      console.log('deleted');
    });
  };
  if (isLoadingRecords)
    return (
      <div className='container mx-auto p-4'>
        <ScrollArea className='h-[calc(100vh-8.5rem)]'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Card key={index} className='flex flex-col'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-6 w-32' />{' '}
                      {/* Skeleton for feeling */}
                      <Skeleton className='h-8 w-16' />{' '}
                      {/* Skeleton for mood emojis */}
                    </div>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <div className='mb-2 flex flex-wrap'>
                      <Skeleton className='h-5 w-16 mr-1 mb-1' />{' '}
                      {/* Skeleton for tag */}
                      <Skeleton className='h-5 w-20 mr-1 mb-1' />{' '}
                      {/* Skeleton for another tag */}
                    </div>
                    <Skeleton className='h-4 w-full mb-2' />{' '}
                    {/* Skeleton for description */}
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-40' />{' '}
                      {/* Skeleton for weather */}
                      <Skeleton className='h-4 w-48' />{' '}
                      {/* Skeleton for location */}
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-between items-center'>
                    <Skeleton className='h-4 w-32' /> {/* Skeleton for date */}
                    <Skeleton className='h-8 w-8 rounded-full' />{' '}
                    {/* Skeleton for delete button */}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </div>
    );
  if (!records.length)
    return (
      <div className='relative h-full w-full flex items-center justify-center'>
        <EmptyState
          title='No Moods'
          description='Record your moods to get started.'
          icons={[SmilePlus]}
          action={{
            label: 'Record new Mood',
            onClick: () => redirect('/app/record'),
          }}
        />
      </div>
    );
  return (
    <div className='relative h-max'>
      <div className='container mx-auto'>
        <ScrollArea className='h-[calc(100vh-9.48rem)]'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {records.map((record) => (
              <MoodCard
                key={record.id}
                record={record}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
