"use client";
import "./page.css"

import React, { useState, useEffect } from 'react';
import {
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
  Chart,
} from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Coding Intensity vs. mean",
    hAxis: { title: 'Coding Intensity', minValue: 0, maxValue: 15 },
    vAxis: { title: 'mean', minValue: 0, maxValue: 15 },
    legend: 'none',
    
  },
};


export default function Data() {
  const [headerHeight, setHeaderHeight] = useState(0);

  const [chartEditor, setChartEditor] = useState<GoogleChartEditor>();
  const [chartWrapper, setChartWrapper] = useState<GoogleChartWrapper>();
  const [google, setGoogle] = useState<GoogleViz>();

  const onEditClick = () => {
    if (!chartWrapper || !google || !chartEditor) {
      return;
    }

    chartEditor.openDialog(chartWrapper);

    google.visualization.events.addListener(chartEditor, "ok", () => {
      const newChartWrapper = chartEditor.getChartWrapper();

      newChartWrapper.draw();

      const newChartOptions = newChartWrapper.getOptions();
      const newChartType = newChartWrapper.getChartType();

      console.log("Chart type changed to ", newChartType);
      console.log("Chart options changed to ", newChartOptions);
    });
  };




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
    <div className="flex min-h-screen flex-col px-6 pt-2 ml-3 w-full h-full">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
        <div className="min-h-[10vh] my-[5vh]">
                <h1>View Data Visualizations</h1>
            </div>
      <div className="graph-vis">
      <button onClick={onEditClick}>Edit Chart</button>
      <Chart
        chartType="ScatterChart"
        width="80%"
        height="400px"
        spreadSheetUrl="https://docs.google.com/spreadsheets/d/1QH-s6BDun9tdBg9YxJibOlLNU8JkHdRC/edit#gid=761047681"
        data="D1:E515" 
        options={options}
        chartPackages={["corechart", "controls", "charteditor"]}
        getChartEditor={({ chartEditor, chartWrapper, google }) => {
          setChartEditor(chartEditor);
          setChartWrapper(chartWrapper);
          setGoogle(google);
        }}
      />
      </div>
      </div>
    )
}