// ./app/data/page.tsx

// Ensure this component is rendered on the client side
"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
  Chart,
} from "react-google-charts";

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
  const [chartEditor, setChartEditor] = useState<GoogleChartEditor | undefined>(undefined);
  const [chartWrapper, setChartWrapper] = useState<GoogleChartWrapper | undefined>(undefined);
  const [google, setGoogle] = useState<GoogleViz | undefined>(undefined);
  const [data, setData] = useState<string[][]>([]);
  const [graphingData, setGraphingData] = useState<Array<Array<string | number>>>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTrgqWmHkhMoQWeisf_k31KSxqI28kDvF65cRawH4oyM5027jk1hdXdwjNvG0F81Q/pub?gid=761047681&single=true&output=csv");
        const csvData = await response.text();
        const parsedData = parseCSV(csvData);
        setData(parsedData);
  
        // Extract "mean" and "quintile" columns for graphing
        const meanQuintile = parsedData.slice(1).map(row => [parseFloat(row[row.length - 2]), parseFloat(row[row.length - 1])]);
        
        // Prepend column headers
        const graphingDataWithHeaders = [["mean", "quintile"], ...meanQuintile];
        setGraphingData(graphingDataWithHeaders);
        console.log(graphingDataWithHeaders)
      } catch (error) {
        console.error("Error fetching data from Google Spreadsheet:", error);
      }
    };
  
    fetchData();
  }, []);
  
  
// Function to parse CSV data into an array
const parseCSV = (csvData : string) => {
  const lines = csvData.split('\n');
  const parsedData = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      let values = [];
      let inQuotedField = false;
      let currentField = '';

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotedField = !inQuotedField;
        } else if (char === ',' && !inQuotedField) {
          // Split only if not in a quoted field
          values.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }

      // Push the last field
      values.push(currentField.trim());
      parsedData.push(values);
    }
  }

  return parsedData;
};


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
          data={graphingData}
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
  );
}
