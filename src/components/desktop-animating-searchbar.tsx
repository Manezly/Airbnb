import { useHomeContext } from '@/lib/hooks';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function DesktopAnimatingSearchBar() {
  const {
    setStaysOpen,
    setExperiencesOpen,
    staysOpen,
    experiencesOpen,
    navbarExpand,
    setNavbarExpand,
  } = useHomeContext();

  return (
    <section
      className={`grow-searchbar absolute -translate-x-1/2 left-[280px] top-[-5px] lg:left-1/2 flex flex-col gap-6 ${
        navbarExpand ? 'shifted' : ''
      }`}
    >
      <div className='heading-buttons flex justify-center gap-5'>
        <button
          className={staysOpen ? 'font-bold' : ''}
          onClick={() => {
            setStaysOpen(true);
            setExperiencesOpen(false);
          }}
        >
          Stays
        </button>
        <button
          className={experiencesOpen ? 'font-bold' : ''}
          onClick={() => {
            setStaysOpen(false);
            setExperiencesOpen(true);
          }}
        >
          Experiences
        </button>
        <Link href='/'>Online Experiences</Link>
      </div>

      <div className='bar rounded-full border-solid border border-black/10 search-shadow'>
        <div
          onClick={() => setNavbarExpand(true)}
          className='flex items-center gap-3 border-black w-full h-full rounded-full text-sm'
        >
          <div className='small-text hidden'>
            <span className='pl-5 border-r pr-3'>Anywhere</span>
            <span className='pl-5 border-r pr-3'>Any week</span>
            <span className='pl-5 opacity-70'>Add guests</span>
          </div>
          {staysOpen && (
            <div className='large-buttons flex text-xs h-full w-full items-center'>
              <button className='flex flex-col pl-8 pr-20  rounded-full hover:bg-black/5 justify-center h-full'>
                <span className='font-medium'>Where</span>
                <span className='opacity-80'>Search destinations</span>
              </button>
              <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
              <button className='flex flex-col pl-6 pr-7 justify-center rounded-full hover:bg-black/5 h-full'>
                <span className='font-medium'>Check in</span>
                <span className='opacity-80'>Add dates</span>
              </button>
              <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
              <button className='flex flex-col  pl-6 pr-7  justify-center rounded-full hover:bg-black/5 h-full'>
                <span className='font-medium'>Check out</span>
                <span className='opacity-80'>Add dates</span>
              </button>
              <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
              <button className='flex flex-col pl-6 justify-center rounded-full hover:bg-black/5 pr-auto flex-1 h-full'>
                <span className='font-medium'>Who</span>
                <span className='opacity-80'>Add guests</span>
              </button>
            </div>
          )}
          {experiencesOpen && (
            <div className='large-buttons flex text-xs h-full w-full items-center'>
              <button className='flex flex-col pl-8 pr-auto  rounded-full hover:bg-black/5 justify-center h-full flex-1'>
                <span className='font-medium'>Where</span>
                <span className='opacity-80'>Search destinations</span>
              </button>
              <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
              <button className='flex flex-col pl-6 pr-auto justify-center rounded-full hover:bg-black/5 h-full flex-1'>
                <span className='font-medium'>Date</span>
                <span className='opacity-80'>Add dates</span>
              </button>
              <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
              <button className='flex flex-col pl-6 justify-center rounded-full hover:bg-black/5 pr-auto flex-1 h-full'>
                <span className='font-medium'>Who</span>
                <span className='opacity-80'>Add guests</span>
              </button>
            </div>
          )}
          <div className='magnifine-button bg-rose-500 p-3 rounded-full absolute right-[2%]'>
            <MagnifyingGlassIcon className='size-6 filter brightness-0 invert' />
          </div>
        </div>
      </div>
    </section>
  );
}
