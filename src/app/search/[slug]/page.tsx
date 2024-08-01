// import { fetchRentalBySearch } from '@/actions/actions';
// import CardContainer from '@/components/card-container';
// import PaginationController from '@/components/pagination-controller';

// type SearchPageParams = {
//   params: {
//     slug: string;
//   };
//   searchParams: {
//     page: number;
//   };
// };

// export default async function page({ params, searchParams }: SearchPageParams) {
//   const searchBase = params.slug;
//   const page = searchParams.page || 1;
//   const { rentals, numberOfPages } = await fetchRentalBySearch(
//     params.slug,
//     page
//   );

//   // console.log('newnewnewnenwe');
//   // console.log(numberOfPages);
//   return (
//     <>
//       {/* <section>{results}</section> */}
//       <CardContainer results={rentals} />
//       <PaginationController
//         currentPage={page}
//         numberOfPages={numberOfPages}
//         searchParam={searchBase}
//       />
//     </>
//   );
// }
