'use client';

import { useHomeContext } from '@/lib/hooks';
import Link from 'next/link';
import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

type BurgerMenuProps = {
  authToken: string | undefined;
  deleteCookie: () => void;
  unreadMessages: number | null;
  setNavbarMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BurgerMenu({
  authToken,
  deleteCookie,
  unreadMessages,
  setNavbarMenuOpen,
}: BurgerMenuProps) {
  const { setIsLoginOpen } = useHomeContext();
  // console.log('unreadmessages:', unreadMessages);

  const navbarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbarMenuHandler = (e: MouseEvent) => {
      if (!navbarMenuRef.current?.contains(e.target as Node)) {
        setNavbarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', navbarMenuHandler);

    return () => {
      document.removeEventListener('mousedown', navbarMenuHandler);
    };
  }, [setNavbarMenuOpen]);
  return (
    <nav
      ref={navbarMenuRef}
      className='absolute right-0  bg-white border border-black/5 rounded-xl w-[14rem] top-[120%] py-2 menu-shadow z-200'
    >
      {!authToken ? (
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
            <button
              onClick={() => setIsLoginOpen(true)}
              className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
            >
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
            <button
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              onClick={() => setIsLoginOpen(true)}
            >
              Airbnb your home
            </button>
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
            {unreadMessages === 0 ? (
              <Link
                href='/messages'
                className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              >
                Messages
              </Link>
            ) : (
              <Link
                href='/messages'
                className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal relative'
              >
                Messages
                <span className='absolute size-2 rounded-full bg-red-500'></span>
              </Link>
            )}
          </li>
          {/* <li>
            <button className='hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'>
              Trips
            </button>
          </li> */}

          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/wishlists'
            >
              Wishlists
            </Link>
          </li>
          <div className='w-full h-[0.1px] bg-black/10 my-2' />
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/hosting'
            >
              Manage listings
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/create'
            >
              Airbnb your home
            </Link>
          </li>
          <li>
            <Link
              className='block hover:bg-black/[3%] w-full text-left pl-2 py-3 text-sm font-normal'
              href='/listings'
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
              onClick={() => deleteCookie()}
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
