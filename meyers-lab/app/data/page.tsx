'use client';

import React, { useState, useEffect } from 'react';
import {
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
  Chart,
} from 'react-google-charts';

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
  const [allYears, setAllYears] = useState<Set<string>>(new Set<string>());
  const [graphingData, setGraphingData] = useState<Array<Array<any>>>([]);
  const [options, setOptions] = useState({});
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
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
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqpBW19SATAkybBihGekPuDSKmk7v_npEw2HisG2XAz2Q6TULnS-q9a8H05JKLxg/pub?gid=93139773&single=true&output=csv',
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

        // Set all possible years
        const possibleYears = new Set<string>();
        mappedData.forEach((row) => {
          possibleYears.add(row.get('year') ?? ''); // Ensure we add a string value or empty string if undefined
        });
        setAllYears(possibleYears);
      } catch (error) {
        console.error('Error fetching data from Google Spreadsheet:', error);
      }
    };

    fetchData();
  }, []);

  const setGraph = () => {
    let yearData = data; // Default to all years

    // Check if a specific year is selected
    if (selectedYear !== 'All Years') {
      // Filter data for the selected year
      yearData = data.filter((row) => row.get('year') === selectedYear);
    }

    if (selectedDataset === 'Mean vs. Quintile Due to HRA') {
      // Extract "mean" and "quintile" columns for graphing
      const meanQuintileHR = yearData.map((row) => {
        const meanValueHR = row.get('mean_pct due to HRA');
        const meanHR = meanValueHR !== undefined ? parseFloat(meanValueHR) : 0;
        const quintileValueHR = row.get('Quintile_pct due to HRA');
        const quintileHR =
          quintileValueHR !== undefined ? parseFloat(quintileValueHR) : 0;

        const parentOrg = row.get('Parent organization'); // Assuming you have these columns
        const contractId = row.get('Contract ID');
        const nationalEnrollmentValue = row.get('National enrollment');
        const nationalEnrollment =
          nationalEnrollmentValue !== undefined
            ? parseFloat(nationalEnrollmentValue)
            : 0;

        // Construct tooltip string
        const tooltip = `${parentOrg}, ${contractId}, ${nationalEnrollment}, ${meanHR}, ${quintileHR}`;

        return [meanHR, quintileHR, tooltip];
      });

      setGraphingData([
        [
          '',
          'Parent organization, Contract ID, National enrollment, Mean due to HRA, Quintile due to HRA',
          { type: 'string', role: 'tooltip' },
        ],
        ...meanQuintileHR,
      ]);

      // Set chart titles with options
      const chartOptionsHR = {
        title: 'Coding Intensity Mean vs. Quintile Due to HRA',
        textAlign: 'center',
        tooltip: { isHtml: true },
        hAxis: { title: 'Mean' },
        vAxis: { title: 'Quintile' },
        legend: 'mean, quintile',
        width: 800,
        height: 380,
      };
      setOptions(chartOptionsHR);
    }

    if (selectedDataset === 'Mean vs. Quintile Due to HRA and CR') {
      // Extract "mean" and "quintile" columns for graphing
      const meanQuintileHRA_CR = yearData.map((row) => {
        const meanValueHRA_CR = row.get('mean_pct due to HRA_CR');
        const meanHRA_CR =
          meanValueHRA_CR !== undefined ? parseFloat(meanValueHRA_CR) : 0;
        const quintileValueHRA_CR = row.get('Quintile_pct due to HRA_CR');
        const quintileHRA_CR =
          quintileValueHRA_CR !== undefined
            ? parseFloat(quintileValueHRA_CR)
            : 0;

            const parentOrg = row.get('Parent organization'); // Assuming you have these columns
            const contractId = row.get('Contract ID');
            const nationalEnrollmentValue = row.get('National enrollment');
            const nationalEnrollment =
              nationalEnrollmentValue !== undefined
                ? parseFloat(nationalEnrollmentValue)
                : 0;
    
            // Construct tooltip string
            const tooltip = `${parentOrg}, ${contractId}, ${nationalEnrollment}, ${meanHRA_CR}, ${quintileHRA_CR}`;
    
            return [meanHRA_CR, quintileHRA_CR, tooltip];
          });
    
          setGraphingData([
            [
              '',
              'Parent organization, Contract ID, National enrollment, Mean due to HRA and CR, Quintile due to HRA and CR',
              { type: 'string', role: 'tooltip' },
            ],
            ...meanQuintileHRA_CR,
          ]);

      // Set chart titles with options
      const chartOptionsHR_CR = {
        title: 'Coding Intensity Mean vs. Quintile Due to HRA and CR',
        titleTextStyle: {
          textAlign: 'center',
        },
        hAxis: { title: 'Mean' },
        vAxis: { title: 'Quintile' },
        legend: 'mean, quintile',
        width: 800,
        height: 380,
      };
      setOptions(chartOptionsHR_CR);
    }
  };

  return (
    <div className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="mb-[3vh] mt-[5vh] min-h-[10vh]">
        <h1 className="text-4xl text-primary">View Data Visualizations</h1>
        <p className="pt-5 text-lg text-primary">
          Graphs display coding intensity of different parent organization
          contracts based on HRA and CR.{' '}
        </p>
        <hr className="border-3 mt-3 border border-primary opacity-75" />
      </div>
      <div className="menu flex items-center">
        <p className="mr-2 text-lg text-primary">Year:</p>
        <select
          className="mr-2 rounded border-2 p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All Years">All Years</option>
          {Array.from(allYears).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          {/* Add more years as needed */}
        </select>
        <p className="mr-2 text-lg text-primary">Dataset:</p>
        <select
          className="mr-2 rounded border-2 p-2"
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
        >
          <option value="Select Dataset">Select Dataset</option>
          <option value="Mean vs. Quintile Due to HRA">
            Mean vs. Quintile Due to HRA
          </option>
          <option value="Mean vs. Quintile Due to HRA and CR">
            Mean vs. Quintile Due to HRA and CR
          </option>
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
        <div className="graph-vis flex flex-row">
          <div className="left flex items-start justify-start">
            <Chart
              chartType="ScatterChart"
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
          <div className="right flex items-start justify-start">
            <button
              className="focus:shadow-outline font-regular rounded bg-primary-red px-4 py-2 text-white hover:bg-primary-red_light focus:outline"
              onClick={onEditClick}
              style={{ marginTop: '4.5rem', marginLeft: '3rem' }}
            >
              Edit Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
