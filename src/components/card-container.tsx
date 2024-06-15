import Image from 'next/image';
import Link from 'next/link';

export default function CardContainer() {
  return (
    <main className='container-real mt-[400px] flex justify-center'>
      <section className='card-container'>
        <Link href='/room' className='card'>
          <Image
            src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=960&im_q=highq'
            width={500}
            height={500}
            priority
            alt='card image'
            className='rounded-3xl aspect-square h-full'
          />
          <p className='font-bold text-sm tracking-tight pt-2'>
            Train at the X-Mansion
          </p>
          <p className='text-sm opacity-80 tracking-tight'>Hosted by Jubilee</p>
          <p className='text-sm tracking-tight'>
            <span className='font-bold '>£30</span> per guest
          </p>
        </Link>
        <Link href='/room' className='card'>
          <Image
            src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=960&im_q=highq'
            width={500}
            height={500}
            priority
            alt='card image'
            className='rounded-3xl aspect-square h-full'
          />
          <p className='font-bold text-sm tracking-tight pt-2'>
            Train at the X-Mansion
          </p>
          <p className='text-sm opacity-80 tracking-tight'>Hosted by Jubilee</p>
          <p className='text-sm tracking-tight'>
            <span className='font-bold '>£30</span> per guest
          </p>
        </Link>
        <Link href='/room' className='card'>
          <Image
            src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=960&im_q=highq'
            width={500}
            height={500}
            priority
            alt='card image'
            className='rounded-3xl aspect-square h-full'
          />
          <p className='font-bold text-sm tracking-tight pt-2'>
            Train at the X-Mansion
          </p>
          <p className='text-sm opacity-80 tracking-tight'>Hosted by Jubilee</p>
          <p className='text-sm tracking-tight'>
            <span className='font-bold '>£30</span> per guest
          </p>
        </Link>
        <Link href='/room' className='card'>
          <Image
            src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=960&im_q=highq'
            width={500}
            height={500}
            priority
            alt='card image'
            className='rounded-3xl aspect-square h-full'
          />
          <p className='font-bold text-sm tracking-tight pt-2'>
            Train at the X-Mansion
          </p>
          <p className='text-sm opacity-80 tracking-tight'>Hosted by Jubilee</p>
          <p className='text-sm tracking-tight'>
            <span className='font-bold '>£30</span> per guest
          </p>
        </Link>
      </section>
    </main>
  );
}
