'use client';

import { DialogContent, DialogOverlay, DialogPortal } from './ui/dialog';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

type BookmarksProps = {
  rentalId: string;
};

export default function ShareButton({ rentalId }: BookmarksProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/rooms/${rentalId}`;
  return (
    <DialogPortal>
      <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
      <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[34rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
        <h4 className='font-semibold text-2xl'>Share this place</h4>
        <section className='flex-wrap flex gap-2'>
          <div className='w-[48%] px-4 py-2 border-black/10 border-[1px] rounded-md'>
            <EmailShareButton
              url={shareUrl}
              className='w-[100%] flex items-center justify-center relative'
            >
              <EmailIcon size={30} round={true} className='absolute left-1' />
              Facebook
            </EmailShareButton>
          </div>
          <div className='w-[48%] px-4 py-2 border-black/10 border-[1px] rounded-md'>
            <FacebookShareButton
              url={shareUrl}
              className='w-[100%] flex items-center justify-center relative'
            >
              <FacebookIcon
                size={30}
                round={true}
                className='absolute left-1'
              />
              Facebook
            </FacebookShareButton>
          </div>

          {/* No Facebook Developer App ID */}
          {/* <div className='w-[48%] px-4 py-2 border-black/10 border-[1px] rounded-md'>
            <FacebookMessengerShareButton
              url={shareUrl}
              className='w-[100%] flex items-center justify-center relative'
            >
              <FacebookMessengerIcon
                size={30}
                round={true}
                className='absolute left-1'
              />
              Messenger
            </FacebookMessengerShareButton>
          </div> */}

          <div className='w-[48%] px-4 py-2 border-black/10 border-[1px] rounded-md'>
            <WhatsappShareButton
              url={shareUrl}
              className='w-[100%] flex items-center justify-center relative'
            >
              <WhatsappIcon
                size={30}
                round={true}
                className='absolute left-1'
              />
              Whatsapp
            </WhatsappShareButton>
          </div>
          <div className='w-[48%] px-4 py-2 border-black/10 border-[1px] rounded-md'>
            <TwitterShareButton
              url={shareUrl}
              className='w-[100%] flex items-center justify-center relative'
            >
              <TwitterIcon size={30} round={true} className='absolute left-1' />
              Twitter
            </TwitterShareButton>
          </div>
        </section>
      </DialogContent>
    </DialogPortal>
  );
}
