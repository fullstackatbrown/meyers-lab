'use client';

import React, { useState, useEffect } from 'react';

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
                Fill out the form to request a download link to be sent to you by email.
            </div>
            <div className="flex justify-center">
            <form id="data-form" action="" method="POST" className="w-1/2 text-left">
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
            </div>
        </div>
    </div>);
}
