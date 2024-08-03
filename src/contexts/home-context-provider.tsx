'use client';

import { createContext, useEffect, useState } from 'react';

type THomeContextProvider = {
  children: React.ReactNode;
};

type HomeContext = {
  bottomNavOpen: boolean;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  staysOpen: boolean;
  setStaysOpen: (open: boolean) => void;
  experiencesOpen: boolean;
  setExperiencesOpen: (open: boolean) => void;
  navbarExpand: boolean;
  setNavbarExpand: (open: boolean) => void;
  // burgerMenuOpen: boolean;
  // setIsBurgerMenuOpen: (open: boolean) => void;
  // handleBurgerOpen: () => void;
  learnMoreOpen: boolean;
  openFooter: boolean;
  setOpenFooter: (open: boolean) => void;
  footerOptions: number;
  setFooterOptions: (option: number) => void;
};

export const HomeContext = createContext<HomeContext | null>(null);

export default function HomeContextProvider({
  children,
}: THomeContextProvider) {
  const [bottomNavOpen, setBottomNavOpen] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [staysOpen, setStaysOpen] = useState(true);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [navbarExpand, setNavbarExpand] = useState(true);
  // const [burgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(true);
  const [openFooter, setOpenFooter] = useState(false);
  const [footerOptions, setFooterOptions] = useState(1);

  // Check if scrolled up or down to toggle footer on mobile
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setBottomNavOpen(false);
      } else {
        setBottomNavOpen(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Check if scrolled away from top of screen
  useEffect(() => {
    const handleScroll = () => {
      const scrollFromTop = window.scrollY;
      if (scrollFromTop === 0) {
        setNavbarExpand(true);
      } else {
        setNavbarExpand(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Toggle Burger Menu=
  // useEffect(() => {
  //   const handleBurgerClosure = () => {
  //     if (burgerMenuOpen) {
  //       setIsBurgerMenuOpen(false);
  //     }
  //   };

  //   window.addEventListener('click', handleBurgerClosure);

  //   () => {
  //     window.removeEventListener('click', handleBurgerClosure);
  //   };
  // }, []);

  // Toggle learn more header link
  useEffect(() => {
    const handleScroll = () => {
      const scrollFromTop = window.scrollY;
      if (scrollFromTop > 0) {
        setLearnMoreOpen(false);
      } else {
        setLearnMoreOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Desktop navbar burger open
  // const handleBurgerOpen = () => {
  //   setIsBurgerMenuOpen((prev) => !prev);
  // };

  return (
    <HomeContext.Provider
      value={{
        bottomNavOpen,
        isLoginOpen,
        setIsLoginOpen,
        staysOpen,
        setStaysOpen,
        experiencesOpen,
        setExperiencesOpen,
        navbarExpand,
        setNavbarExpand,
        // burgerMenuOpen,
        // setIsBurgerMenuOpen,
        // handleBurgerOpen,
        learnMoreOpen,
        openFooter,
        setOpenFooter,
        footerOptions,
        setFooterOptions,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
