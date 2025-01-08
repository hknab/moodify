import { FC, PropsWithChildren, ReactNode } from 'react';
import { SidebarInsetProvider, TSidebarInsetProviderProps } from '../sidebar';

interface AppPageHeaderProps extends TSidebarInsetProviderProps {
  title?: string;
  actions?: ReactNode;
}
const AppPageHeader: FC<PropsWithChildren<AppPageHeaderProps>> = ({
  breadcrumbs,
  children,
  actions,
  title,
}) => {
  return (
    <SidebarInsetProvider breadcrumbs={breadcrumbs}>
      <div className='p-4 md:p8 h-full w-full'>
        {title && (
          <div className='w-full flex items-start justify-between'>
            <h1 className='text-2xl font-bold mb-6'>{title}</h1>
            <div className='flex items-center gap-2'>{actions}</div>
          </div>
        )}
        {children}
      </div>
    </SidebarInsetProvider>
  );
};

export default AppPageHeader;
