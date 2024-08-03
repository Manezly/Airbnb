import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog';

type ThingsToKnowProps = {
  safetyItems: string[];
  cancellation: {
    full: string;
    partial: string;
  };
  rules: {
    inAfter: string;
    inBefore: string;
    pets: string;
    smoking: boolean;
    additional: string;
  };
  guests: string;
  guestFavourites: string[];
};

export default function ThingsToKnow({
  safetyItems,
  cancellation,
  rules,
  guests,
  guestFavourites,
}: ThingsToKnowProps) {
  return (
    <section>
      <h2 className='text-2xl font-semibold pb-4'>Things to know</h2>
      <div className='grid grid-cols-3'>
        <div>
          <h5 className='font-semibold'>House rules</h5>

          <p className='opacity-90 py-[0.3rem]'>
            Check-in after {rules.inAfter}
          </p>
          <p className='opacity-90 py-[0.3rem]'>
            Checkout before {rules.inBefore}
          </p>
          <p className='opacity-90 py-[0.3rem]'>{guests} guests maximum</p>
          <Dialog>
            <DialogTrigger asChild>
              <button className='underline py-2'>Show more</button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
              <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] max-h-[80%] overflow-y-auto transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                <h2 className='text-2xl tracking-tight pt-[1.4rem] font-bold'>
                  House rules
                </h2>
                <p>
                  You&apos;ll be staying in someone&apos;s home, so please treat
                  it with care and respect.
                </p>
                <h4 className='font-medium py-4'>Checking in and out</h4>
                <div className=''>
                  <div className='flex gap-4 items-center '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      className='w-[1.6rem]'
                    >
                      <path d='M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z'></path>
                    </svg>
                    <p>Check-in after {rules.inAfter}</p>
                  </div>
                  <div className='w-full h-[1px] bg-black/10 my-2' />
                </div>
                <div className=''>
                  <div className='flex gap-4 items-center '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      className='w-[1.6rem]'
                    >
                      <path d='M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z'></path>
                    </svg>
                    <p>Check-in before {rules.inBefore}</p>
                  </div>
                  <div className='w-full h-[1px] bg-black/10 my-2' />
                </div>
                {guestFavourites.includes('Self check-in') && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z'></path>
                      </svg>
                      <p>Self check-in</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}

                <h4 className='font-medium py-4'>During your stay</h4>
                <div className=''>
                  <div className='flex gap-4 items-center '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      className='w-[1.6rem]'
                    >
                      <path d='M22 5a6 6 0 0 1 3.64 10.77A9 9 0 0 1 31 23.74V24h-2a7 7 0 0 0-6-6.93v-2.2A4 4 0 0 0 22 7a4 4 0 0 0-3.68 5.57A5 5 0 0 1 21 17a4.99 4.99 0 0 1-1.6 3.67 9 9 0 0 1 5.6 8.06V29h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24a7 7 0 0 0-6 6.69V29H7a9 9 0 0 1 5.6-8.34 5 5 0 0 1 1.08-8.09A4 4 0 1 0 9 14.87v2.2a7 7 0 0 0-6 6.69V24H1a9 9 0 0 1 5.36-8.23A6 6 0 1 1 15.92 10h.16A6 6 0 0 1 22 5z'></path>
                    </svg>
                    <p>{guests} guests maximum</p>
                  </div>
                  <div className='w-full h-[1px] bg-black/10 my-2' />
                </div>
                {rules.pets && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'></path>
                      </svg>
                      <p>Pets allowed</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {rules.smoking === false && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='m3.7 2.3 26 26-1.4 1.4-26-26zM14.77 19l2 2H3v4h17.76l2 2H3a2 2 0 0 1-2-1.85V21a2 2 0 0 1 1.85-2H3zM30 19v6.76l-2-2V19zm-4 0v2.76L23.24 19zM21 3a4 4 0 0 1 3.36 6.18l-.1.14.13.04a8 8 0 0 1 5.6 7.4L30 17h-2a6 6 0 0 0-5.78-6H21V9a2 2 0 0 0 .15-4H21zm1 10a4 4 0 0 1 4 3.8v.2h-2a2 2 0 0 0-1.85-2H19.24l-2-2zM17 3v2a4 4 0 0 0-4 3.76l-1.68-1.69A6 6 0 0 1 16.78 3z'></path>
                      </svg>
                      <p>No smoking</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {rules.additional && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M16 1a4 4 0 0 1 3.81 2.8l.06.2h3.46A3.67 3.67 0 0 1 27 7.47l.01.2v19.66A3.67 3.67 0 0 1 23.53 31l-.2.01H8.67A3.67 3.67 0 0 1 5 27.53l-.01-.2V7.67A3.67 3.67 0 0 1 8.47 4l.2-.01h3.46l.04-.16a4 4 0 0 1 3.42-2.82L15.8 1zM9 6h-.33c-.88 0-1.6.67-1.66 1.52L7 7.67v19.66c0 .88.67 1.6 1.52 1.66l.15.01h14.66c.88 0 1.6-.67 1.66-1.52l.01-.15V7.67c0-.88-.67-1.6-1.52-1.66L23.33 6H23v5H9zm1 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm8 0v2h-6v-2zm-8-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm10 0v2h-8v-2zM16 3a2 2 0 0 0-2 1.85V6h-3v3h10V6h-2.97L18 4.88A2 2 0 0 0 16 3zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                      </svg>
                      <p>Additional rules</p>
                    </div>
                    <div className='pl-[2.6rem] opacity-80'>
                      {rules.additional}
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
        <div>
          <h5 className='font-semibold'>Safety & property</h5>
          {safetyItems.map((item: string) => (
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
              <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[50rem] max-h-[80%] overflow-y-auto transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                <h2 className='text-2xl tracking-tight pt-[1.4rem] font-bold'>
                  Safety & property
                </h2>
                <p>
                  You&apos;ll be staying in someone&apos;s home, so please treat
                  it with care and respect.
                </p>
                <h4 className='font-medium py-4'>Safety devices</h4>
                {safetyItems.includes('Smoke alarm') && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm-4.9 14a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17zm9.8 0h2.03A7 7 0 0 1 17 22.93V20.9a5 5 0 0 0 3.9-3.9zM16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1-5.93A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9zm-2 0v2.03a5 5 0 0 0-3.9 3.9H9.07A7 7 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                      </svg>
                      <p>Smoke alarm installed</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {safetyItems.includes('First aid kit') && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm-4.9 14a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17zm9.8 0h2.03A7 7 0 0 1 17 22.93V20.9a5 5 0 0 0 3.9-3.9zM16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1-5.93A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9zm-2 0v2.03a5 5 0 0 0-3.9 3.9H9.07A7 7 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                      </svg>
                      <p>First aid kit</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {safetyItems.includes('Fire extinguisher') && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm-4.9 14a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17zm9.8 0h2.03A7 7 0 0 1 17 22.93V20.9a5 5 0 0 0 3.9-3.9zM16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1-5.93A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9zm-2 0v2.03a5 5 0 0 0-3.9 3.9H9.07A7 7 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                      </svg>
                      <p>Fire extinguisher</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {safetyItems.includes('Carbon monoxide alarm') && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        className='w-[1.6rem]'
                      >
                        <path d='M25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-4.78 5H7a5 5 0 0 1-5-4.78V7a5 5 0 0 1 4.78-5H7zm0 2H7a3 3 0 0 0-3 2.82V25a3 3 0 0 0 2.82 3H25a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17zm9.8 0h2.03A7 7 0 0 1 17 22.93V20.9a5 5 0 0 0 3.9-3.9zM16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1-5.93A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9zm-2 0v2.03a5 5 0 0 0-3.9 3.9H9.07A7 7 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                      </svg>
                      <p>Carbon monoxide alarm</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
        <div>
          <h5 className='font-semibold'>Cancellation policy</h5>
          {cancellation.full ? (
            <p className='opacity-90 py-[0.3rem]'>
              Free cancellation {cancellation.full} days before booking.
            </p>
          ) : cancellation.partial ? (
            <p className='opacity-90 py-[0.3rem]'>
              Partial cancellation {cancellation.partial} days before booking.
            </p>
          ) : (
            <p className='opacity-90 py-[0.3rem]'>
              This reservation is non-refundable.
            </p>
          )}
          <p className='opacity-90 py-[0.3rem]'>
            Review the Host&apos;s full cancellation policy which applies even
            if you cancel for illness or disruptions caused by COVID-19.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className='underline py-2'>Show more</button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
              <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[40rem] max-h-[80%] overflow-y-auto transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
                <h2 className='text-2xl tracking-tight pt-[1.4rem] font-bold'>
                  Cancellation policy
                </h2>
                <p>
                  Make sure you&apos;re comfortable with this Host&apos;s
                  policy. In rare cases, you may be eligible for a refund
                  outside of this policy under Airbnb&apos;s Major Disruptive
                  Events Policy.
                </p>
                <h4 className='font-medium py-4'>Refund polcies</h4>
                {cancellation.full && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <p className='font-bold'>Full refund</p>
                      <p>
                        Free cancellation {cancellation.full} days before
                        booking.
                      </p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {cancellation.partial && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <p className='font-bold'>Partial refund</p>
                      <p>
                        Partial cancellation {cancellation.partial} days before
                        booking.
                      </p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
                {!cancellation.full && !cancellation.partial && (
                  <div className=''>
                    <div className='flex gap-4 items-center '>
                      <p>This reservation is non-refundable.</p>
                    </div>
                    <div className='w-full h-[1px] bg-black/10 my-2' />
                  </div>
                )}
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
