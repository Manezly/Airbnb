import { useHomeContext } from '@/lib/hooks';
import Link from 'next/link';

export default function LearnMore() {
  const { learnMoreOpen } = useHomeContext();

  return (
    <section
      className={`learn-more duration-500 w-full bg-stone-200 overflow-hidden ${
        !learnMoreOpen ? 'learn-more-closed' : ''
      }`}
    >
      <Link
        className='block w-full bg-stone-200 text-center text-md py-4 underline text-sm'
        href='/'
      >
        Learn more about icons
      </Link>
    </section>
  );
}
