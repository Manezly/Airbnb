'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import LearnMore from './learn-more';
import FilterButton from './filter-button';
import SearchCarousel from './search-carousel';
import { useHomeContext } from '@/lib/hooks';

export default function MobileSearchbar() {
  const { navbarExpand } = useHomeContext();
  return (
    <section
      style={{ zIndex: 10 }}
      className={` md:hidden w-full  ${
        !navbarExpand ? ' fixed bg-white top-0' : ''
      }`}
    >
      <LearnMore />
      <section className=' container-real py-4 tracking-tight flex items-center gap-2'>
        <div className='rounded-full border-solid border border-black/5 search-shadow flex-1 whitespace-nowrap'>
          <button className='flex items-center gap-3 border-black w-full h-full py-2 px-4 rounded-full'>
            <MagnifyingGlassIcon className='size-7' />
            <div className=' flex flex-col text-left'>
              <p className='text-sm font-medium'>Where to?</p>
              <p className='text-xs text-black/70'>
                Anywhere - Any week - Add guests
              </p>
            </div>
          </button>
        </div>

        <FilterButton />
      </section>

      <SearchCarousel />
    </section>
  );
}
