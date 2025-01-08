import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { TBreadcrumb } from '@/types';
import Link from 'next/link';
import { FC, Fragment, PropsWithChildren } from 'react';

export type TSidebarInsetProviderProps = {
  breadcrumbs: TBreadcrumb[];
};
export const SidebarInsetProvider: FC<
  PropsWithChildren<TSidebarInsetProviderProps>
> = ({ children, breadcrumbs }) => {
  return (
    <SidebarInset className='h-full'>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map(({ link, title }, index) =>
                breadcrumbs.length - 1 === index ? (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <Fragment key={index}>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href='#' asChild>
                        <Link href={link || '#'}>{title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                  </Fragment>
                )
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
    </SidebarInset>
  );
};
