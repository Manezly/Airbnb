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
    <main className='container-real mt-[400px] flex justify-center'>
      <section className='card-container'>
        {results.map((result) => (
          <Link
            target='_blank'
            key={result._id.toString()}
            href={`/rooms/${result._id}`}
            className='card relative'
          >
            <EditListingsButton rentalId={result._id.toString()} />
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
        ))}
      </section>
    </main>
  );
}
