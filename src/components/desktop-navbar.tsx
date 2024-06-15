'use client';

import { GlobeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import DesktopAnimatingSearchBar from './desktop-animating-searchbar';
import LearnMore from './learn-more';
import BurgerMenu from './burger-menu';
import SearchCarousel from './search-carousel';
import FilterButton from './filter-button';
import { useHomeContext } from '@/lib/hooks';
import { isUserSignedIn } from '@/lib/authenticate';
import { usePathname } from 'next/navigation';

export default function DesktopNavBar() {
  const { navbarExpand, burgerMenuOpen, handleBurgerOpen } = useHomeContext();
  const pathname = usePathname();

  return (
    <section
      style={{ zIndex: 5 }}
      className={`hidden md:block w-full  top-0 shadow bg-white ${
        pathname === '/' ? 'fixed' : ''
      } ${!navbarExpand ? ' bg-white' : ''}`}
    >
      {pathname === '/' && <LearnMore />}

      <section className={`bg-white w-full `}>
        <nav
          className={`max-w-[1200px] w-full relative container-real bg-white rounded-t-3xl border-solid border-t border-black/10 py-5 flex justify-between items-start border-b ${
            navbarExpand ? 'shifted' : ''
          } ${!navbarExpand ? 'closed' : ''} h-[240px]`}
        >
          <Link href='/' className='flex items-center gap-1'>
            <Image
              src='/airbnb-icon-small.svg'
              width={30}
              height={30}
              priority
              alt='airbnb image'
            />
            <span className='hidden lg:block font-extrabold text-xl text-rose-500 tracking-tight'>
              airbnb
            </span>
          </Link>

          <DesktopAnimatingSearchBar />

          <section className='flex items-center gap-1 z-10 relative'>
            <Link
              className='text-sm font-black/70 py-3 px-4 hover:bg-black/5 rounded-full'
              href='/'
            >
              Airbnb your home
            </Link>
            <button className='py-3 px-4 hover:bg-black/5 rounded-full'>
              <GlobeIcon className='size-5' />
            </button>

            {!isUserSignedIn() ? (
              <div
                onClick={handleBurgerOpen}
                className='flex items-center gap-3 rounded-full border px-4 py-2 icon-shadow relative'
              >
                <HamburgerMenuIcon className='opacity-60' />
                <svg
                  className='size-7 opacity-60'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z' />
                </svg>
                {burgerMenuOpen && <BurgerMenu />}
              </div>
            ) : (
              <div
                onClick={handleBurgerOpen}
                className='flex items-center gap-3 rounded-full border px-4 py-2 icon-shadow relative'
              >
                <HamburgerMenuIcon className='opacity-60' />
                Logged in
                {burgerMenuOpen && <BurgerMenu />}
              </div>
            )}
          </section>
        </nav>
        {pathname === '/' && (
          <div className='flex bg-white items-center container-real pt-2'>
            <SearchCarousel />
            <FilterButton />
          </div>
        )}
      </section>
    </section>
  );
}
