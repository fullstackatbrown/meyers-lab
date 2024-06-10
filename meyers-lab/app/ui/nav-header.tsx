'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [position]);

    const headerClass = visible ? 'nav-header' : 'nav-header nav-header-hidden';

    return (
        <div id="header" className={`fixed flex flex-row justify-between bg-primary items-center w-full min-h-[16] pl-3 pr-7 z-[100]  ${headerClass}`} style={{ borderBottom: '3px solid rgb(255,255,255)'}}>
            {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
            <Link className="fade-in-out-basic hover:text-primary-gold text-[rgb(250,250,250)] min-w-[185px]" href="https://meyers-lab.vercel.app/">
                <div className="font-mp font-semibold gap-5 px-5 text-4xl-responsive pt-0.5">
                    MediCOIN (Medicare COding INtensity) Report
                </div>
            </Link>
            <div className="font-circ-std flex flex-col md6:flex-row items-center justify-center md6:gap-6 gap-2 my-4 px-0">
                {/* <a href="https://meyers-lab.vercel.app/about" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">About</a> */}
                <a href="https://meyers-lab.vercel.app/methods" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">Methods</a>
                <a href="https://meyers-lab.vercel.app/download" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">Download</a>
                <a href="https://meyers-lab.vercel.app/data" className="text-center text-[rgb(250,250,250)] hover:bg-primary-red_light bg-primary-red px-2 pt-2 pb-1.5 rounded-xl text-lg fade-in-out-basic">View Data & Findings</a>
            </div>
        </div>
    )
}