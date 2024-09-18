import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaExclamationTriangle, FaCheckCircle, FaBug, FaSkull, FaCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

ChartJS.register(ArcElement, Tooltip, Legend);

export interface ReportItem {
  description: string;
  line: number;
  name: string;
  pattern: string;
  severity: string;
}

interface ReportCardProps {
  report: ReportItem[];
  onGoBack: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onGoBack }) => {
  const navigate = useNavigate();  // Use navigate hook

  const highSeverityItems = report.filter(item => item.severity.toLowerCase() === 'high');
  const mediumSeverityItems = report.filter(item => item.severity.toLowerCase() === 'medium');
  const lowSeverityItems = report.filter(item => item.severity.toLowerCase() === 'low');

  const highSeverity = highSeverityItems.length;
  const mediumSeverity = mediumSeverityItems.length;
  const lowSeverity = lowSeverityItems.length;

  const totalLinesOfCode = Math.max(...report.map(item => item.line), 0);
  const uniqueVulnerableLines = new Set(report.map(item => item.line)).size;
  const vulnerableCodePercentage = totalLinesOfCode
    ? ((uniqueVulnerableLines / totalLinesOfCode) * 100).toFixed(2)
    : '0';

  let summaryText = '';
  if (highSeverity > 0 && mediumSeverity > 0 && lowSeverity > 0) {
    summaryText = 'Your code contains critical vulnerabilities, and it is recommended to rewrite the logic entirely.';
  } else if (highSeverity === 0 && mediumSeverity > 0) {
    summaryText = 'Your code is apt for production after proper refactoring.';
  } else if (highSeverity === 0 && mediumSeverity === 0 && lowSeverity > 0) {
    summaryText = 'Your code is okay for testing with alpha users.';
  } else if (highSeverity === 0 && mediumSeverity === 0 && lowSeverity === 0) {
    summaryText = 'Your code is production ready.';
  }

  const threatChecklist = [
    { label: 'Does the code allow reentrancy?', exists: report.some(item => item.name.toLowerCase() === 'reentrancy') },
    { label: 'Is there a floating pragma issue?', exists: report.some(item => item.name.toLowerCase() === 'floating pragma') },
    { label: 'Are there unchecked external calls?', exists: report.some(item => item.name.toLowerCase() === 'unchecked external calls') },
    { label: 'Does the code have integer overflow or underflow vulnerabilities?', exists: report.some(item => ['integer overflow', 'integer underflow'].includes(item.name.toLowerCase())) },
    { label: 'Is there a denial of service vulnerability?', exists: report.some(item => item.name.toLowerCase() === 'denial of service') },
  ];

  const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: '# of Vulnerabilities',
        data: [highSeverity, mediumSeverity, lowSeverity],
        backgroundColor: ['#FF0000', '#ffcc00', 'green'],
        hoverBackgroundColor: ['#FF0000', '#ffcc00', '#36a2eb'],
        cutout: '70%',
        borderWidth: 0,
      },
    ],
  };

  // Navigate to the report details page when button is clicked
  const goToReportDetails = () => {
    navigate('/report-details', { state: { report } }); // Pass the report data via state
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1E1E1E] text-white p-4 rounded-lg shadow-lg" style={{ fontFamily: "'Roboto'" }}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Summary + Security Assessment</h2>
          <button className="bg-[#3b3f5c] text-sm px-4 py-2 rounded-lg" onClick={onGoBack}>
            Go Back
          </button>
        </div>
        <p className="mb-4 text-gray-300" style={{ fontFamily: "'Roboto'" }}>
          {summaryText}
        </p>

        {/* Doughnut chart and analysis summary */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          {/* Code Analysis Summary */}
          <div className="flex-1 bg-[#2E2E2E] p-4 rounded-lg shadow-md mb-4 sm:mb-0">
            <h3 className="text-xl font-semibold mb-2">Code Analysis Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCode className="text-purple-500" />
                <div className="text-white text-lg">
                  Total Lines of Code: <strong>{totalLinesOfCode}</strong>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaBug className="text-red-500" />
                <div className="text-white text-lg">
                  Lines with Vulnerabilities: <strong>{uniqueVulnerableLines}</strong>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaSkull className="text-yellow-500" />
                <div className="text-white text-lg">
                  Vulnerable Code Percentage: <strong>{vulnerableCodePercentage}%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities Discovered */}
          <div className="flex-1 bg-[#2E2E2E] p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Vulnerabilities Discovered</h3>
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
              <div className="w-full sm:w-1/2">
                <Doughnut data={data} />
              </div>
              <div className="w-full sm:w-1/2 sm:ml-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <FaSkull className="text-red-500" />
                  <div className="bg-red-500 text-white px-2 py-1 rounded-lg">
                    {highSeverity} High
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
                    {mediumSeverity} Medium
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <div className="bg-green-500 text-white px-2 py-1 rounded-lg">
                    {lowSeverity} Low
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Model */}
        <div className="bg-[#2E2E2E] p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 bg-slate-700 px-4 py-1 rounded-lg">Generated Threat Model</h3>
          <ul className="text-gray-300 text-sm pl-5">
            {threatChecklist.map((check, index) => (
              <li key={index}>
                {check.exists ? (
                  <span className="text-red-500">✔️</span>
                ) : (
                  <span className="text-green-500">✖️</span>
                )}{' '}
                {check.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Report Details Button */}
      <div className="mt-4 text-right">
        <button className="bg-[#3b3f5c] text-sm px-4 py-2 rounded-lg" onClick={goToReportDetails}>
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
