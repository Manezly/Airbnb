import React from 'react';
import InstantMessageForm from './instant-message-form';
import { getMessagesByConversationId } from '@/actions/actions';
import { MessageBoxProps } from '@/lib/types';

type Message = {
  _id: string;
  text: string;
  senderId: string;
  recipientId: string;
  rentalId: string;
  conversationId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userSender: boolean;
};

const formatDateTime = (date: string) => {
  const newDate = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = newDate.toLocaleDateString(undefined, dateOptions);
  const formattedTime = newDate.toLocaleTimeString(undefined, timeOptions);

  return `${formattedTime} ${formattedDate}`;
};

export default async function MessageBox({ conversationId }: MessageBoxProps) {
  const result = await getMessagesByConversationId(conversationId);
  if (!result) {
    console.error('Failed to fetch conversation data');
    return;
  }
  const { processedMessages, messageTemplate } = result;
  // console.log(processedMessages);
  return (
    <section className='flex justify-center items-center w-full h-auto border-[1px] flex-col'>
      <div className='px-6 flex flex-col gap-4 pb-4 h-[40rem] overflow-scroll w-full'>
        {processedMessages.map((message: Message) => (
          <div
            key={message._id}
            className={`flex ${message.userSender ? 'justify-end' : ''}`}
          >
            <div
              className={`flex border-black/5 border-[1px] p-2 rounded-2xl max-w-[85%] gap-4 ${
                message.userSender ? 'bg-green-100' : ''
              }`}
            >
              <p>{message.text}</p>
              <p className='self-end text-xs opacity-70'>
                {formatDateTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <InstantMessageForm messageTemplate={messageTemplate} />
    </section>
  );
}
