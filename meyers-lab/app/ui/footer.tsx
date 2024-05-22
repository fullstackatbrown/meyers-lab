import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
