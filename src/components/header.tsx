'use client';

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from '@radix-ui/react-dialog';
import DesktopNavBar from './desktop-navbar';
import MobileSearchbar from './search-bar';
import { useHomeContext } from '@/lib/hooks';
import { Cross1Icon } from '@radix-ui/react-icons';
import AuthenticateForm from './authenticate-form';
import { useEffect, useState } from 'react';
import { countUnreadMessages, fetchUsername } from '@/actions/actions';

export default function Header() {
  const { isLoginOpen, setIsLoginOpen } = useHomeContext();
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const checkMessages = async () => {
      const numberOfMessages = await countUnreadMessages();
      if (numberOfMessages) {
        setUnreadMessages(numberOfMessages.unreadMessageCount);
      }
    };

    const userDetails = async () => {
      const username = await fetchUsername();
      if (username) {
        setUsername(username);
      }
    };

    checkMessages();
    userDetails();
  }, []);
  return (
    <header className='z-60'>
      <MobileSearchbar />
      <DesktopNavBar unreadMessages={unreadMessages} username={username} />

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogPortal>
          <DialogOverlay className='fixed inset-0 bg-black/50 z-50' />
          <DialogContent className='fixed left-[50%] top-[50%] z-50 w-full max-w-[36rem] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-lg'>
            <div className='flex relative justify-center border-b pb-6'>
              <DialogClose asChild>
                <button
                  className='hover:bg-black/5 rounded-full p-2 fixed left-[4%]'
                  onClick={() => setIsLoginOpen(false)}
                >
                  <Cross1Icon />
                </button>
              </DialogClose>
              <p className='font-bold'>Log in or sign</p>
            </div>
            <h2 className='text-2xl font-medium tracking-tight py-[1.4rem]'>
              Welcome to Airbnb
            </h2>
            <AuthenticateForm />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </header>
  );
}
