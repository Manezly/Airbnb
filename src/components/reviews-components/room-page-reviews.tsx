import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog';
import WriteReview from '../write-review';

type Review = {
  _id: string;
  rentalId: string;
  user: {
    _id: string;
    fullName: string;
    createdAt: Date;
  };
  comment: string;
  reply?: string;
  ratings: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

type Averages = {
  cleanlinessAvg: number;
  accuracyAvg: number;
  checkInAvg: number;
  communicationAvg: number;
  locationAvg: number;
  valueAvg: number;
};

type RoomPageReviewsProps = {
  reviews: Review[];
  averages: Averages;
  reviewCount: number;
  rentalId: string;
};

export default function RoomPageReviews({
  reviews,
  averages,
  reviewCount,
  rentalId,
}: RoomPageReviewsProps) {
  const totalAvg = (
    (averages?.cleanlinessAvg +
      averages?.accuracyAvg +
      averages?.checkInAvg +
      averages?.communicationAvg +
      averages?.locationAvg +
      averages?.valueAvg) /
    6
  ).toFixed(1);
  return (
    <section>
      {reviewCount > 2 ? (
        <section>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-2xl font-semibold'>
                {`★ ${totalAvg} · ${reviewCount} reviews`}{' '}
              </h2>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Review</Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <WriteReview rentalId={rentalId} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>

          <div className='pt-4 flex items-center justify-between'>
            <div className='flex flex-col px-6'>
              <span className='text-md'>Cleanliness</span>
              <span className='font-bold text-lg'>
                {averages?.cleanlinessAvg}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path d='M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z'></path>
              </svg>
            </div>

            <div className='h-24 w-[1px] bg-black/10' />

            <div className='flex flex-col px-6'>
              <span className='text-md'>Accuracy</span>
              <span className='font-bold text-lg'>{averages?.accuracyAvg}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path d='M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z'></path>
              </svg>
            </div>

            <div className='h-24 w-[1px] bg-black/10' />
            <div className='flex flex-col px-6'>
              <span className='text-md'>Check-in</span>
              <span className='font-bold text-lg'>{averages?.checkInAvg}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path d='M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z'></path>
              </svg>
            </div>

            <div className='h-24 w-[1px] bg-black/10' />
            <div className='flex flex-col px-6'>
              <span className='text-md'>Communication</span>
              <span className='font-bold text-lg'>
                {averages?.communicationAvg}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path
                  fill='none'
                  d='M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z'
                ></path>
              </svg>
            </div>

            <div className='h-24 w-[1px] bg-black/10' />
            <div className='flex flex-col px-6'>
              <span className='text-md'>Location</span>
              <span className='font-bold text-lg'>{averages?.locationAvg}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path d='M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z'></path>
              </svg>
            </div>

            <div className='h-24 w-[1px] bg-black/10' />
            <div className='flex flex-col px-6'>
              <span className='text-md'>Value</span>
              <span className='font-bold text-lg'>{averages?.valueAvg}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='size-8 mt-4'
              >
                <path d='M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
              </svg>
            </div>
          </div>
        </section>
      ) : (
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-semibold'>{reviewCount} reviews</h2>
            <p className='opacity-80 text-sm'>
              Average rating will appear after 3 reviews
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Review</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
              <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                <WriteReview rentalId={rentalId} />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      )}

      <div className='w-full h-[1px] bg-black/10 my-10' />

      <div className='grid grid-cols-2'>
        {reviews?.slice(0, 6).map((review) => (
          <div key={review._id}>
            <div className='flex items-center gap-4 pb-2 pt-6'>
              <span className='bg-black rounded-full text-white size-10 flex justify-center items-center'>
                {review.user.fullName.slice(0, 1)}
              </span>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>
                  Hosted by {review.user.fullName}
                </span>
                <span className='text-sm opacity-70'>
                  Member since {review.user.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4 text-xs'>
              <div className=' w-[3rem]'>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p>{review.createdAt.toLocaleDateString()}</p>
            </div>
            <p className='line-clamp-3 text-sm'>{review.comment}</p>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className='underline pt-2 pb-10'>Show more</button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
          <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
              {reviewCount} reviews
            </h2>
            {reviews?.map((review) => (
              <div key={review._id}>
                <div className='flex items-center gap-4 pb-2 pt-6'>
                  <span className='bg-black rounded-full text-white size-10 flex justify-center items-center'>
                    {review.user.fullName.slice(0, 1)}
                  </span>
                  <div className='flex flex-col'>
                    <span className='text-sm font-semibold'>
                      Hosted by {review.user.fullName}
                    </span>
                    <span className='text-sm opacity-70'>
                      Member since {review.user.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-4 text-xs'>
                  <div className=' w-[3rem]'>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <p>{review.createdAt.toLocaleDateString()}</p>
                </div>
                <p className='line-clamp-3 text-sm'>{review.comment}</p>
              </div>
            ))}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
