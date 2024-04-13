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
    <main className="flex h-full min-h-screen w-full flex-col px-6 pt-2">
      <div style={{ minHeight: `${headerHeight}px` }}></div>

      {/* Image section and text overlay */}
      <div className="w full relative">
        <img
          //placeholder image(s)
          // src="http://bonner.pbworks.com/f/1494266349/Brown%20University%20Campus%20Photo.jpg"
          src="https://media.licdn.com/dms/image/C4E1BAQEOUCzmh7KK1Q/company-background_10000/0/1584426172670/brown_ucs_cover?e=1713610800&v=beta&t=yxlO96NxXO6Bj7-suabUSxpFQ3tCw3WDyqwS3AlgYl4"
          alt="Brown University"
        ></img>
        <div className="absolute bottom-0 left-0 m-5 p-4 text-4xl font-bold text-white">
          Welcome to the landing page of the coding intensity report card!
        </div>
      </div>

      {/* Purpose section */}
      <div className="mx-24 my-[5vh] min-h-[10vh] p-4 text-2xl font-bold">
        <h1> Our purpose </h1>
        <div className="my-[5vh] min-h-[10vh] w-1/2 text-xl font-normal">
          <h1>
            The overall objective of this project is to better understand how
            the Medicare Advantage (MA) program impacts spending through
            increasing coding intensity. In our prior work, we have found
            substantial MA plan level variation in the use of different tools
            for maximizing coding intensity. Our goal for this report card is to
            use several measures of coding intensity in MA and to publicly
            report those measures to potentially increase pressure on plans that
            engage in more intensive coding behavior.
          </h1>
        </div>
      </div>

      {/* Mission statement section */}
      <div className="my-[5vh] min-h-[10vh] w-screen bg-gray-200 p-4">
        <div className="flex justify-end">
          <div className="mx-24 my-[5vh] w-1/2 text-right text-2xl font-bold">
            <h1> Mission Statement </h1>
            <div className="my-[5vh] min-h-[10vh] text-xl font-normal">
              <h1>
                This report card website will help to inform policymakers about
                variations in MA coding intensity. The related policy
                implications include first, that it will enable us to measure an
                unbiased estimate of increased coding by using functional
                impairment recorded on clinical assessments as a gold standard
                for patient morbidity, allowing us to estimate how much
                additional spending may be attributable to upcoding. Second, it
                will enable us to determine the role that chart reviews and
                health risk assessments play in upcoding over time, and may help
                to inform policy as to whether these MA plan procedures should
                be permitted by CMS. Third, it will help us to better understand
                and identify the plans that engage in the most upcoding, which
                may allow for better targeting of regulation to reduce the
                upcoding of diagnoses. This has the potential to help identify
                billions of dollars of waste in the Medicare program and will
                help present opportunities to address it.
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions section */}
      <div className="mx-24 my-[5vh] min-h-[10vh] p-4 text-2xl font-bold">
        <h1> Instructions </h1>
        <div className="my-[5vh] min-h-[10vh] text-xl font-normal">
          <h1></h1>
        </div>
      </div>

      {/* Methodology section */}
      <div className="my-[5vh] min-h-[10vh] w-screen bg-gray-200 p-4">
        <div className="flex justify-end">
          <div className="mx-24 my-[5vh] w-1/2 text-right text-2xl font-bold">
            <h1> Methodology? </h1>
            <div className="my-[5vh] min-h-[10vh] text-xl font-normal">
              <h1>
                We will use five different methods to compare plan level coding
                intensity: 1) Increased coding due to chart reviews, 2)
                increased coding due to 4 health risk assessments, 3) higher
                than expected coding benchmarked against functional status, 4)
                higher than expected coding benchmarked against mortality, and
                5) higher than expected coding benchmarked against a
                pharmaceutical-based risk score. The first four measures we will
                calculate in the first two activities for this aim. The final
                measure will be based on similar work published by others. For
                each measure, we will also classify plans into categories of
                high, medium, and low amounts of increased coding intensity
                based on tertile.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-500 p-8 font-circ-std text-2xl text-white">
        <h1>Brown University Center for Gerontology and Healthcare Research</h1>
        <div className="my-5 text-sm">
          <p>Providence RI 021912</p>
          <p>(401) 863-3211</p>
        </div>
        <div className="flex w-1/2 flex-row justify-between p-0 text-sm">
          <a href="https://cghcr.sph.brown.edu/">Find us here → </a>
          <div className="w-1/2 p-0 text-right">Link 2 → </div>
        </div>
        <div className="my-1 flex w-1/2 flex-row justify-between p-0 text-sm">
          <p>Link 3 → </p>
          <div className="w-1/2 p-0 text-right">Link 4 → </div>
        </div>
      </div>
    </main>
  );
}
