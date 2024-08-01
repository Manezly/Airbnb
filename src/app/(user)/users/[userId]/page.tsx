import { fetchReviewsAndRentalByHostId } from '@/actions/actions';
import CardContainer from '@/components/card-container';
import { TRental } from '@/lib/types';
import { differenceInYears } from 'date-fns';

type PageParamProps = {
  params: {
    userId: string;
  };
};

type Review = {
  _id: string;
  rentalId: string;
  user: string;
  fullName: string;
  comment: string;
  createdAt: Date;
  ratings: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
};

type User = {
  _id: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  image?: string;
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
};

type FetchResponse = {
  user: User;
  rentals: TRental[];
  reviews: Review[];
};

export default async function page({ params }: PageParamProps) {
  const { userId } = params;
  const data: FetchResponse | undefined = await fetchReviewsAndRentalByHostId(
    userId
  );

  if (!data) {
    // Handle the case where data is not fetched
    return <div>Error fetching data</div>;
  }

  const { user, rentals, reviews } = data;

  const yearsAsMember = differenceInYears(new Date(), new Date(user.createdAt));

  return (
    <section className='container-real max-w-[1200px] mt-6 flex'>
      {/* Left */}
      <section className='w-[20rem]'>
        <div className='py-6 px-6 flex flex-1 gap-4 shadow-xl justify-between rounded-2xl border-[1px] border-black/5 items-center mb-2'>
          <div className='flex flex-col items-center flex-1 gap-1'>
            <span className='bg-black rounded-full text-white size-20 flex justify-center items-center'>
              {user.fullName.slice(0, 1)}
            </span>
            <p className='text-center text-xl font-bold'>{user.fullName}</p>
            <p className='text-center text-sm'>Host</p>
          </div>
          <div>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-lg'>{reviews.length}</span>
              <span className='text-xs'>Reviews</span>
            </div>
            <div className='w-full h-[1px] bg-black/10 my-2' />
            <div className='flex flex-col items-center'>
              <span className='font-bold text-lg'>5&#9733;</span>
              <span className='text-xs'>Rating</span>
            </div>
            <div className='w-full h-[1px] bg-black/10 my-2' />
            <div className='flex flex-col items-center'>
              <span className='font-bold text-lg'>{yearsAsMember}</span>

              <span className='text-xs'>Years hosting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right */}
      <section className='px-10 flex-1'>
        {/* About */}
        <div>
          <h4 className='text-3xl font-bold mb-4'>About {user.fullName}</h4>
        </div>

        {/* Reviews */}
        <div>
          <h4 className='text-xl font-bold mb-4'>{user.fullName}'s reviews</h4>
          <div className='grid grid-cols-2 gap-2 mb-6'>
            {reviews?.slice(0, 6).map((review) => (
              <div key={review._id} className='border-[1px] rounded-xl p-4'>
                <div className='flex items-center gap-4'>
                  <span className='bg-black rounded-full text-white size-10 flex justify-center items-center'>
                    {review.fullName.slice(0, 1)}
                  </span>
                  <div className='flex flex-col'>
                    <span className='text-sm font-semibold'>
                      Hosted by {review.fullName}
                    </span>
                    <span className='text-sm opacity-70'>
                      Member since {review.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-4 text-xs'>
                  <div className=' w-[3rem]'>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <p>{review.createdAt.toLocaleDateString()}</p>
                </div>
                <p className='line-clamp-3 text-sm mt-2'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div>
          <h4 className='text-xl font-bold -mb-[23rem]'>
            {user.fullName}'s listings
          </h4>
          <CardContainer results={rentals} />
        </div>
      </section>
    </section>
  );
}
