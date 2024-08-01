import MessagesNavigation from '@/components/messages/messages-navigation';
import React from 'react';

export default async function page() {
  return (
    <section className='flex container-real '>
      <MessagesNavigation />
      <div className='flex justify-center items-center w-full h-auto border-[1px]'>
        Message Container
      </div>
    </section>
  );
}
