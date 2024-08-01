import GoogleMap from '@/components/google-map';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '../ui/dialog';
import Link from 'next/link';

type GoogleMapContainer = {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
};

export default function GoogleMapContainer({
  address,
  coords,
}: GoogleMapContainer) {
  console.log(coords);
  return (
    <section>
      <h2 className='text-xl font-medium'>Where you'll be</h2>
      <p className='py-4 opacity-90'>{address}</p>
      <GoogleMap coords={coords} />
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
                  Listings are verified after the Host submits photos or videos
                  to show their place is where they say it is – and they have
                  access to it.
                </p>
                <p className='text-sm'>
                  In some cases, a listing can be verified if guest reviews
                  confirm its location, if the Host provides extra documents or
                  if the listing is managed by a company that signs an
                  agreement.
                </p>
                <p className='text-sm'>
                  This process has safeguards, but is not a guarantee that every
                  detail on the listing is accurate. &nbsp;
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
  );
}
