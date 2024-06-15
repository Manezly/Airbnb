'use client';

import { useHomeContext } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';

export default function BottomNav() {
  const { bottomNavOpen } = useHomeContext();

  return (
    <nav
      className={`fixed flex justify-center text-[0.65rem] gap-14 py-4 bg-[#f5f5f4] border-t h-18 bottom-0 w-full overflow-hidden transition-transform duration-300 ${
        !bottomNavOpen ? 'translate-y-48' : 'translate-y-0'
      } md:hidden`}
    >
      <Link href='/' className=' flex flex-col items-center'>
        <Image
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/7.7.0/240/iconmonstr-magnifier-lined.png'
          height={28}
          width={28}
          alt='magnifier'
        />
        Explore
      </Link>
      <Link href='/' className=' flex flex-col items-center'>
        <Image
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/7.7.0/240/iconmonstr-heart-lined.png'
          height={28}
          width={28}
          alt='magnifier'
        />
        Wish lists
      </Link>
      <Link href='/' className=' flex flex-col items-center'>
        <Image
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-user-circle-thin.png'
          height={28}
          width={28}
          alt='magnifier'
          className='bg-transparent'
        />
        Log in
      </Link>
    </nav>
  );
}
