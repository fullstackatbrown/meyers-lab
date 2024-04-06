'use client';

import React, { useState, useEffect, useRef } from 'react';


export default function Methods() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-[5vh] min-h-[10vh]">
        <h1 className="pl-48 text-4xl text-primary">Methods</h1>
        <p className="pl-48 text-lg text-primary">Methods page blurb...</p>
      </div>

      {/* PDF Display */}
      {pdfFile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <iframe
            src={pdfFile}
            style={{ width: '80%', height: '1200px' }}
            frameBorder="0"
          ></iframe>
        </div>
        // Alternatively, use an <object> tag for better compatibility with non-iframe-friendly PDFs
        // <object data={pdfFile} type="application/pdf" width="100%" height="500px"></object>
      )}

      {/* Upload button */}
      <div className="mt-4 flex items-center justify-center">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <button
          className="focus:shadow-outline rounded bg-primary-red px-4 py-2 font-bold text-white hover:bg-primary-red_light focus:outline-none"
          onClick={triggerFileInput}
        >
          Upload PDF
        </button>
      </div>
    </div>
  );
}
