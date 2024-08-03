export const dynamic = 'force-dynamic';

import { getUserWishlistRentals } from '@/actions/actions';
import CardContainer from '@/components/card-container';

export default async function page() {
  const rentals = await getUserWishlistRentals();
  return (
    <section className='container-real max-w-[1200px] my-10 '>
      <h3 className='text-3xl font-medium md:-mb-[350px]'>Wishlists</h3>
      <CardContainer results={rentals} />
    </section>
  );
}
