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
    <main className="flex h-full min-h-screen w-full flex-col">
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      {/* Image section and text overlay */}
      <div className="w-full relative min-h-[55vh]">
        <img
          //placeholder image(s)
          // src="http://bonner.pbworks.com/f/1494266349/Brown%20University%20Campus%20Photo.jpg"
          // src="https://media.licdn.com/dms/image/C4E1BAQEOUCzmh7KK1Q/company-background_10000/0/1584426172670/brown_ucs_cover?e=1713610800&v=beta&t=yxlO96NxXO6Bj7-suabUSxpFQ3tCw3WDyqwS3AlgYl4"
          src="https://www.brown.edu/university-communications/sites/university-communications/files/238707_COVD_Zoom_summer_4.jpg"
          alt="Brown University"
            style={{ height: '55vh', width: '100%', objectFit: 'cover' }}
        ></img>
        <div className=" p-4 text-4xl font-bold text-white text-center m-[-15vh]" style={{}}>
          Welcome to the landing page of the coding intensity report card!
        </div>
      </div>

      {/* Purpose section */}
      <div className="mx-24 my-[5vh] min-h-[10vh] p-4 text-2xl font-bold">
        <h1> Our purpose </h1>
        <div className="mt-[5vh] min-h-[10vh] w-1/2 text-xl font-normal">
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
      <div className="my-[5vh] flex min-h-[10vh] w-screen justify-end bg-gray-200 p-4">
        <div className="mx-24 my-[5vh] w-1/2 text-right text-2xl font-bold">
          <h1> Mission Statement </h1>
          <div className="my-[5vh] min-h-[10vh] text-xl font-normal">
            <h1>
              This report card website will help to inform policymakers about
              variations in MA coding intensity. The related policy implications
              include first, that it will enable us to measure an unbiased
              estimate of increased coding by using functional impairment
              recorded on clinical assessments as a gold standard for patient
              morbidity, allowing us to estimate how much additional spending
              may be attributable to upcoding. Second, it will enable us to
              determine the role that chart reviews and health risk assessments
              play in upcoding over time, and may help to inform policy as to
              whether these MA plan procedures should be permitted by CMS.
              Third, it will help us to better understand and identify the plans
              that engage in the most upcoding, which may allow for better
              targeting of regulation to reduce the upcoding of diagnoses. This
              has the potential to help identify billions of dollars of waste in
              the Medicare program and will help present opportunities to
              address it.
            </h1>
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
      <div className=" mt-[5vh] flex min-h-[10vh] w-screen justify-end bg-gray-200 p-4">
        <div className="mx-24 my-[5vh] w-1/2 text-right text-2xl font-bold">
          <h1> Methodology</h1>
          <div className="my-[5vh] min-h-[10vh] text-xl font-normal">
            <h1>
              We will use five different methods to compare plan level coding
              intensity: 1) Increased coding due to chart reviews, 2) increased
              coding due to 4 health risk assessments, 3) higher than expected
              coding benchmarked against functional status, 4) higher than
              expected coding benchmarked against mortality, and 5) higher than
              expected coding benchmarked against a pharmaceutical-based risk
              score. The first four measures we will calculate in the first two
              activities for this aim. The final measure will be based on
              similar work published by others. For each measure, we will also
              classify plans into categories of high, medium, and low amounts of
              increased coding intensity based on tertile.
            </h1>
          </div>
        </div>
      </div>

      <div className="w-500 bg-red-500 p-8 font-circ-std text-2xl text-white">
        <h1>Brown University Center for Gerontology and Healthcare Research</h1>
        <div className="mt-5 flex items-center text-sm">
          {/** https://heroicons.dev/ */}
          <svg
            className="inline-block w-4"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            ></path>
          </svg>
          <div className="ml-1">Providence RI 02912</div>
        </div>
        <div className="my-1 mb-7 flex items-center text-sm">
          {/** https://heroicons.dev/ */}
          <svg
            className="inline-block w-4"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            ></path>
          </svg>
          <div className="ml-1">(401) 863-3211</div>
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
