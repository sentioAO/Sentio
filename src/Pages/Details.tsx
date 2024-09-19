import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportDetails from '../Components/ReportDetails';
import Footer from '../Components/Footer';

// Define the ReportItem type
export interface ReportItem {
  description: string;
  line: number;
  name: string;
  pattern: string;
  severity: string;
}

const ReportDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the type for location state
  interface LocationState {
    report: ReportItem[];
  }

  const { report } = location.state as LocationState; // Cast location.state to LocationState

  const highSeverityItems: ReportItem[] = report.filter(item => item.severity.toLowerCase() === 'high');
  const mediumSeverityItems: ReportItem[] = report.filter(item => item.severity.toLowerCase() === 'medium');
  const lowSeverityItems: ReportItem[] = report.filter(item => item.severity.toLowerCase() === 'low');

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Detailed Report</h2>
        <button className="bg-[#3b3f5c] text-sm px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col flex-grow-0">
          <ReportDetails
            reportItems={highSeverityItems}
            severityLabel="High Severity"
            severityColor="bg-red-500"
          />
        </div>
        <div className="flex flex-col flex-grow-0">
          <ReportDetails
            reportItems={mediumSeverityItems}
            severityLabel="Medium Severity"
            severityColor="bg-yellow-500"
          />
        </div>
        <div className="flex flex-col flex-grow-0">
          <ReportDetails
            reportItems={lowSeverityItems}
            severityLabel="Low Severity"
            severityColor="bg-green-500"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportDetailsPage;
