'use client';

import React, { useState, useEffect } from 'react';

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
        <h1 className="text-primary text-4xl">Methods</h1>
        <p className="text-primary text-lg">Methods page blurb...</p>
      </div>

      {/* Gray square div for PDF display area */}
      <div className="mx-auto flex h-64 w-3/4 items-center justify-center bg-gray-200">
        <p className="text-gray-600">PDF will be shown here</p>
      </div>

      {/* Upload button */}
      <div className="mt-4 flex items-center justify-center">
        <input type="file" accept=".pdf" className="hidden" />
        <button className="focus:shadow-outline rounded hover:bg-primary-red_light bg-primary-red px-4 py-2 font-bold text-white focus:outline-none">
          Upload PDF
        </button>
      </div>
    </div>
  );
}
