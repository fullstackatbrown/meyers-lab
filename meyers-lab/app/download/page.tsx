'use client';

import React, { useState, useEffect, useRef } from 'react';

function TxtArea() {
    return (<textarea></textarea>)
}

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
            <div className="text-left">{label}</div>
            {inputElt}
        </div>
    );
}

function Form() {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwidPhci5rH5D-_gm-0dB-OR6U_1dqDc0UTH99Pl3sxZL3pkK7_iwX50ltwXvTmHL75/exec"
    const [formdone, setFormdone] = useState(false);

    const redirect = () => {
        setFormdone(true);
    }

    const link = <a href="" className="rounded-3xl text-white border-black p-2 bg-rose-500">Link to Download</a>

    return formdone ? 
    <div>
        <div className="text-3xl">Your download has started...</div>
        <div className="mt-3"><a className="text-blue underline p-1" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQeRBpaGQcuxhPaCIi_T4aUe5bigaiSq4z0RkOkIJmEFLjYPp85U_MCvqNAWx-EPCbJetNvTPOvYNiJ/pub?output=xlsx">Click here to download manually</a></div>
        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQeRBpaGQcuxhPaCIi_T4aUe5bigaiSq4z0RkOkIJmEFLjYPp85U_MCvqNAWx-EPCbJetNvTPOvYNiJ/pub?output=xlsx"></iframe>
    </div> : (
        <form id="data-form" action={scriptUrl} target="dummyframe" method="POST" className="w-1/2 text-left" onSubmit={redirect}>
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

            <input id="submit" type="submit" value="Submit" 
            className="w-32 border-black bg-rose-500 rounded-3xl text-white h-10 mt-5 text-lg"/>
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
    <div className="h-full min-h-screen w-full px-6">
        {/* Dynamic spacer based on header height */}
        <div style={{ minHeight: `${headerHeight}px` }}></div>

        {/* Site content */}
        <div id="content" className="text-center p-5">
            <div id="title-text" className="mt-10 mb-4 text-4xl font-bold">
                Data Download
            </div>
            <div id="explanation" className="mb-8 text-lg">
                Fill out the form to request a download link.
            </div>
            <div className="flex justify-center">
            <iframe name="dummyframe" id="dummyframe" className="hidden"></iframe>
            <Form/>
            </div>
        </div>
    </div>);
}

