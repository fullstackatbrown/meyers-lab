'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';

export default function NavHeader() {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setPosition(window.scrollY);

    const handleScroll = () => {
      let moving = window.scrollY;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  const headerClass = visible ? 'nav-header' : 'nav-header nav-header-hidden';

  return (
    <div
      id="header"
      className={`fixed z-[100] flex min-h-[16] w-full flex-row items-center justify-between bg-primary pl-3 pr-7  ${headerClass}`}
      style={{ borderBottom: '3px solid rgb(255,255,255)' }}
    >
      {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
      <Link
        className="fade-in-out-basic min-w-[185px] text-[rgb(250,250,250)] hover:text-primary-gold"
        href="https://www.medicoinreport.org/"
      >
        <div className="gap-5 px-5 pt-0.5 font-mp text-4xl-responsive font-semibold">
          MediCOIN (Medicare COding INtensity) Report
        </div>
      </Link>
      <div className="my-4 flex flex-col items-center justify-center gap-2 px-0 font-circ-std md6:flex-row md6:gap-6">
        {/* <a href="https://meyers-lab.vercel.app/about" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">About</a> */}
        <a
          href="https://www.medicoinreport.org/methods"
          className="fade-in-out-basic flex-none text-lg text-[rgb(250,250,250)] hover:text-primary-gray"
        >
          Methods
        </a>
        <a
          href="https://www.medicoinreport.org/download"
          className="fade-in-out-basic flex-none text-lg text-[rgb(250,250,250)] hover:text-primary-gray"
        >
          Download
        </a>
        <a
          href="https://www.medicoinreport.org/data"
          className="fade-in-out-basic rounded-xl bg-primary-red px-2 pb-1.5 pt-2 text-center text-lg text-[rgb(250,250,250)] hover:bg-primary-red_light"
        >
          View Data & Findings
        </a>
      </div>
    </div>
  );
}
