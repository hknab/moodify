import { Button, ButtonProps } from '@/components/ui/button';
import { FC } from 'react';

const NextButton: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button variant='default' size='lg' {...props}>
      {children}
    </Button>
  );
};

export default NextButton;
