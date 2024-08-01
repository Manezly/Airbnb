import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog';

type RentalAboutSectionProps = {
  overview: string;
  description: string;
  guestAccess: string[];
};

export default function RentalAboutSection({
  overview,
  description,
  guestAccess,
}: RentalAboutSectionProps) {
  return (
    <div>
      <p className='pb-6 opacity-90'>{overview}</p>
      <h4 className='font-bold'>The space</h4>
      <p className='opacity-90 text-ellipsis overflow-hidden truncate'>
        {description}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <button className='underline py-2'>Show more</button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
          <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] max-h-[80%] overflow-y-auto transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='text-2xl tracking-tight py-[1.4rem] font-bold'>
              About this space
            </h2>
            <p className='pb-6 opacity-90'>{overview}</p>
            <h4 className='font-bold'>The space</h4>
            <p className='opacity-90 '>{description}</p>
            {guestAccess && (
              <>
                <h4 className='font-bold'>Guest access</h4>
                <p>{guestAccess}</p>
              </>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
