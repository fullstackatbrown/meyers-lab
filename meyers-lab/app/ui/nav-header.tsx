'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Image from 'next/image';
import Link from 'next/link';


export default function NavHeader() {
    const [position, setPosition] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set the initial position
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
        <div className={`fixed flex flex-row justify-between bg-primary items-center w-full h-20 gap-10 pl-3 pr-7 z-[100]  ${headerClass}`} style={{ borderBottom: '3px solid rgb(255,255,255)'}}>
            {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
            <Link className="fade-in-out-basic hover:text-primary-gray text-[rgb(250,250,250)]" href="http://localhost:3000/">
                <div className="font-mp font-semibold gap-5 px-5 text-4xl-responsive pt-0.5">
                    Coding Intensity Report Card
                </div>
            </Link>
            <div className="font-circ-std flex flex-row items-center justify-center gap-6 px-5">
                <a href="http://localhost:3000/about" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">About</a>
                <a href="http://localhost:3000/methods" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">Methods</a>
                <a href="http://localhost:3000/download" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-lg fade-in-out-basic">Download</a>
                <a href="http://localhost:3000/data" className="text-[rgb(250,250,250)] hover:bg-primary-red_light bg-primary-red px-2 pt-2 pb-1.5 rounded-xl flex-none text-lg fade-in-out-basic">View Data & Findings</a>
            </div>
        </div>
    )
}