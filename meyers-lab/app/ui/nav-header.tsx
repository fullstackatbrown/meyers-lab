'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Image from 'next/image';
import Link from 'next/link';


export default function NavHeader() {
    /**
     * TODO: Add a logo, which will be a link to the home page.
     * TODO: Add a login button, which will be a link to the login page.
     * TODO: Add a chrome extension button, which will be an external link to the chrome store.
     */

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
        <div className={`fixed flex flex-row justify-between bg-slate-700 items-center w-full h-20 gap-10 pl-3 pr-7 z-[100] ${headerClass}`} style={{ borderBottom: '3px solid rgb(255,255,255)'}}>
            {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
            <Link href="http://localhost:3000/">
                <div className="font-mp-display gap-5 px-5 text-4xl-responsive text-[rgb(250,250,250)]">
                    Coding Intensity Reportcard
                </div>
            </Link>
            <div className="flex flex-row gap-6 px-5">
                <a href="http://localhost:3000/research-overview" className="text-[rgb(250,250,250)] hover:text-slate-400 flex-none text-xl">Research Overview</a>
                <a href="http://localhost:3000/tableau" className="text-[rgb(250,250,250)] hover:text-slate-400 flex-none text-xl">Tableau</a>
            </div>
        </div>
    )
}