import Image from 'next/image';
import Link from 'next/link';
import { TRental } from '@/lib/types';
import EditListingsButton from './edit-listings-button';

type CardContainerProps = {
  results: TRental[] | undefined;
};

export default function CardContainer({ results }: CardContainerProps) {
  if (!results || results.length === 0) {
    return <p>No results found</p>;
  }
  return (
    <main className='container-real md:mt-[400px] mt-5 flex justify-center'>
      <section className='card-container'>
        {results.map((result) => (
          <div key={result._id.toString()} className='card relative'>
            <EditListingsButton rentalId={result._id.toString()} />
            <Link target='_blank' href={`/rooms/${result._id}`}>
              <Image
                src={result.images[1]}
                width={500}
                height={500}
                priority
                alt='card image'
                className='rounded-3xl aspect-square h-full'
              />
              <p className='font-bold text-sm tracking-tight pt-2'>
                {result.title}
              </p>
              <p className='text-sm opacity-80 tracking-tight'>
                {result.fullName}
              </p>
              <p className='text-sm tracking-tight'>
                <span className='font-bold '>£{result.rates}</span> total
              </p>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
