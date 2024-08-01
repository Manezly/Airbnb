'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type EditListingsButtonProps = {
  rentalId: string;
};

export default function EditListingsButton({
  rentalId,
}: EditListingsButtonProps) {
  const pathname = usePathname();

  if (pathname === '/hosting') {
    return (
      <Link
        href={`/edit/${rentalId}`}
        className='absolute right-5 top-5 bg-white p-2 rounded-lg hover:bg-slate-500'
        target='_blank'
      >
        Edit Listing
      </Link>
    );
  } else {
    return null;
  }
}
