import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import {
  fetchGeocodeCoords,
  fetchRentalData,
  fetchRentalReviews,
} from '@/actions/actions';

import ShareButton from '@/components/share-buttons';
import SaveToWishListButton from '@/components/rental-page-comps/save-to-wishlist-button';
import MakeABooking from '@/components/rental-page-comps/make-a-booking';
import RoomPageReviews from '@/components/reviews-components/room-page-reviews';
import MeetYourHost from '@/components/rental-page-comps/meet-you-host';
import { differenceInYears } from 'date-fns';
import RentalKeyPoints from '@/components/rental-page-comps/rental-key-points';
import RentalAboutSection from '@/components/rental-page-comps/rental-about-section';
import RentalOfferings from '@/components/rental-page-comps/rental-offerings';
import WhereYouWillSleep from '@/components/rental-page-comps/where-you-will-sleep';
import GoogleMapContainer from '@/components/rental-page-comps/google-map-container';
import ThingsToKnow from '@/components/rental-page-comps/things-to-know';

type paramsType = {
  params: {
    rental: string;
  };
};

const defaultAverages = {
  cleanlinessAvg: 0,
  accuracyAvg: 0,
  checkInAvg: 0,
  communicationAvg: 0,
  locationAvg: 0,
  valueAvg: 0,
};

export default async function page({ params }: paramsType) {
  const { rental } = params;
  const { rental: rentalData, user: userData } = await fetchRentalData(rental);
  const firstImage = rentalData.images[1];
  const cutImageArray = rentalData.images.slice(1);

  const rentalId = rentalData._id.toString();
  const { reviews, averages, reviewCount } = await fetchRentalReviews(rentalId);

  const amenitiesLength =
    rentalData.guestFavourites.length + rentalData.standoutAmenities.length;

  const guestFavourite = false;

  const address = [
    rentalData.address.propertyName,
    rentalData.address.street,
    rentalData.address.town,
    rentalData.address.postcode,
    rentalData.address.country,
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  let coords = { lat: 0, lng: 0 };
  try {
    const locationData = await fetchGeocodeCoords(address);
    coords = locationData.results[0].geometry.location;
  } catch (error) {
    console.error('Error fetching geocode coordinates:', error);
  }

  const yearsAsMember = differenceInYears(
    new Date(),
    new Date(userData.createdAt)
  );

  if (!rentalData) {
    return <p>Rental not found</p>;
  }

  return (
    <main className='container-real max-w-[1200px]'>
      <section className='flex justify-between items-center py-4'>
        <h2 className='text-2xl font-medium'>{rentalData.title}</h2>
        <div className='flex'>
          <Dialog>
            <DialogTrigger asChild>
              <button className='opacity-90 flex items-center gap-2 underline rounded-md hover:bg-black/5 p-2'>
                <Image
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEgMTN2MTBoLTIxdi0xOWgxMnYyaC0xMHYxNWgxN3YtOGgyem0zLTEyaC0xMC45ODhsNC4wMzUgNC02Ljk3NyA3LjA3IDIuODI4IDIuODI4IDYuOTc3LTcuMDcgNC4xMjUgNC4xNzJ2LTExeiIvPjwvc3ZnPg=='
                  width={15}
                  height={15}
                  alt='share post'
                />
                Share
              </button>
            </DialogTrigger>
            <ShareButton rentalId={rentalData.id} />
          </Dialog>
          <SaveToWishListButton rentalId={rentalId} />
        </div>
      </section>

      <section className='grid grid-cols-2 gap-4 rounded-2xl'>
        <div className='bg-gray-400 col-span-1 h-full aspect-square'>
          <Image
            src={firstImage}
            width={1200}
            height={1200}
            alt='rental image'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='col-span-1'>
          <div className='grid grid-cols-2 gap-4'>
            {cutImageArray.map((image: string) => (
              <div className='bg-gray-400 h-full aspect-square' key={image}>
                <Image
                  src={image}
                  width={1200}
                  height={1200}
                  alt='rental image'
                  className='h-full w-full object-cover'
                />
              </div>
            ))}
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
            <span className='bg-black rounded-full text-white size-10 flex justify-center items-center'>
              {userData.fullName.slice(0, 1)}
            </span>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold'>
                Hosted by {userData.fullName}
              </span>
              <span className='text-sm opacity-70'>
                {yearsAsMember} years hosting
              </span>
            </div>
          </div>

          <div className='w-full h-[1px] bg-black/10 my-6' />

          <RentalKeyPoints
            guestFavourites={rentalData.guestFavourites}
            fullCancellation={rentalData.cancellation.full}
          />

          <div className='w-full h-[1px] bg-black/10 my-6' />

          <RentalAboutSection
            overview={rentalData.overview}
            description={rentalData.description}
            guestAccess={rentalData.guestAccess}
          />

          <div className='w-full h-[1px] bg-black/10 my-6' />

          <WhereYouWillSleep />

          <div className='w-full h-[1px] bg-black/10 my-8' />

          <RentalOfferings
            guestFavourites={rentalData.guestFavourites}
            amenitiesLength={amenitiesLength}
            standoutAmenities={rentalData.standoutAmenities}
          />
        </div>

        {/* Right side for bookings  */}
        <div className='w-[40%] relative h-[full] pl-10 py-6'>
          <div className='sticky top-0 p-6 border-[1px] border-black/10 flex flex-col shadow-lg'>
            <MakeABooking rates={rentalData.rates} rentalId={rentalId} />
          </div>
        </div>
      </section>
      {/* Reviews */}
      <RoomPageReviews
        reviews={reviews || []}
        averages={averages || defaultAverages}
        reviewCount={reviewCount}
        rentalId={rentalId}
      />

      <div className='w-full h-[1px] bg-black/10 my-6' />

      <GoogleMapContainer address={address} coords={coords} />

      <div className='w-full h-[1px] bg-black/10 my-6' />

      {/* Meet your host */}
      <MeetYourHost userData={userData} rental={rental} />

      <div className='w-full h-[1px] bg-black/10 my-6' />

      {/* Things to know */}
      <ThingsToKnow
        safetyItems={rentalData.safetyItems}
        cancellation={rentalData.cancellation}
        rules={rentalData.rules}
        guests={rentalData.guests}
        guestFavourites={rentalData.guestFavourites}
      />

      <div className='w-full h-[1px] bg-black/10 my-6' />
    </main>
  );
}
