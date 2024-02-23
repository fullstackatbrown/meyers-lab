'use client';

import React, { useState, useEffect } from 'react';

export default function Page() {
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
    <main className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-[5vh] min-h-[10vh]">
        <h1>Hello World!</h1>
      </div>
    </main>
  );
}
