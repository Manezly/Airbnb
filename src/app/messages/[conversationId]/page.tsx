'force-dynamic';

import MessageBox from '@/components/messages/message-box';
import MessagesNavigation from '@/components/messages/messages-navigation';
import React, { Suspense } from 'react';

type ParamsType = {
  params: {
    conversationId: string;
  };
};
export default function page({ params }: ParamsType) {
  const { conversationId } = params;

  return (
    <section className='flex container-real py-8'>
      <Suspense fallback={<div>Loading messages...</div>}>
        <MessagesNavigation conversationId={conversationId} />
      </Suspense>
      <MessageBox conversationId={conversationId} />
    </section>
  );
}
