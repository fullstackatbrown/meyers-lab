'use client';

import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "./ServerActions"

import React, { useState, useEffect, useRef } from 'react';

process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

function FormElt({ label, name, type }: { label: string, name: string, type: string }) {
    let inputElt;
    if(type == "area") {
        inputElt = (<textarea name={name} className="rounded-sm p-1 border border-black w-full"/>)
    } else if(type == "text") {
        inputElt = (<input type="text" name={name} className="rounded-sm p-1 border border-black w-full" required/>)
    } else {
        inputElt = (<div>Check Code</div>)
    }
    return (
        <div className="p-2 w-full">
            <div className="text-left text-lg">{label}</div>
            {inputElt}
        </div>
    );
}

function Form() {

    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsverified] = useState<boolean>(false)

    async function handleCaptchaSubmission(token: string | null) {
        // Server function to verify captcha
        await verifyCaptcha(token)
        .then(() => setIsverified(true))
        .catch(() => setIsverified(false))
    }

    const scriptUrl = "https://script.google.com/macros/s/AKfycbzCxfzdO0JkMVIjt3-ynby9SHyQfyALYgLFgo2rXA2AHA_Y3Cck99nJUgrFrgUBqguA/exec"
    const [formdone, setFormdone] = useState(false);

    const submitBtn = isVerified ? <button id="submit" type="submit" value="Submit"
    className="w-32 border-black bg-rose-500 rounded-3xl text-white h-10 mt-5 text-lg">Submit</button> : <input id="submit" type="button" value="Submit"
    className="w-32 border-black bg-rose-500 rounded-3xl text-white h-10 mt-5 text-lg"/>

    return (
        <form id="data-form" action={scriptUrl} target="_blank" method="POST" className="w-1/2 min-w-[340px] text-left">
            <div id="explanation" className="mb-8 text-lg">
                Fill out the form to request a download link.
            </div>
            <div className="flex text-center">   
                <FormElt label="First Name: " name="first-name" type="text" />
                <FormElt label="Last Name: " name="last-name" type="text" />
            </div>
            
            <FormElt label="Email: *" name="email" type="text" />
            <FormElt label="Institution/Affiliation: *" name="org" type="text"/>
            <FormElt label="Reason for Downloading: *" name="reason" type="text"/>

            <FormElt label="Plan to Merge with Another Source?" name="merge" type="area"/>
            <FormElt label="How did you hear about us?" name="hear" type="area"/>

            <div className="flex px-2 items-start">
                <input type="checkbox" name="mail" className="flex mr-5 mt-[5px] w-5 h-5" />
                <span>Join Our Mailing List?</span>
            </div>

            <div className="flex px-2 items-start">
                <input className="flex mr-5 mt-[5px] w-5 h-5" type="checkbox" name="tos" required/>
                <span>By downloading our data you agree ...</span>
            </div>
            <div className="mb-5"></div>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
            />
            {submitBtn}
        </form>
    )
}

export default function Download() {
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
    <div className="h-full min-h-screen w-full">
        {/* Dynamic spacer based on header height */}
        <div style={{ minHeight: `${headerHeight}px` }}></div>

        {/* Site content */}
        <div id="content" className="text-center p-5">
            <div id="title-text" className="mt-1 mb-4 text-4.5xl-responsive font-bold text-primary">
                Data Download
            </div>
            <div className="flex justify-center">
            <Form/>
            </div>
        </div>
        <div className="mb-[5vh]"></div>
    </div>);
}

