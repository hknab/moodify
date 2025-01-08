import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TRecord } from '@/types';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import React from 'react';

type MoodCardProps = {
  record: TRecord;
  handleDelete: (id: number) => void;
};
const MoodCard: React.FC<MoodCardProps> = ({ record, handleDelete }) => {
  return (
    <Card key={record.id} className='flex flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{record.feeling}</span>
          <span className='text-2xl'>
            <TooltipProvider>
              {record.moods.map((mood) => (
                <Tooltip key={mood.id} delayDuration={0}>
                  <TooltipTrigger>{mood.emoji}</TooltipTrigger>
                  <TooltipContent>{mood.title}</TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-grow'>
        <div className='mb-2'>
          {record.tags.map((tag) => (
            <Badge key={tag.id} variant='secondary' className='mr-1 mb-1'>
              {tag.title}
            </Badge>
          ))}
        </div>

        {record.description && (
          <p className='text-sm text-muted-foreground mb-2'>
            {record.description}
          </p>
        )}

        {record.weather && record.location && (
          <div className='text-sm'>
            <p>
              🌡️ {record.weather.temperature}°C, {record.weather.condition}
            </p>
            <p>
              📍 {record.location.name}, {record.location.region}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          {format(new Date(record.createdAt), 'PPp')}
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                mood record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant='destructive'
                onClick={() => handleDelete(record.id)}
              >
                DELETE
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default MoodCard;
