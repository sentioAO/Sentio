import { useState } from "react";
import Navbar from "../Components/Navbar";
import CodeEditor from "../Components/TextEditor";
import ReportCard, { ReportItem } from "../Components/ReportCard";
import axios from 'axios';
import qs from 'qs';

const Offchain = () => {
  const [code, setCode] = useState('');
  const [report, setReport] = useState<null | ReportItem[]>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState('');

  const handleCodeChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleAnalyze = async () => {
    setShowProgress(true);
    setProgressText('Creating AST for code');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgressText('Analyzing');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgressText('Finding vulnerabilities');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgressText('Checking leaks');
    await new Promise(resolve => setTimeout(resolve, 750));

    try {
      const response = await axios.post('https://sam-offchain-dbedazdhd2dugrdk.eastus-01.azurewebsites.net/analyze', 
        qs.stringify({ code }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log("Analysis result:", response.data);
      setReport(response.data); // Set the report after analysis
    } catch (error) {
      console.error('Error analyzing code:', error);
    } finally {
      setShowProgress(false);
    }
  };

  return (
    <div className="app-background h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10 space-y-4 w-full max-w-4xl">
        {showProgress && !report ? (
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
              <div className="h-full bg-green-600 transition-all duration-500" style={{ width: '100%' }} />
            </div>
            <div className="text-center mt-2 text-gray-700">{progressText}</div>
          </div>
        ) : (
          !report && <CodeEditor 
            value={code} 
            onChange={handleCodeChange} 
            onAnalyze={handleAnalyze} 
          />
        )}
        {report && (
          <ReportCard report={report} /> // Render report card after progress
        )}
      </div>
    </div>
  );
};

export default Offchain;
