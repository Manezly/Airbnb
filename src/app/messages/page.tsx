export const dynamic = 'force-dynamic';

import MessagesNavigation from '@/components/messages/messages-navigation';
import { Suspense } from 'react';

export default function page() {
  return (
    <section className='flex container-real '>
      <Suspense fallback={<div>Loading messages...</div>}>
        <MessagesNavigation />
      </Suspense>
      <div className='flex justify-center items-center w-full h-auto border-[1px]'>
        Message Container
      </div>
    </section>
  );
}
