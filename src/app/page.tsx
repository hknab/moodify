'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex flex-col items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100'>
          MOODIFY<span className='text-purple-600 text-6xl'>.</span>WTF
        </h1>
        <p className='text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300'>
          Start recording your mood and emotions
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href='/app/record'>
            <Button variant='gradient' size='lg'>
              RECORD A NEW MOOD
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <footer className='absolute bottom-4 text-sm text-gray-500 dark:text-gray-400'>
        © 2023 Mood Journal. All rights reserved.
      </footer>
    </div>
  );
}
