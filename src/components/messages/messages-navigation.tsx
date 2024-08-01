import { getUserConversations } from '@/actions/actions';
import { MessageBoxProps } from '@/lib/types';
import Link from 'next/link';

interface Conversation {
  _id: string;
  participants: string[];
  messages: string[];
  recipientName: string;
  senderName: string;
  rentalId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  opponent: string;
}

type Conversations = Conversation[];

export default async function MessagesNavigation({
  conversationId,
}: MessageBoxProps) {
  const convos = await getUserConversations();
  const parsedConvos = convos ? (JSON.parse(convos) as Conversations) : [];

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false,
    };
    return newDate.toLocaleString(undefined, options);
  };
  return (
    <section className='w-[20rem] border-[1px] max-h-[50rem] h-full'>
      <h4 className='p-1 font-semibold text-center text-lg'>Messages</h4>
      {parsedConvos.map((convo) => (
        <Link
          key={convo._id}
          href={`/messages/${convo._id}`}
          className={`flex flex-col p-4 border-[1px] ${
            conversationId === convo._id ? 'border-black' : ''
          }`}
        >
          <span>{convo.opponent}</span>{' '}
          <span>{formatDate(convo.updatedAt)}</span>
        </Link>
      ))}
    </section>
  );
}
