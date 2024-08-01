import { fetchUserListings } from '@/actions/actions';
import CardContainer from '@/components/card-container';

export default async function page() {
  const userListings = await fetchUserListings();
  // console.log(userListings);
  return (
    <section className='container-real max-w-[1200px]'>
      <h3 className='text-2xl font-semibold mt-10 -mb-[20rem]'>
        Your listings
      </h3>
      <CardContainer results={userListings} />
    </section>
  );
}
