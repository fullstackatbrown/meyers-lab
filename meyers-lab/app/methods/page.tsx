'use client';

import React, { useState, useEffect } from 'react';
import Carousel from './carousel';

export default function Methods() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-[5vh] min-h-[10vh]">
        {/* fix alignment to match up */}
        <h1 className="pl-48 text-4xl text-primary">Methods</h1>
        <p className="pl-48 text-lg text-primary">Methods page blurb...</p>
      </div>

      {/* Carousel for displaying images */}
      <Carousel />

      {/* Upload button */}
      <div className="mt-4 flex items-center justify-center">
        <input type="file" accept=".pdf" className="hidden" />
        <button className="focus:shadow-outline rounded bg-primary-red px-4 py-2 font-bold text-white hover:bg-primary-red_light focus:outline-none">
          Upload PDF
        </button>
      </div>
    </div>
  );
}
