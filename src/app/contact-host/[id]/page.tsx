import { fetchRentalData } from '@/actions/actions';
import ContactHostMessage from '@/components/contact-host-message';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

type paramsType = {
  params: {
    id: string;
  };
};

export default async function page({ params }: paramsType) {
  const { id } = params;
  const { rental: rentalData, user: userData } = await fetchRentalData(id);
  const hostName = userData.fullName;
  const hostId = userData._id.toString();
  return (
    <section className='container-real max-w-[1200px]'>
      <div className='py-4'>
        <Link href={`/rooms/${id}`} className='w-min flex'>
          <CaretLeftIcon className='size-10' />
        </Link>
      </div>

      <section className='flex justify-between items-center'>
        <div>
          <h4 className='font-semibold text-xl'>Contact {userData.fullName}</h4>
          <p className='opacity-80'>Typically responds within a few hours</p>
        </div>

        {userData.profileImage ? (
          <Image
            src={userData.profileImage}
            width={50}
            height={50}
            alt='profile image'
            className='rounded-full'
          />
        ) : (
          <span className='size-12 bg-black text-white flex items-center justify-center rounded-full'>
            {userData.fullName[0]}
          </span>
        )}
      </section>

      <div className='w-full h-[1px] bg-black/10 my-10' />

      <section>
        <h4 className='font-semibold text-xl'>Most travellers ask about</h4>

        <div className='flex flex-col py-6'>
          <span className='font-medium'>Getting there</span>
          {rentalData.guestFavourites.includes('Free parking on premises') ? (
            <p>
              <span className='px-2'>•</span>Free parking on the premises.
            </p>
          ) : (
            <p>
              <span className='px-2'>•</span>Paid parking on the premises.
            </p>
          )}
          <p>
            <span className='px-2'>•</span>Check-in for this home is between{' '}
            {rentalData.rules.inAfter} and {rentalData.rules.inBefore} and
            checkout is at {rentalData.rules.outBefore}.
          </p>
        </div>

        <div className='flex flex-col py-6'>
          <span className='font-medium'>House details and rules</span>
          <p>
            <span className='px-2'>•</span>
            {rentalData.rules.smoking ? 'Smoking allowed' : 'No smoking'}.{' '}
            {rentalData.rules.partiesEvents
              ? 'Parties and events allowed'
              : 'No parties or events'}
            . {rentalData.rules.pets ? 'Pets allowed' : 'No pets'}.
          </p>
        </div>

        <div className='flex flex-col pt-6'>
          <span className='font-medium'>Price and availability</span>
          <p>
            <span className='px-2'>•</span>
            {rentalData.cancellation.full
              ? 'Full refund within limited period'
              : rentalData.cancellation.partial
              ? 'Partial refund within limted period'
              : 'Refund not available'}
            .
          </p>
        </div>
      </section>

      <div className='w-full h-[1px] bg-black/10 my-10' />

      <section>
        <h4 className='font-semibold text-xl mb-4'>
          Still have questions? Message the host
        </h4>
        <ContactHostMessage
          userName={userData.fullName}
          rentalId={id}
          hostId={hostId}
          hostName={hostName}
        />
      </section>
    </section>
  );
}
