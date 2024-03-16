"use client";
import "./page.css"
import axios from "axios";

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
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
  const [csvData, setCsvData] = useState<string[][]>([])


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
        fetchCSVData();    // Fetch the CSV data when the component mounts
    }, []); // The empty array ensures that this effect runs only once, like componentDidMount

    function parseCSV(csvText: string) {
      const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
      const headers = rows[0].split(',');        // Extract headers (assumes the first row is the header row)
      const data = [];        // Initialize an array to store the parsed data
      for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
          const rowObject : string[] = [];
          for (let j = 0; j < headers.length; j++) {
              rowObject[j] = rowData[j];
          }
          data.push(rowObject);
      }
      return data;
  }

    const fetchCSVData = () => {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrgqWmHkhMoQWeisf_k31KSxqI28kDvF65cRawH4oyM5027jk1hdXdwjNvG0F81Q/pub?gid=761047681&single=true&output=csv"; // Replace with your Google Sheets CSV file URL

        axios.get(csvUrl)    // Use Axios to fetch the CSV data
            .then((response) => {
                const parsedCsvData : string[][] = parseCSV(response.data);        // Parse the CSV data into an array of objects
                setCsvData(parsedCsvData);        // Set the fetched data in the component's state
                console.log(parsedCsvData);        // Now you can work with 'csvData' in your component's state.
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
            });
    }



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