import { AppPageHeader } from '@/components/layout/app-page-header';
import { routes } from '@/const';
import type { Metadata } from 'next';

import React from 'react';
import Actions from './_actions';

export const metadata: Metadata = {
  title: 'Record Mood | Moodify',
  description: 'add a new mood record',
};

export default function MoodsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppPageHeader
      breadcrumbs={routes.app.children.records.breadCrumb}
      title='Recorded Moods'
      actions={<Actions />}
    >
      {children}
    </AppPageHeader>
  );
}
