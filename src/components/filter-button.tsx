export default function FilterButton() {
  return (
    <button className='flex items-center justify-center border-black/30 border rounded-full p-2 md:gap-1 md:rounded-xl md:border-black/10 md:py-3 md:px-4'>
      <svg
        className='size-5'
        clipRule='evenodd'
        fillRule='evenodd'
        strokeLinejoin='round'
        strokeMiterlimit='2'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='m15.344 17.778c0-.414-.336-.75-.75-.75h-5.16c-.414 0-.75.336-.75.75s.336.75.75.75h5.16c.414 0 .75-.336.75-.75zm2.206-4c0-.414-.336-.75-.75-.75h-9.596c-.414 0-.75.336-.75.75s.336.75.75.75h9.596c.414 0 .75-.336.75-.75zm2.45-4c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75zm2-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z'
          fillRule='nonzero'
        />
      </svg>
      <span className='hidden md:block text-xs font-medium'>Filters</span>
    </button>
  );
}
