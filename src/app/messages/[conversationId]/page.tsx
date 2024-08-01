import MessageBox from '@/components/messages/message-box';
import MessagesNavigation from '@/components/messages/messages-navigation';
import React from 'react';

type ParamsType = {
  params: {
    conversationId: string;
  };
};
export default function page({ params }: ParamsType) {
  const { conversationId } = params;

  return (
    <section className='flex container-real py-8'>
      <MessagesNavigation conversationId={conversationId} />
      <MessageBox conversationId={conversationId} />
    </section>
  );
}
