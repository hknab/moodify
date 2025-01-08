'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

export const FinalAnimation: FC<{ onAnimationFinished: () => void }> = ({
  onAnimationFinished,
}) => {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      onAnimationFinished();
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!show) return null;
  if (show)
    return (
      <AnimatePresence>
        <motion.div
          className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-card text-card-foreground rounded-2xl shadow-2xl p-8 w-80 flex flex-col items-center'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.div
              className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6'
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <Check
                className='w-12 h-12 text-primary-foreground'
                strokeWidth={3}
              />
            </motion.div>
            <motion.h2
              className='text-2xl font-bold mb-2 text-primary'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Mood Recorded
            </motion.h2>
            <motion.p
              className='text-muted-foreground text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Your emotional journey is being tracked. Great job on staying
              mindful!
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
};
