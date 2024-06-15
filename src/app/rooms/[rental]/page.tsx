import AuthenticateForm from '@/components/authenticate-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { fetchRentalData } from '@/actions/actions';
import { useParams } from 'next/navigation';

export default async function page({ params }) {
  const { rental } = params;
  const rentalData = await fetchRentalData(rental);

  const guestFavourite = false;

  if (!rentalData) {
    return <p>Rental not found</p>;
  }

  return (
    <main className='container-real max-w-[1200px]'>
      <section className='flex justify-between items-center py-4'>
        <h2 className='text-2xl font-medium'>{rentalData.title}</h2>
        <div className='flex'>
          <button className='opacity-90 flex items-center gap-2 underline rounded-md hover:bg-black/5 p-2'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEgMTN2MTBoLTIxdi0xOWgxMnYyaC0xMHYxNWgxN3YtOGgyem0zLTEyaC0xMC45ODhsNC4wMzUgNC02Ljk3NyA3LjA3IDIuODI4IDIuODI4IDYuOTc3LTcuMDcgNC4xMjUgNC4xNzJ2LTExeiIvPjwvc3ZnPg=='
              width={15}
              height={15}
              alt='share post'
            />
            Share
          </button>
          <button className='opacity-80 flex items-center gap-2 underline rounded-md hover:bg-black/5 p-2'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy4yMzQgMy4wMDRjLTIuNjUyIDAtNS4yMzQgMS44MjktNS4yMzQgNS4xNzcgMCAzLjcyNSA0LjM0NSA3LjcyNyA5LjMwMyAxMi41NC4xOTQuMTg5LjQ0Ni4yODMuNjk3LjI4M3MuNTAzLS4wOTQuNjk3LS4yODNjNC45NzctNC44MzEgOS4zMDMtOC44MTQgOS4zMDMtMTIuNTQgMC0zLjM1My0yLjU4LTUuMTY4LTUuMjI5LTUuMTY4LTEuODM2IDAtMy42NDYuODY2LTQuNzcxIDIuNTU0LTEuMTMtMS42OTYtMi45MzUtMi41NjMtNC43NjYtMi41NjN6bTAgMS41YzEuOTkuMDAxIDMuMjAyIDEuMzUzIDQuMTU1IDIuNy4xNC4xOTguMzY4LjMxNi42MTEuMzE3LjI0MyAwIC40NzEtLjExNy42MTItLjMxNC45NTUtMS4zMzkgMi4xOS0yLjY5NCA0LjE1OS0yLjY5NCAxLjc5NiAwIDMuNzI5IDEuMTQ4IDMuNzI5IDMuNjY4IDAgMi42NzEtMi44ODEgNS42NzMtOC41IDExLjEyNy01LjQ1NC01LjI4NS04LjUtOC4zODktOC41LTExLjEyNyAwLTEuMTI1LjM4OS0yLjA2OSAxLjEyNC0yLjcyNy42NzMtLjYwNCAxLjYyNS0uOTUgMi42MS0uOTV6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4='
              width={15}
              height={15}
              alt='share post'
            />
            Save
          </button>
        </div>
      </section>

      <section className='grid grid-cols-2 gap-4 rounded-2xl'>
        <div className='bg-gray-400 col-span-1 h-full aspect-square'>
          <Image
            src='https://a0.muscache.com/im/pictures/c8c8324d-2799-42f2-a8d1-7bfa0cdff0a1.jpg?im_w=960'
            width={1200}
            height={1200}
            alt='rental image'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='col-span-1'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-gray-400 h-full aspect-square'>
              <Image
                src='https://a0.muscache.com/im/pictures/86c3493e-5018-4e2d-95eb-22104969e7cf.jpg?im_w=720'
                width={1200}
                height={1200}
                alt='rental image'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='bg-gray-400 h-full aspect-square'>
              <Image
                src='https://a0.muscache.com/im/pictures/401703dd-f287-4164-a926-a5d78ef301cf.jpg?im_w=720'
                width={1200}
                height={1200}
                alt='rental image'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='bg-gray-400 h-full aspect-square'>
              <Image
                src='https://a0.muscache.com/im/pictures/aabcc80f-8e74-4922-8e4a-addc493e0631.jpg?im_w=720'
                width={1200}
                height={1200}
                alt='rental image'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='bg-gray-400 h-full aspect-square'>
              <Image
                src='https://a0.muscache.com/im/pictures/bb210a84-dd18-4f57-b187-245f222c6a20.jpg?im_w=720'
                width={1200}
                height={1200}
                alt='rental image'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className='flex relative border-b mb-10'>
        {/* Left side */}
        <div className='w-[60%]'>
          <div className='py-6'>
            <h2 className='text-xl font-semibold'>
              {rentalData.rentalType === 'Single' &&
                `A room in ${rentalData.address.town}, ${rentalData.address.country}`}
              {rentalData.rentalType === 'Entire' &&
                `Entire home in ${rentalData.address.town}, ${rentalData.address.country}`}
              {rentalData.rentalType === 'Shared' &&
                `A shared room in ${rentalData.address.town}, ${rentalData.address.country}`}
            </h2>
            <div className='text-sm font-normal flex gap-1'>
              <span>{rentalData.guests} guests</span>·
              <span>{rentalData.bedrooms} bedrooms</span>·
              <span>{rentalData.beds} beds</span>·
              <span>{rentalData.bathrooms} bathrooms</span>
            </div>
          </div>

          {guestFavourite && (
            <div className='flex gap-4 items-center leading-[1.2rem] p-6 rounded-md border-[1px] border-black/10 w-fit'>
              <div className='flex flex-col text-center'>
                <span>Guest</span>
                <span>favourite</span>
              </div>
              <span className='text-sm'>
                One of the most loved homes on Airbnb,
                <br /> according to guests
              </span>
              <div className='flex flex-col text-center'>
                <span>4.96</span>
                <div>stars</div>
              </div>
              <div className='bg-black h-full w-[10px]'></div>
              <div className='flex flex-col text-center'>
                <span>143</span>
                <span>Reviews</span>
              </div>
            </div>
          )}

          <div className='flex items-center gap-4'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
              width={50}
              height={50}
              alt='profile image'
              className='rounded-full'
            />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>Hosted by Manolis</span>
              <span className='text-sm opacity-70'>
                Superhost · 8 years hosting
              </span>
            </div>
          </div>

          <div className='w-full h-[1px] bg-black/10 my-6' />

          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={50}
                height={50}
                alt='profile image'
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>
                  Dedicated workspace
                </span>
                <span className='text-sm opacity-70'>
                  A commmon area with wifi that's well suited for working
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={50}
                height={50}
                alt='profile image'
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>Self check-in</span>
                <span className='text-sm opacity-70'>
                  Check yourself in with the lockbox
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={50}
                height={50}
                alt='profile image'
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>
                  Free cancellation for 48 hours
                </span>
                <span className='text-sm opacity-70'>
                  Get a full refund if you change your mind
                </span>
              </div>
            </div>
          </div>

          <div className='w-full h-[1px] bg-black/10 my-6' />

          {/* About space*/}
          <div>
            <p className='pb-6 opacity-90'>{rentalData.overview}</p>
            <h4 className='font-bold'>The space</h4>
            <p className='opacity-90 text-ellipsis overflow-hidden truncate'>
              {rentalData.description}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className='underline py-2'>Show more</button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
                    About this space
                  </h2>
                  <p className='pb-6 opacity-90'>{rentalData.overview}</p>
                  <h4 className='font-bold'>The space</h4>
                  <p className='opacity-90 '>{rentalData.description}</p>
                  <h4 className='font-bold'>Guest access</h4>
                  <p>Guests have access to all premises and we welcome pets.</p>
                  <h4 className='font-bold'>Other things to note</h4>
                  <p>
                    There is an open air bbq place and a traditional wood
                    burning oven. You may order and assist in the preparation of
                    a succulent dinner with a selection of the best cretan
                    wines, our own raki and some home made liqueurs –a preorder
                    of 2 days is required, to find the proper ingredients–. If
                    you give us enough time it will be probable to offer a
                    selection of meat or fish with freshly collected in the wild
                    vegetables, depending on the season and weather. And all
                    this at very competitive prices!
                  </p>
                  <h4 className='font-bold'>Registration number</h4>
                  <p>00001759425</p>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>

          <div className='w-full h-[1px] bg-black/10 my-6' />

          {/* Where you'll sleep */}
          <div>
            <div className='py-6'>
              <h3 className='text-xl font-medium'>Where you'll sleep</h3>
            </div>

            <div className='flex gap-4'>
              <div className='flex-1'>
                <Image
                  src='https://a0.muscache.com/im/pictures/11224ec9-9a27-4fc2-acf6-931843c420d7.jpg?im_w=480'
                  width={400}
                  height={400}
                  alt='sleeping location image'
                  className='rounded-xl mb-2 w-full'
                />
                <span className='font-semibold'>Bedroom 1</span>
                <p className='opacity-80 text-sm'>1 queen bed</p>
              </div>
              <div className='flex-1'>
                <Image
                  src='https://a0.muscache.com/im/pictures/11224ec9-9a27-4fc2-acf6-931843c420d7.jpg?im_w=480'
                  width={400}
                  height={400}
                  alt='sleeping location image'
                  className='rounded-xl mb-2 w-full'
                />
                <span className='font-semibold'>Bedroom 1</span>
                <p className='opacity-80 text-sm'>1 queen bed</p>
              </div>
            </div>
          </div>

          <div className='w-full h-[1px] bg-black/10 my-8' />

          {/* What this place offers */}
          <div>
            <h3 className='text-xl font-medium pb-4'>What this place offers</h3>
            <div className='grid grid-cols-2 gap-2'>
              {rentalData.guestFavourites.map((offer: string) => (
                <div className='flex gap-2 items-center'>
                  <Image
                    src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                    width={40}
                    height={40}
                    alt='profile image'
                    className='rounded-full'
                  />
                  <p>{offer}</p>
                </div>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className='font-medium border-[1px] border-black py-[0.7rem] px-4 rounded-lg hover:bg-black/5 my-8'>
                  Show all 32 amenities
                </button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <h2 className='text-2xl tracking-tight pt-4 font-medium'>
                    What this place offers
                  </h2>
                  <h4 className='font-medium py-4'>Bathroom</h4>
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <Image
                        src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                        width={40}
                        height={40}
                        alt='profile image'
                        className='rounded-full'
                      />
                      <p>Bath</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <Image
                        src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                        width={40}
                        height={40}
                        alt='profile image'
                        className='rounded-full'
                      />
                      <p>Hot water</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                  {/* Add more below */}
                </DialogContent>
              </DialogPortal>
            </Dialog>

            {/* Date select and check */}
          </div>
        </div>
        {/* Right side  */}
        <div className='w-[40%] relative h-[full] pl-10 py-6'>
          <div className='sticky top-0 p-6 border-[1px] border-black/10 flex flex-col shadow-lg'>
            <p className=''>
              <span className='font-medium text-xl'>£205 </span>night
            </p>
            <div
              className='h-[6rem] border-[1px] border-black/40 rounded-lg my-4
            '
            >
              date and guests
            </div>
            <button className='font-semibold text-white bg-rose-600 flex-1 py-2 rounded-lg hover:bg-rose-500'>
              Reserve
            </button>
            <p className='opacity-80 text-center py-2 text-sm'>
              You won't be charged yet
            </p>
            <div className='flex justify-between opacity-80'>
              <p className='underline tracking-tight'>£205 x 5 nights</p>
              <p>£1,025</p>
            </div>
            <div className='w-full h-[1px] bg-black/10 my-4' />
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>£1,025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <div>
          <h2 className='text-2xl font-semibold'>1 review</h2>
          <p className='opacity-80 text-sm'>
            Average rating will appear after 3 reviews
          </p>
        </div>

        <div className='grid grid-cols-2'>
          <div>
            <div className='flex items-center gap-4 pb-2 pt-6'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={50}
                height={50}
                alt='profile image'
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>Hosted by Manolis</span>
                <span className='text-sm opacity-70'>
                  Superhost · 8 years hosting
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4 text-xs'>
              <div className=' w-[3rem]'>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p>2 weeks ago</p>
            </div>
            <p className='line-clamp-3 text-sm'>
              The moment I stepped in I fell in love with the place, a great
              host responded to our texts and calls when we were a bit lost at
              midnight. We were welcomed with a wine, desserts and beverages.
              The backyard was mesmerising, transporting to heaven . I would
              recommend 100% a perfect getaway from the busy city life.
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className='underline pt-2 pb-10'>Show more</button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
            <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
              <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
                1 review
              </h2>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </section>

      <div className='w-full h-[1px] bg-black/10 my-6' />

      <section>
        <h2 className='text-xl font-medium'>Where you'll be</h2>
        <p className='py-4 opacity-90'>
          Conwy Principal Area, Wales, United Kingdom
        </p>
        <div className='w-full h-[24rem] border-[1px] border-black rounded-md' />
        <span>
          We verified that this listing's location is accurate. &nbsp;
          <Dialog>
            <DialogTrigger asChild>
              <button className='underline pt-2 pb-10'> Learn more</button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
              <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[36rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                <h2 className='text-2xl tracking-tight pt-2 font-bold'>
                  How listings are verified
                </h2>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>
                    Listings are verified after the Host submits photos or
                    videos to show their place is where they say it is – and
                    they have access to it.
                  </p>
                  <p className='text-sm'>
                    In some cases, a listing can be verified if guest reviews
                    confirm its location, if the Host provides extra documents
                    or if the listing is managed by a company that signs an
                    agreement.
                  </p>
                  <p className='text-sm'>
                    This process has safeguards, but is not a guarantee that
                    every detail on the listing is accurate. &nbsp;
                    <Link href='/' className='underline'>
                      Learn about listing verification
                    </Link>
                  </p>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </span>
      </section>

      <div className='w-full h-[1px] bg-black/10 my-6' />

      {/* Meet your host */}
      <section>
        <h2 className='text-2xl font-semibold'>Meet your host</h2>
        <div className='flex py-4 gap-10'>
          <div className='w-[26rem]'>
            <div className='py-6 px-6 flex flex-1 gap-4 shadow-xl justify-between rounded-2xl border-[1px] border-black/5 items-center'>
              <div className='flex flex-col items-center'>
                <Image
                  src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                  width={100}
                  height={100}
                  alt='profile image'
                  className='rounded-full'
                />
                <p className='text-center text-xl font-bold'>
                  Sykes Holiday Cottages
                </p>
                <p className='text-center text-sm'>Host</p>
              </div>
              <div>
                <div className='flex flex-col items-center'>
                  <span className='font-bold text-lg'>333</span>
                  <span className='text-xs'>Reviews</span>
                </div>
                <div className='w-full h-[1px] bg-black/10 my-2' />
                <div className='flex flex-col items-center'>
                  <span className='font-bold text-lg'>4.68&#9733;</span>
                  <span className='text-xs'>Rating</span>
                </div>
                <div className='w-full h-[1px] bg-black/10 my-2' />
                <div className='flex flex-col items-center'>
                  <span className='font-bold text-lg'>4</span>
                  <span className='text-xs'>Yeas hosting</span>
                </div>
              </div>
            </div>
            <span className='flex gap-2 text-sm items-center py-6'>
              <Image
                src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                width={30}
                height={30}
                alt='profile image'
                className='rounded-full'
              />
              Business
            </span>
            <p className='line-clamp-2 text-sm opacity-90'>
              We’ve been renting holiday properties for more than 25 years and
              look after over 17,000 properties all across the UK, Ireland and
              New Zealand. Whether you’re looking to surf, walk, relax in a hot
              tub or take your furry pal away with you, I’m sure we’ll have
              something perfect for you. We can’t wait to help you all make the
              most of your important time away from home
            </p>
            <Link href='/' className='underline'>
              Show more
            </Link>
          </div>

          <div className='flex-1'>
            <h4 className='text-lg font-medium'>Host details</h4>
            <div className='py-4 opacity-80 text-sm mb-4'>
              <p>Responsive rate: 79%</p>
              <p>Responds within an hour</p>
            </div>
            <Link
              href='/'
              className='text-white py-[.8rem] px-6 font-semibold bg-black rounded-lg'
            >
              Message Host
            </Link>
            <div className='w-full h-[1px] bg-black/10 mt-10 mb-6' />
            <span className='text-xs opacity-90'>
              To protect your payment, never transfer money or communicate
              outside of te Airbnb website or app.
            </span>
          </div>
        </div>
      </section>

      <div className='w-full h-[1px] bg-black/10 my-6' />

      {/* Things to know */}
      <section>
        <h2 className='text-2xl font-semibold pb-4'>Things to know</h2>
        <div className='grid grid-cols-3'>
          <div>
            <h5 className='font-semibold'>House rules</h5>
            <p className='opacity-90 py-[0.3rem]'>
              Check-in after {rentalData.rules.inAfter}
            </p>
            <p className='opacity-90 py-[0.3rem]'>
              Checkout before {rentalData.rules.inBefore}
            </p>
            <p className='opacity-90 py-[0.3rem]'>
              {rentalData.guests} guests maximum
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className='underline py-2'>Show more</button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
                    House rules
                  </h2>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
          <div>
            <h5 className='font-semibold'>Safety & property</h5>
            {rentalData.safetyItems.map((item: string) => (
              <p key={item} className='opacity-90 py-[0.3rem]'>
                {item}
              </p>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className='underline py-2'>Show more</button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
                    Safety & property
                  </h2>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
          <div>
            <h5 className='font-semibold'>Cancellation policy</h5>
            <p className='opacity-90 py-[0.3rem]'>
              This reservation is non-refundable.
            </p>
            <p className='opacity-90 py-[0.3rem]'>
              Review the Host’s full cancellation policy which applies even if
              you cancel for illness or disruptions caused by COVID-19.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className='underline py-2'>Show more</button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
                <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                  <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
                    Cancellation policy
                  </h2>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
        </div>
      </section>

      <div className='w-full h-[1px] bg-black/10 my-6' />
    </main>
  );
}
