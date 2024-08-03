import Image from 'next/image';
import React from 'react';

export default function WhereYouWillSleep() {
  return (
    <div>
      <div className='py-6'>
        <h3 className='text-xl font-medium'>Where you&apos;ll sleep</h3>
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
  );
}
