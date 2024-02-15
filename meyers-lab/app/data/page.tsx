"use client";

import React, { useState, useEffect } from 'react';

export default function Data() {
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
    <div className="flex min-h-screen flex-col px-6 pt-2 ml-3 w-full h-full">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
        <div className="min-h-[10vh] my-[5vh]">
                <h1>View Data Visualizations</h1>
            </div>
        </div>
    )
}