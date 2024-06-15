'use client';

import { handleSignOut, isUserSignedIn } from '@/lib/authenticate';
import { useHomeContext } from '@/lib/hooks';
import Link from 'next/link';

export default function BurgerMenu() {
  const { setIsLoginOpen } = useHomeContext();
  return (
    <nav className='absolute right-0  bg-white border border-black/5 rounded-xl w-[14rem] top-[120%] py-2 menu-shadow z-200'>
      {!isUserSignedIn() ? (
        <ul>
          <li>
            <button
              onClick={() => setIsLoginOpen(true)}
              className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
            >
              Sign up
            </button>
          </li>
          <li>
            <button className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'>
              Log in
            </button>
          </li>
          <div className='w-full h-[0.1px] bg-black/10 my-2' />
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Gift cards
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Airbnb your home
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Help Centre
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'>
              Messages
            </button>
          </li>
          <li>
            <button className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'>
              Trips
            </button>
          </li>

          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Wishlists
            </Link>
          </li>
          <div className='w-full h-[0.1px] bg-black/10 my-2' />
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Airbnb your home
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Account
            </Link>
          </li>
          <div className='w-full h-[0.1px] bg-black/10 my-2' />
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Gift cards
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/'
            >
              Help center
            </Link>
          </li>
          <li>
            <button
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              onClick={handleSignOut}
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
