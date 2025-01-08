import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  ComponentProps,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';

export type StepContainerProps = {
  title: string;
  description?: string;
  onClickBack?: MouseEventHandler<HTMLButtonElement>;
  onClickNext?: MouseEventHandler<HTMLButtonElement>;
  backCta?: ReactNode;
  nextCta?: ReactNode;
  disableNext?: boolean;
} & ComponentProps<typeof Card>;

export const StepContainer: FC<PropsWithChildren<StepContainerProps>> = ({
  children,
  onClickBack,
  onClickNext,
  title,
  description,
  nextCta,
  backCta,
  className,
  disableNext = false,
  ...props
}) => {
  return (
    <Card className={cn('min-h-96 flex flex-col', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-grow'>{children}</CardContent>
      <CardFooter className='flex items-end gap-4 w-full mt-auto'>
        {typeof onClickBack === 'function' && (
          <Button variant='outline' size='lg' onClick={onClickBack}>
            {backCta || 'BACK'}
          </Button>
        )}
        {typeof onClickNext === 'function' && (
          <Button size='lg' onClick={onClickNext} disabled={disableNext}>
            {nextCta || 'NEXT'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
