// export const dynamic = 'force-dynamic';

// import { fetchAllRentals } from '@/actions/actions';
// import CardContainer from '@/components/card-container';
// import PaginationController from '@/components/pagination-controller';
// import { URLSearchParams } from 'url';

// type SearchParamProps = {
//   searchParams: {
//     page: number;
//     [key: string]: any;
//   };
// };

// export default async function Home({ searchParams }: SearchParamProps) {
//   const page = searchParams.page || 1;

//   // Parse the search parameters
//   const filters = parseSearchParams(new URLSearchParams(searchParams));

//   const { rentals, numberOfPages } = await fetchAllRentals(filters, page);

//   // console.log(filters);

//   return (
//     <>
//       <CardContainer results={rentals} />
//       <PaginationController numberOfPages={numberOfPages} />
//       hope
//     </>
//   );
// }

// const parseSearchParams = (
//   searchParams: URLSearchParams
// ): { [key: string]: any } => {
//   const filters: { [key: string]: any } = {};

//   searchParams.forEach((value, key) => {
//     if (
//       key === 'guestFavourites' ||
//       key === 'standoutAmenities' ||
//       key === 'safetyItems'
//     ) {
//       filters[key] = value.split(',');
//     } else {
//       filters[key] = value;
//     }
//   });

//   return filters;
// };

// export const dynamic = 'force-dynamic';

// import { fetchAllRentals } from '@/actions/actions';
// import CardContainer from '@/components/card-container';
// import PaginationController from '@/components/pagination-controller';
// import { withTimeout } from '@/lib/utils';
// import { URLSearchParams } from 'url';

// type SearchParamProps = {
//   searchParams: {
//     page: number;
//     [key: string]: any;
//   };
// };

// const timeoutDuration = process.env.NEXT_PUBLIC_REQUEST_TIMEOUT
//   ? parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT, 10)
//   : undefined;

// const fetchAllRentalsWithTimeout = withTimeout(
//   fetchAllRentals,
//   timeoutDuration
// );

// export default async function Home({ searchParams }: SearchParamProps) {
//   const page = searchParams.page || 1;

//   // Parse the search parameters
//   const filters = parseSearchParams(new URLSearchParams(searchParams));

//   try {
//     const { rentals, numberOfPages } = await fetchAllRentalsWithTimeout(
//       filters,
//       page
//     );

//     // console.log(filters);

//     return (
//       <>
//         <CardContainer results={rentals} />
//         <PaginationController numberOfPages={numberOfPages} />
//       </>
//     );
//   } catch (error) {
//     console.error('Error fetching rentals:', error);
//     // You can return an error component or message here if you want to
//     return <p>Failed to fetch rentals. Please try again later.</p>;
//   }
// }

// const parseSearchParams = (
//   searchParams: URLSearchParams
// ): { [key: string]: any } => {
//   const filters: { [key: string]: any } = {};

//   searchParams.forEach((value, key) => {
//     if (
//       key === 'guestFavourites' ||
//       key === 'standoutAmenities' ||
//       key === 'safetyItems'
//     ) {
//       filters[key] = value.split(',');
//     } else {
//       filters[key] = value;
//     }
//   });

//   return filters;
// };

'use client';

import { fetchAllRentals } from '@/actions/actions';
import CardContainer from '@/components/card-container';
import PaginationController from '@/components/pagination-controller';
import { useEffect, useState } from 'react';

type SearchParamProps = {
  searchParams: {
    page: number;
    [key: string]: any;
  };
};

const parseSearchParams = (searchParams: {
  [key: string]: any;
}): { [key: string]: any } => {
  const filters: { [key: string]: any } = {};

  Object.entries(searchParams).forEach(([key, value]) => {
    if (
      typeof value === 'string' &&
      (key === 'guestFavourites' ||
        key === 'standoutAmenities' ||
        key === 'safetyItems')
    ) {
      filters[key] = value.split(',');
    } else {
      filters[key] = value;
    }
  });

  return filters;
};

export default function Home({ searchParams }: SearchParamProps) {
  const [rentals, setRentals] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(searchParams.page || 1);

  // Parse the search parameters
  useEffect(() => {
    const fetchRentals = async () => {
      const filters = parseSearchParams(searchParams);
      const { rentals, numberOfPages } = await fetchAllRentals(filters, page);
      setRentals(rentals);
      setNumberOfPages(numberOfPages);
    };

    fetchRentals();
  }, [searchParams, page]);

  // console.log(filters);

  return (
    <>
      <CardContainer results={rentals} />
      <PaginationController numberOfPages={numberOfPages} />
    </>
  );
}
