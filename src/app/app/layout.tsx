import { AppSidebar, SidebarInsetProvider } from '@/components/layout/sidebar';
import { DatabaseProvider } from '@/components/providers/database';
import { SidebarProvider } from '@/components/ui/sidebar';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DatabaseProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='min-h-screen w-full'>
          <SidebarInsetProvider>
            <div className='p-4 md:p8 h-full w-full'>{children}</div>
          </SidebarInsetProvider>
        </main>
      </SidebarProvider>
    </DatabaseProvider>
  );
}
