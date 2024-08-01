'use client';

import { ArrowDownIcon, GlobeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import {
  airbnbLinks,
  hostingLinks,
  popularLinks,
  supportLinks,
} from '@/constants/footer-constants';
import Image from 'next/image';
import { useHomeContext } from '@/lib/hooks';

export default function Footer() {
  const { openFooter, setOpenFooter, footerOptions, setFooterOptions } =
    useHomeContext();

  return (
    <footer className='z-40 container-real bg-[#f5f5f4]'>
      <section>
        <h2 className='pt-12 font-semibold text-xl'>
          Inspirations for future getaways
        </h2>
        <div className='text-sm border-b flex gap-4'>
          <button
            onClick={() => setFooterOptions(1)}
            className={`py-4 opacity-80  ${
              footerOptions === 1 ? 'opacity-100 border-b-2 border-black' : ''
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setFooterOptions(2)}
            className={`py-4 opacity-80  ${
              footerOptions === 2 ? 'opacity-100 border-b-2 border-black' : ''
            }`}
          >
            History
          </button>
          <button
            onClick={() => setFooterOptions(3)}
            className={`py-4 opacity-80  ${
              footerOptions === 3 ? 'opacity-100 border-b-2 border-black' : ''
            }`}
          >
            Coastal
          </button>
          <button
            onClick={() => setFooterOptions(4)}
            className={`py-4 opacity-80  ${
              footerOptions === 4 ? 'opacity-100 border-b-2 border-black' : ''
            }`}
          >
            Islands
          </button>
          <button
            onClick={() => setFooterOptions(5)}
            className={`py-4 opacity-80  ${
              footerOptions === 5 ? 'opacity-100 border-b-2 border-black' : ''
            }`}
          >
            Lakes
          </button>
        </div>
      </section>

      <nav
        className={`relative py-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 overflow-hidden h-[12.2rem] ${
          openFooter ? 'h-auto' : ''
        }`}
      >
        {popularLinks.map((link, index) => (
          <Link
            className='flex flex-col text-sm'
            href={link.href}
            key={link.href + index}
          >
            <span className='font-semibold'>{link.location}</span>
            <span className='opacity-80'>{link.type}</span>
          </Link>
        ))}
        {!openFooter && (
          <button
            onClick={() => setOpenFooter(true)}
            className='show-more h-[2.8rem] bg-[#f5f5f4] absolute flex items-center gap-1 top-[70%] right-[0%] w-[49%] md:w-[32.2%] lg:w-[24.2%] 2xl:w-[20%]'
          >
            Show more <ArrowDownIcon />
          </button>
        )}
      </nav>

      <nav className='lg:flex justify-between'>
        <section className='text-sm flex flex-col gap-[0.7rem] py-6 border-t border-b flex-1'>
          <h2 className='font-semibold'>Support</h2>
          {supportLinks.map((link) => (
            <Link
              className='hover:border-b border-black block w-fit'
              href={link.href}
              key={link.text}
            >
              {link.text}
            </Link>
          ))}
        </section>

        <section className='text-sm flex flex-col gap-[0.7rem] py-6 flex-1'>
          <h2 className='font-semibold'>Hosting</h2>
          {hostingLinks.map((link) => (
            <Link
              className='hover:border-b border-black block w-fit'
              href={link.href}
              key={link.text}
            >
              {link.text}
            </Link>
          ))}
        </section>

        <section className='text-sm flex flex-col gap-[0.7rem] py-6 border-t border-b flex-1'>
          <h2 className='font-semibold'>Airbnb</h2>
          {airbnbLinks.map((link) => (
            <Link
              className='hover:border-b border-black block w-fit'
              href={link.href}
              key={link.text}
            >
              {link.text}
            </Link>
          ))}
        </section>
      </nav>

      <section className='text-sm flex flex-col pb-6 md:items-center'>
        <div className='flex gap-6 pt- py-6'>
          <button className='flex item-center gap-2 '>
            <GlobeIcon className='size-5' />
            English<span>(GB)</span>
          </button>
          <button>
            <span className='font-semibold'>£</span> GBP
          </button>

          <div className='hidden md:flex pl-4 gap-[0.8rem]'>
            <Link href='/'>
              <Image
                src='https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-facebook-6.png'
                height={20}
                width={20}
                alt='facebook'
              />
            </Link>
            <Link href='/'>
              <Image
                src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-twitter-2.png'
                height={20}
                width={20}
                alt='facebook'
              />
            </Link>
            <Link href='/'>
              <Image
                src='https://cdns.iconmonstr.com/wp-content/releases/preview/2016/240/iconmonstr-instagram-12.png'
                height={20}
                width={20}
                alt='facebook'
              />
            </Link>
          </div>
        </div>

        <span className='opacity-80'>&copy; 2024 Airbnb, Inc.</span>

        <div className='pt-2 opacity-80 flex gap-2 flex-wrap'>
          <Link className='whitespace-nowrap' href='/'>
            Privary
          </Link>{' '}
          ·{' '}
          <Link className='whitespace-nowrap' href='/'>
            Terms
          </Link>{' '}
          · <Link href='/'>Sitemap</Link> ·{' '}
          <Link className='whitespace-nowrap' href='/'>
            UK Modern Slavery Act
          </Link>{' '}
          ·{' '}
          <Link className='whitespace-nowrap' href='/'>
            Company details
          </Link>
        </div>
      </section>
    </footer>
  );
}
