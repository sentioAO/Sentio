import { useState } from "react";
import Navbar from "../Components/Navbar";
import CodeEditor from "../Components/TextEditor";
import ReportCard, { ReportItem } from "../Components/ReportCard";
import axios from 'axios';
import qs from 'qs';
import { motion } from 'framer-motion'; // Import framer-motion

const Offchain = () => {
  const [code, setCode] = useState('');
  const [report, setReport] = useState<null | ReportItem[]>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progress, setProgress] = useState(0); // Add a progress state to control the progress bar

  const handleCodeChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleAnalyze = async () => {
    setShowProgress(true);
    setProgress(25);
    setProgressText('Creating AST for code');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(50);
    setProgressText('Analyzing');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(75);
    setProgressText('Finding vulnerabilities');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(100);
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
      setProgress(0); // Reset progress after analysis is done
    }
  };

  const handleGoBack = () => {
    setReport(null); // Reset report to null to go back to CodeEditor
  };

  console.log("Current report state:", report);

  return (
    <div className="app-background min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10 space-y-4 w-full max-w-4xl">
        {showProgress && !report ? (
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-800 rounded-lg overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }} // Animate width based on the progress state
                transition={{ duration: 0.75, ease: "easeInOut" }} // Smooth transition
              />
            </div>
            <div className="text-center mt-4 text-gray-300 font-mono">{progressText}</div> {/* Monospace font */}
          </div>
        ) : !report ? (
          <CodeEditor 
            value={code} 
            onChange={handleCodeChange} 
            onAnalyze={handleAnalyze} 
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Start invisible and slightly below the screen
            animate={{ opacity: 1, y: 0 }} // Fade in and slide up
            transition={{ duration: 0.5, ease: "easeInOut" }} // Duration and easing
          >
            <ReportCard report={report} onGoBack={handleGoBack} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Offchain;
