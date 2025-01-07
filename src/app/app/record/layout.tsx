import type { Metadata } from 'next';

import React from 'react';

export const metadata: Metadata = {
  title: 'Record Mood | Moodify',
  description: 'add a new mood record',
};

export default function RecordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
