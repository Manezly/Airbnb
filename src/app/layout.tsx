import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BottomNav from '@/components/bottom-nav';
import HomeContextProvider from '@/contexts/home-context-provider';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { deleteCookie } from '@/actions/actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AirTnt',
  description: 'Welcome to the recreation of Airbnb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authToken = cookies().get('authToken')?.value;
  // console.log(authToken);

  // const handleDeleteCookie = async () => {
  //   await deleteCookie('authToken');
  //   window.location.reload();
  // };
  return (
    <html lang='en'>
      <body className={inter.className}>
        <HomeContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header
              authToken={authToken}
              // handleDeleteCookie={handleDeleteCookie}
            />
          </Suspense>
          {children}
          <Footer />
          <BottomNav />
        </HomeContextProvider>
      </body>
    </html>
  );
}
