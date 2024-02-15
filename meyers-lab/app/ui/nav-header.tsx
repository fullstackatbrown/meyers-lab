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
        <div className={`fixed flex flex-row justify-between bg-primary items-center w-full h-20 gap-10 pl-3 pr-7 z-[100] ${headerClass}`} style={{ borderBottom: '3px solid rgb(255,255,255)'}}>
            {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
            <Link className="hover:text-primary-gray text-[rgb(250,250,250)]" href="http://localhost:3000/">
                <div className="font-mp font-semibold gap-5 px-5 text-4xl-responsive">
                    Coding Intensity Report Card
                </div>
            </Link>
            <div className="font-circ-std flex flex-row gap-6 px-5">
                <a href="http://localhost:3000/about" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-xl">About</a>
                <a href="http://localhost:3000/methods" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-xl">Methods</a>
                <a href="http://localhost:3000/download" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-xl">Download</a>
                <a href="http://localhost:3000/data" className="text-[rgb(250,250,250)] hover:text-primary-gray flex-none text-xl">View Data & Findings</a>
            </div>
        </div>
    )
}