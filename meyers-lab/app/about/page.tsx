"use client";

import React, { useState, useEffect } from 'react';

export default function About() {
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

  //helper array to simulate multiple team members
  const teamMembers = [
    { id: 1, name: 'David Meyers', img_url: 'https://vivo.brown.edu/profile-images/aa0/509/833/156/491/3af/5de/2ed/9fe/961/35/dmeyers1_photo_.png', bio: 'David J Meyers, PhD, MPH, is a health services researcher and health economist whose research broadly focuses on how payment and delivery reform affect the outcomes of historically marginalized patient populations. His current research interests include trying to understand the drivers of inequities in the Medicare Advantage program, the evaluation of care management programs for high risk patient populations, and Medicaid policy for patients with chronic illness. David earned a PhD in Health Services Research with a concentration in Health Economics from the Brown University School of Public Health, and a MPH in Epidemiology and Biostatistics from the Tufts University School of Medicine. Prior to his doctoral training, he worked in the Department of Health Policy and Management at the Harvard TH Chan School of Public Health.' },
    { id: 2, name: 'Hannah James', bio: 'Bio goes here' },
    { id: 3, name: 'Cyrus Kosar', bio: 'Bio goes here' },
    { id: 4, name: 'Kendra Offiaeli', bio: 'Bio goes here' },
    { id: 5, name: 'Amal Trivedi', bio: 'Amal Trivedi is a general internist and health services researcher who studies quality of care and health care disparities, with particular emphasis on the impact of patient and provider incentives on quality and equity of care. His research has been published in the New England Journal of Medicine, the Journal of the American Medical Association, and Health Affairs. Dr. Trivedi teaches on health policy issues to medical students and residents and teaches a course on Quality Measurement and Improvement for graduate students.' },
    { id: 6, name: 'Beth Dana', bio: 'Bio goes here' },
    { id: 7, name: 'Daeho Kim', bio: 'Bio goes here' },
    { id: 8, name: 'Hyunkyung Yulia Yun', bio: 'Bio goes here' },
    { id: 9, name: 'Momotazur Rahman', img_url: 'https://vivo.brown.edu/profile-images/888/30/mrahman_photo_.jpg', bio: 'Dr. Rahman is an economist interested in the organization and economic performance of the U.S. healthcare system. His research focuses on disparities in health care access, utilization and outcomes across different demographic and socio-economic groups; the effects of managed care on the healthcare system; the effects of regulation on healthcare markets.  His research led to publications in specialized journals such as: Health Services Research, Medical Care Research and Review and Journal of Health Economics. He received his BA from University of Dhaka, Bangladesh, and his MA and PhD in economics from Brown University, Rhode Island, USA. ' },
  ];

  return (
    <div className="flex min-h-screen flex-col px-32 pt-2 pb-32 ml-3 w-full h-full">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-5">
        <div className="bg-red-600 shadow-md p-2 rounded-lg mb-8">
          <h1 className="text-4xl-responsive font-bold text-white mb-2">About Us</h1>
        </div>
        <p className="mb-4">This website is a product of the  Coding Variation and Spillovers in Medicare Advantage Project being conducted at the Brown University Center for Gerontology and Healthcare Research and supported by Arnold Ventures LLC.</p>
        <p className="mb-4">The overall objective of this project is to better understand how the Medicare Advantage (MA) program impacts spending through increasing coding intensity. We used five metrics to chart variations in coding intensity across different MA plans to produce a report on which plans are engaging in the most intense coding. </p>
        <p className="mb-4">The Medicare Advantage (MA) program is rapidly growing, enrolls over 45% of all Medicare beneficiaries, and accounts for over $240 billion in federal spending. In MA, private insurance plans receive risk-adjusted capitation payments which greatly change their incentives from the fee-for-service Traditional Medicare (TM) program. Namely, under full capitation a plan can potentially benefit by reducing spending on unnecessary and/or expensive services, or by increasing the amount of risk-adjusted payments received from the Centers for Medicare and Medicaid Services (CMS). Controlling costs related to the expansion of the MA program is vital, given that within the next two years, the majority of Medicare beneficiaries will likely be enrolled in an MA plan. </p>
        <p className="mb-8">We explored the potential opportunities and challenges of controlling costs through the MA program by comprehensively measuring variation in coding intensity across MA plans. This will allow us to measure how much excess spending in the MA program may be due to coding differences. </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-start">
              <img src={member.img_url} alt='' className="w-32 h-32 object-cover rounded-full" />
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}