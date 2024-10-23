import { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import CodeEditor from "../Components/TextEditor";
import ReportCard, { ReportItem } from "../Components/ReportCard";
import axios from 'axios';
import qs from 'qs';
import { motion } from 'framer-motion';
import Footer from "../Components/Footer";

const Offchain = () => {
  const [code, setCode] = useState('');
  const [report, setReport] = useState<null | ReportItem[]>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progress, setProgress] = useState(0);
  // const [isGitHubImport, setIsGitHubImport] = useState(false); // To handle GitHub import

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
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error analyzing code:', error);
    } finally {
      setShowProgress(false);
      setProgress(0);
    }
  };

  const handleGoBack = () => {
    setReport(null);
  };

  const handleGitHubImport = async () => {
    // setIsGitHubImport(true); // Switch to GitHub import mode

    // You need to implement OAuth or GitHub API logic to get the file content.
    // For demo purposes, we simulate importing a Lua file:
    const luaFileContent = "-- This is a sample Lua file imported from GitHub";
    setCode(luaFileContent); // Set the imported Lua code
  };

  const handleWriteCode = () => {
    // setIsGitHubImport(false); // Switch to code writing mode
  };

  const faqRef = useRef<HTMLDivElement | null>(null);
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="app-background min-h-screen flex flex-col items-center">
      <Navbar faqRef={faqRef} howItWorksRef={howItWorksRef} />
      
      <div className="flex flex-col justify-center items-center mt-10 space-y-4 w-full max-w-4xl">
        {/* Buttons to switch between Write Code and Import from GitHub */}
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleWriteCode}
          >
            Write Code
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleGitHubImport}
          >
            Import from GitHub
          </button>
        </div>

        {/* Progress bar */}
        {showProgress && !report ? (
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-800 rounded-lg overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              />
            </div>
            <div className="text-center mt-4 text-gray-300 font-mono">{progressText}</div>
          </div>
        ) : !report ? (
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            onAnalyze={handleAnalyze}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ReportCard report={report} onGoBack={handleGoBack} />
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 flex w-[88%] justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Offchain;
