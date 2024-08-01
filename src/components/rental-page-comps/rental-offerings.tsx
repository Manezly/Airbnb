import Image from 'next/image';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog';

type RentalOfferingsProps = {
  guestFavourites: string[];
  amenitiesLength: number;
  standoutAmenities: string[];
};

export default function RentalOfferings({
  guestFavourites,
  amenitiesLength,
  standoutAmenities,
}: RentalOfferingsProps) {
  return (
    <div>
      <h3 className='text-xl font-medium pb-4'>What this place offers</h3>
      <div className='grid grid-cols-2 gap-2'>
        {guestFavourites.map((offer: string) => (
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
            Show all {amenitiesLength} amenities
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
          <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] max-h-[80%] overflow-y-auto transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='text-2xl tracking-tight pt-4 font-medium'>
              What this place offers
            </h2>
            <h4 className='font-medium py-4'>Standout Amenities</h4>
            {standoutAmenities.map((amenity: string) => (
              <div className='' key={amenity}>
                <div className='flex gap-4 items-center '>
                  <Image
                    src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                    width={40}
                    height={40}
                    alt='profile image'
                    className='rounded-full'
                  />
                  <p>{amenity}</p>
                </div>
                <div className='w-full h-[1px] bg-black/10 my-2' />
              </div>
            ))}
            <h4 className='font-medium py-4'>Guest Favourite Amenities</h4>
            {guestFavourites.map((amenity: string) => (
              <div className='' key={amenity}>
                <div className='flex gap-4 items-center '>
                  <Image
                    src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMS45OTgiIGN5PSIxMS45OTgiIGZpbGwtcnVsZT0ibm9uemVybyIgcj0iOS45OTgiLz48L3N2Zz4='
                    width={40}
                    height={40}
                    alt='profile image'
                    className='rounded-full'
                  />
                  <p>{amenity}</p>
                </div>
                <div className='w-full h-[1px] bg-black/10 my-2' />
              </div>
            ))}
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Date select and check */}
    </div>
  );
}
