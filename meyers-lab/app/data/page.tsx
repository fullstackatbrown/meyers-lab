'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Chart,
  GoogleChartControl,
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
} from 'react-google-charts';
import './page.css';

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
  const [singleRow, setSingleRow] = useState<boolean>(false);

  const chartRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (selectedDataset === 'Select Dataset') {
      alert('Please choose a dataset to display.');
    } else {
      setGraph(); // Update graphingData
      setShowDataVis(true); // Show the Chart component
    }
  };

  const handleReset = () => {
    const iframe = document.getElementById('spreadsheet-frame');
    if (iframe && iframe instanceof HTMLIFrameElement) {
      iframe.src =
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqpBW19SATAkybBihGekPuDSKmk7v_npEw2HisG2XAz2Q6TULnS-q9a8H05JKLxg/pubhtml?gid=93139773&amp;single=true&widget=false&headers=true&chrome=false'; // Reset the iframe by reassigning its source
      setSingleRow(false);
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
          possibleYears.add(row.get('Year') ?? ''); // Ensure we add a string value or empty string if undefined
        });
        setAllYears(possibleYears);
      } catch (error) {
        console.error('Error fetching data from Google Spreadsheet:', error);
      }
    };

    fetchData();
  }, []);

  const extractMeanQuintileData = (
    row: Map<string, string>,
    meanKey: string,
    quintileKey: string,
  ) => {
    const meanValue = row.get(meanKey);
    const mean = meanValue !== undefined ? parseFloat(meanValue) : 0;
    const quintileValue = row.get(quintileKey);
    const quintile =
      quintileValue !== undefined ? parseFloat(quintileValue) : 0;
    const parentOrg = row.get('Parent organization') ?? ''; // Assuming you have these columns
    const contractId = row.get('Contract ID') ?? '';
    const nationalEnrollmentValue = row.get('National enrollment');
    const nationalEnrollment =
      nationalEnrollmentValue !== undefined
        ? parseFloat(nationalEnrollmentValue)
        : 0;

    // Construct tooltip string
    const tooltip = `${parentOrg}, ${contractId}, ${nationalEnrollment}, ${mean}, ${quintile}`;

    return [mean, quintile, tooltip];
  };

  const extractNationalEnrollmentMeanData = (
    row: Map<string, string>,
    meanKey: string,
    quintileKey: string,
  ) => {
    const meanValue = row.get(meanKey);
    const mean = meanValue !== undefined ? parseFloat(meanValue) : 0;
    const quintileValue = row.get(quintileKey);
    const quintile =
      quintileValue !== undefined ? parseFloat(quintileValue) : 0;
    const parentOrg = row.get('Parent organization') ?? ''; // Assuming you have these columns
    const contractId = row.get('Contract ID') ?? '';
    const nationalEnrollmentValue = row.get('National enrollment');
    const nationalEnrollment =
      nationalEnrollmentValue !== undefined
        ? parseFloat(nationalEnrollmentValue)
        : 0;

    // Construct tooltip string
    const tooltip = `${parentOrg}, ${contractId}, ${nationalEnrollment}, ${mean}, ${quintile}`;

    return [mean, nationalEnrollment, tooltip];
  };

  const setGraph = () => {
    const legendHRA =
      'Parent organization, Contract ID, National enrollment, Mean due to HRAs, Quintile due to HRAs';
    const legendHRA_CR =
      'Parent organization, Contract ID, National enrollment, Mean due to HRAs and CRs, Quintile due to HRAs and CRs';

    let yearData = data; // Default to all years

    // Check if a specific year is selected
    if (selectedYear !== 'All Years') {
      // Filter data for the selected year
      yearData = data.filter((row) => row.get('Year') === selectedYear);
    }

    if (
      selectedDataset ===
      'Mean Increase in HCCs due to HRAs by Quintile of Increase'
    ) {
      // Extract "mean" and "quintile" columns for graphing
      const meanQuintileHR = yearData.map((row) => {
        return extractMeanQuintileData(
          row,
          'Mean_pct due to HRA',
          'Quintile_pct due to HRA',
        );
      });

      setGraphingData([
        ['', legendHRA, { type: 'string', role: 'tooltip' }],
        ...meanQuintileHR,
      ]);

      // Set chart titles with options
      const chartOptionsHR = {
        title: 'Mean Increase in HCCs due to HRAs by Quintile of Increase',
        textAlign: 'center',
        tooltip: { isHtml: true },
        hAxis: { title: 'Mean % Increase Due to HRAs' },
        vAxis: { title: 'Quintile % Increase Due to HRAs' },
        legend: true,
        width: 760,
        height: 400,
      };
      setOptions(chartOptionsHR);
    }

    if (
      selectedDataset ===
      'Mean Increase in HCCs due to HRAs and CRs by Quintile of Increase'
    ) {
      // Extract "mean" and "quintile" columns for graphing
      const meanQuintileHRA_CR = yearData.map((row) => {
        return extractMeanQuintileData(
          row,
          'Mean_pct due to HRA_CR',
          'Quintile_pct due to HRA_CR',
        );
      });

      setGraphingData([
        ['', legendHRA_CR, { type: 'string', role: 'tooltip' }],
        ...meanQuintileHRA_CR,
      ]);

      // Set chart titles with options
      const chartOptionsHR_CR = {
        title:
          'Mean Increase in HCCs due to HRAs and CRs by Quintile of Increase',
        titleTextStyle: {
          textAlign: 'center',
        },
        hAxis: { title: 'Mean % Increase Due to HRAs and CRs' },
        vAxis: { title: 'Quintile % Increase Due to HRAs and CRs' },
        legend: true,
        width: 760,
        height: 400,
      };
      setOptions(chartOptionsHR_CR);
    }

    if (
      selectedDataset === 'Mean Increase due to HRAs by National Enrollment'
    ) {
      // Extract "national enrollment" and "mean" columns for graphing
      const nationalEnrollmentMeanHR = yearData.map((row) => {
        return extractNationalEnrollmentMeanData(
          row,
          'Mean_pct due to HRA',
          'Quintile_pct due to HRA',
        );
      });

      setGraphingData([
        ['', legendHRA, { type: 'string', role: 'tooltip' }],
        ...nationalEnrollmentMeanHR,
      ]);

      // Set chart titles with options
      const chartOptionsHR = {
        title: 'Mean Increase due to HRAs by National Enrollment',
        textAlign: 'center',
        tooltip: { isHtml: true },
        hAxis: { title: 'National Enrollment' },
        vAxis: { title: 'Mean % Increase Due to HRAs' },
        legend: true,
        width: 760,
        height: 400,
      };
      setOptions(chartOptionsHR);
    }

    if (
      selectedDataset ===
      'Mean Increase due to HRAs and CRs by National Enrollment'
    ) {
      // Extract "national enrollment" and "mean" columns for graphing
      const nationalEnrollmentMeanHRA_CR = yearData.map((row) => {
        return extractNationalEnrollmentMeanData(
          row,
          'Mean_pct due to HRA_CR',
          'Quintile_pct due to HRA_CR',
        );
      });

      setGraphingData([
        ['', legendHRA_CR, { type: 'string', role: 'tooltip' }],
        ...nationalEnrollmentMeanHRA_CR,
      ]);

      // Set chart titles with options
      const chartOptionsHRA_CR = {
        title: 'Mean Increase due to HRAs and CRs by National Enrollment',
        textAlign: 'center',
        tooltip: { isHtml: true },
        hAxis: { title: 'National Enrollment' },
        vAxis: { title: 'Mean % Increase Due to HRAs and CRs' },
        legend: true,
        width: 760,
        height: 400,
      };
      setOptions(chartOptionsHRA_CR);
    }
  };


  return (
    <div className="ml-3 flex h-full min-h-screen w-[98vw] flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="mb-[3vh] mt-[5vh] min-h-[10vh]">
        <h1 className="text-4.5xl-responsive text-primary font-bold">Data Visualizations</h1>
        <p className="pt-5 text-lg text-primary">
          The chart maker below displays our metrics of coding intensity by
          several different parameters.
        </p>
        <hr className="border-3 mt-3 border border-primary opacity-75" />
      </div>
      <div className="menu flex flex-wrap items-center">
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
          <option value="Mean Increase in HCCs due to HRAs by Quintile of Increase">
            Mean Increase in HCCs due to HRAs by Quintile of Increase
          </option>
          <option value="Mean Increase in HCCs due to HRAs and CRs by Quintile of Increase">
            Mean Increase in HCCs due to HRAs and CRs by Quintile of Increase
          </option>
          <option value="Mean Increase due to HRAs by National Enrollment">
            Mean Increase due to HRAs by National Enrollment
          </option>
          <option value="Mean Increase due to HRAs and CRs by National Enrollment">
            Mean Increase due to HRAs and CRs by National Enrollment
          </option>
          {/* Add more dataset options as needed */}
        </select>
        <div className="submit-button">
          <button
            className="font-regular rounded bg-primary-red px-4 py-2 mr-2 text-white hover:bg-primary-red_light focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {singleRow && (
          <div className='reset-button'>
            <button
              className="font-regular bg-primary hover:bg-primary_light rounded px-4 py-2 text-white focus:outline-none"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          )}
      </div>

      {showDataVis && (
        <div className="graph-vis flex flex-row items-center justify-start">
          <div className="left flex items-start justify-start">
            <div className="relative-container" ref={chartRef}>
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
                chartEvents={[
                  {
                    eventName: 'select',
                    callback: ({ chartWrapper, google }) => {
                      const chart = chartWrapper.getChart();
                      const selection = chart.getSelection();
                      if (selection.length > 0) {
                        const row = selection[0].row;
                        const rowData = graphingData[row + 1]; // +1 to skip the header row
                        const tooltip = rowData[2];

                        // Extract identifier from the tooltip
                        const tooltipItems = tooltip.split(',');
                        let identifier = tooltipItems[1].trim(); // Assuming Contract ID is second in the tooltip

                        // Check if the identifier matches the format (Letter followed by any number 0-9)
                        const regex = /^[A-Z]\d+$/;
                        if (
                          !regex.test(identifier) &&
                          tooltipItems.length > 2
                        ) {
                          identifier = tooltipItems[2].trim(); // Use the next item in the tooltip list
                        }

                        // Update iframe URL to scroll to the identified row
                        const iframe =
                          document.getElementById('spreadsheet-frame');
                        if (iframe && iframe instanceof HTMLIFrameElement) {
                          const range = `${row + 2}:${row + 2}`; // Construct range based on selected row
                          iframe.src = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQqpBW19SATAkybBihGekPuDSKmk7v_npEw2HisG2XAz2Q6TULnS-q9a8H05JKLxg/pubhtml?gid=93139773&amp;single=true&widget=false&headers=true&chrome=false&range=${range}`;
                          setSingleRow(true);
                        }
                      }
                    },
                  },
                ]}
              />
            </div>
          </div>
          <div className="right flex items-start justify-start">
            <div className="relative-container">
              <iframe
                id="spreadsheet-frame"
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQqpBW19SATAkybBihGekPuDSKmk7v_npEw2HisG2XAz2Q6TULnS-q9a8H05JKLxg/pubhtml?gid=93139773&amp;single=true&widget=false&headers=true&chrome=false"
                width="600"
                height="325"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
