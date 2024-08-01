import { UserDataProps } from '@/lib/types';
import { differenceInYears } from 'date-fns';
import Link from 'next/link';

type MeetYourHostProps = {
  userData: UserDataProps;
  rental: string;
};

export default function MeetYourHost({ userData, rental }: MeetYourHostProps) {
  const yearsAsMember = differenceInYears(
    new Date(),
    new Date(userData.createdAt)
  );
  return (
    <section>
      <h2 className='text-2xl font-semibold'>Meet your host</h2>
      <div className='flex py-4 gap-10'>
        <div className='w-[26rem]'>
          <div className='py-6 px-6 flex flex-1 gap-4 shadow-xl justify-between rounded-2xl border-[1px] border-black/5 items-center mb-2 relative'>
            <Link
              href={`/users/${userData._id}`}
              className='w-full h-full absolute'
            />
            <div className='flex flex-col items-center flex-1'>
              <span className='bg-black rounded-full text-white size-20 flex justify-center items-center'>
                {userData.fullName.slice(0, 1)}
              </span>
              <p className='text-center text-xl font-bold'>
                {userData.fullName}
              </p>
              <p className='text-center text-sm'>Host</p>
            </div>
            <div>
              <div className='flex flex-col items-center'>
                <span className='font-bold text-lg'>333</span>
                <span className='text-xs'>Reviews</span>
              </div>
              <div className='w-full h-[1px] bg-black/10 my-2' />
              <div className='flex flex-col items-center'>
                <span className='font-bold text-lg'>4.68&#9733;</span>
                <span className='text-xs'>Rating</span>
              </div>
              <div className='w-full h-[1px] bg-black/10 my-2' />
              <div className='flex flex-col items-center'>
                <span className='font-bold text-lg'>{yearsAsMember}</span>

                <span className='text-xs'>Yeas hosting</span>
              </div>
            </div>
          </div>
          {/* <span className='flex gap-2 text-sm items-center py-6'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={30}
                height={30}
                alt='profile image'
                className='rounded-full'
              />
              Business
            </span> */}
          {/* <p className='line-clamp-2 text-sm opacity-90 mt-2'>
              We’ve been renting holiday properties for more than 25 years and
              look after over 17,000 properties all across the UK, Ireland and
              New Zealand. Whether you’re looking to surf, walk, relax in a hot
              tub or take your furry pal away with you, I’m sure we’ll have
              something perfect for you. We can’t wait to help you all make the
              most of your important time away from home
            </p> */}
          <Link href={`/users/${userData._id}`} className='underline'>
            Show more
          </Link>
        </div>

        <div className='flex-1'>
          <h4 className='text-lg font-medium'>Host details</h4>
          <div className='py-4 opacity-80 text-sm mb-4'>
            <p>Responsive rate:</p>
            <p>Very responsive</p>
          </div>
          <Link
            href={`/contact-host/${rental}`}
            className='text-white py-[.8rem] px-6 font-semibold bg-black rounded-lg'
          >
            Message Host
          </Link>
          <div className='w-full h-[1px] bg-black/10 mt-10 mb-6' />
          <span className='text-xs opacity-90'>
            To protect your payment, never transfer money or communicate outside
            of te Airbnb website or app.
          </span>
        </div>
      </div>
    </section>
  );
}
