'use client';

import React, { useState, useEffect } from 'react';
import {
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
  Chart,
} from 'react-google-charts';

export const options = {
  chart: {
    title: 'Coding Intensity vs. mean',
    hAxis: { title: 'Coding Intensity', minValue: 0, maxValue: 15 },
    vAxis: { title: 'mean', minValue: 0, maxValue: 15 },
    legend: 'none',
  },
};

export default function Data() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [chartEditor, setChartEditor] = useState<GoogleChartEditor | undefined>(
    undefined,
  );
  const [chartWrapper, setChartWrapper] = useState<
    GoogleChartWrapper | undefined
  >(undefined);
  const [google, setGoogle] = useState<GoogleViz | undefined>(undefined);
  const [data, setData] = useState<Map<string, string>[]>([]);
  const [graphingData, setGraphingData] = useState<
    Array<Array<string | number>>
  >([]);
  const [selectedYear, setSelectedYear] = useState<string>('All Year');
  const [selectedDataset, setSelectedDataset] =
    useState<string>('Select Dataset');
  const [showDataVis, setShowDataVis] = useState<boolean>(false);

  const onEditClick = () => {
    if (!chartWrapper || !google || !chartEditor) {
      return;
    }

    chartEditor.openDialog(chartWrapper);

    google.visualization.events.addListener(chartEditor, 'ok', () => {
      const newChartWrapper = chartEditor.getChartWrapper();

      newChartWrapper.draw();

      const newChartOptions = newChartWrapper.getOptions();
      const newChartType = newChartWrapper.getChartType();

      console.log('Chart type changed to ', newChartType);
      console.log('Chart options changed to ', newChartOptions);
    });
  };


  const handleSubmit = () => {
    if (selectedDataset === 'Select Dataset') {
      alert('Please choose a dataset to display.');
    } else {
      setGraph(); // Update graphingData
      setShowDataVis(true); // Show the Chart component
    }
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

  // Parse CSV handling

  // Function to parse CSV data into an array
  const parseCSV = (csvData: string) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrgqWmHkhMoQWeisf_k31KSxqI28kDvF65cRawH4oyM5027jk1hdXdwjNvG0F81Q/pub?gid=761047681&single=true&output=csv',
        );
        const csvData = await response.text();
        const parsedData = parseCSV(csvData);

        // Extracting column headers from the first row
        const columnHeaders = parsedData[0];

        // Mapping each row to a map where the column headers map to the corresponding values
        const mappedData = parsedData.slice(1).map((row) => {
          const map = new Map<string, string>();
          columnHeaders.forEach((header, index) => {
            map.set(header, row[index]);
          });
          return map;
        });

        // Updating the state with the mapped data
        setData(mappedData);
      } catch (error) {
        console.error('Error fetching data from Google Spreadsheet:', error);
      }
    };

    fetchData();
  }, []);

  const setGraph = () => {
    if (selectedDataset === 'Mean vs. Quintile') {
      // Extract "mean" and "quintile" columns for graphing
      const meanQuintile = data.map((row) => {
        const meanValue = row.get('mean');
        const mean = meanValue !== undefined ? parseFloat(meanValue) : 0;
        const quintileValue = row.get('Quintile, by measure');
        const quintile =
          quintileValue !== undefined ? parseFloat(quintileValue) : 0;
        return [mean, quintile];
      });

      setGraphingData([["mean","quintile"], ...meanQuintile]);
    }
  };

  return (
    <div className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-[5vh] min-h-[10vh]">
        <h1 className="text-4xl text-primary">View Data Visualizations</h1>
      </div>
      <div className="menu flex items-center">
        <p className="mr-2 text-lg text-primary">Year:</p>
        <select
          className="mr-2 rounded border-2 p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All Years">All Years</option>
          <option value="2019">2019</option>
          {/* Add more years as needed */}
        </select>
        <p className="mr-2 text-lg text-primary">Dataset:</p>
        <select
          className="mr-2 rounded border-2 p-2"
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
        >
          <option value="Select Dataset">Select Dataset</option>
          <option value="Mean vs. Quintile">Mean vs. Quintile</option>
          {/* Add more dataset options as needed */}
        </select>
        <button
          className="font-regular rounded bg-primary-red px-4 py-2 text-white hover:bg-primary-red_light focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {showDataVis && (
        <div className="graph-vis mt-4 flex flex-row">
          <div className="flex items-start justify-start">
            <button
              className="focus:shadow-outline font-regular rounded bg-primary-red px-4 py-2 text-white hover:bg-primary-red_light focus:outline"
              onClick={onEditClick}
              style={{ marginTop: '4.5rem' }}
            >
              Edit Chart
            </button>
          </div>
          <Chart
            chartType="ScatterChart"
            width="80%"
            height="400px"
            data={graphingData}
            options={options}
            chartPackages={['corechart', 'controls', 'charteditor']}
            getChartEditor={({ chartEditor, chartWrapper, google }) => {
              setChartEditor(chartEditor);
              setChartWrapper(chartWrapper);
              setGoogle(google);
            }}
          />
        </div>
      )}
    </div>
  );
}
