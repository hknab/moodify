import type { Metadata } from 'next';

import React from 'react';
import { DatabaseProvider } from '@/components/providers/database';

export const metadata: Metadata = {
  title: 'Record Mood | Moodify',
  description: 'add a new mood record',
};

export default function RecordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DatabaseProvider>
      <div className='min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-purple-100  dark:from-blue-900 dark:to-purple-900 p-4 pt-20 relative '>
        <nav className='fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center'>
          <button className='text-2xl' aria-label='Menu'>
            &#9776;
          </button>
          <h2 className='text-lg font-thin'>Hello world</h2>
          <div></div>
        </nav>
        {children}
      </div>
    </DatabaseProvider>
  );
}
