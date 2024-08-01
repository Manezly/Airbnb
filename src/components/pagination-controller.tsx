// 'use client';

// import Link from 'next/link';

// type PaginationControllerProps = {
//   currentPage: number;
//   numberOfPages: number;
//   searchParam: string | null;
// };

// export default function PaginationController({
//   currentPage,
//   numberOfPages,
//   searchParam,
// }: PaginationControllerProps) {
//   console.log('deez params', searchParam);
//   const prevPage = +currentPage > 1 ? +currentPage - 1 : 1;
//   const nextPage = +currentPage + 1;
//   const baseSearch = searchParam ? `/search/${searchParam}` : '';
//   return (
//     <section className='container-real mt-12 flex space-x-2'>
//       <Link
//         className={`${+currentPage === 1 ? 'pointer-events-none' : ''}`}
//         href={`${baseSearch}/?page=${prevPage}`}
//       >
//         <button
//           className={`rounded-md border-black p-2 border-[1px] ${
//             +currentPage === 1 ? ' opacity-50' : 'hover:bg-black/5'
//           }`}
//         >
//           Prev
//         </button>
//       </Link>
//       <Link
//         className={`${
//           +currentPage === numberOfPages ? 'pointer-events-none' : ''
//         }`}
//         href={`${baseSearch}/?page=${nextPage}`}
//       >
//         <button
//           className={`rounded-md border-black p-2 border-[1px] ${
//             +currentPage === numberOfPages ? ' opacity-50' : 'hover:bg-black/5'
//           }`}
//         >
//           Next
//         </button>
//       </Link>
//     </section>
//   );
// }

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type PaginationControllerProps = {
  numberOfPages: number;
};

export default function PaginationController({
  numberOfPages,
}: PaginationControllerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage =
    currentPage < numberOfPages ? currentPage + 1 : numberOfPages;

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className='container-real mt-12 flex space-x-2'>
      <button
        className={`rounded-md border-black p-2 border-[1px] ${
          currentPage === 1
            ? 'opacity-50 pointer-events-none'
            : 'hover:bg-black/5'
        }`}
        onClick={() => updatePage(prevPage)}
      >
        Prev
      </button>
      <button
        className={`rounded-md border-black p-2 border-[1px] ${
          currentPage === numberOfPages
            ? 'opacity-50 pointer-events-none'
            : 'hover:bg-black/5'
        }`}
        onClick={() => updatePage(nextPage)}
      >
        Next
      </button>
    </section>
  );
}
