import { getUserWishlistRentals } from '@/actions/actions';
import CardContainer from '@/components/card-container';
import MakeABooking from '@/components/rental-page-comps/make-a-booking';

export default async function page() {
  const rentals = await getUserWishlistRentals();
  return (
    <section className='container-real max-w-[1200px] my-10 '>
      <h3 className='text-3xl font-medium -mb-[350px]'>Wishlists</h3>
      <CardContainer results={rentals} />
    </section>
  );
}
