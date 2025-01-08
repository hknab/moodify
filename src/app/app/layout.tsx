import { AppSidebar } from '@/components/layout/sidebar';
import { DatabaseProvider } from '@/components/providers/database';
import { SidebarProvider } from '@/components/ui/sidebar';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DatabaseProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='min-h-screen w-full'>{children}</main>
      </SidebarProvider>
    </DatabaseProvider>
  );
}
