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
  return <DatabaseProvider>{children}</DatabaseProvider>;
}
