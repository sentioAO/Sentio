import { useRef, useState, useEffect } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [path, setPath] = useState('');
  const [importError, setImportError] = useState('');

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

  const isValidPath = (path: string) => {
    return /\.(lua|luanb)$/.test(path);
  };

  const handleGitHubImport = () => {
    setIsModalOpen(true);
  };

  const handleImportSubmit = async () => {
    if (!isValidPath(path)) {
      setImportError('Only .lua or .luanb files are allowed');
      return;
    }

    setShowProgress(true);
    setProgress(25);
    setProgressText('Authenticating with GitHub');
    setImportError('');

    try {
      // First get the access token from local storage
      const accessToken = localStorage.getItem('github_access_token');

      // If access token doesn't exist, redirect to GitHub for authorization
      if (!accessToken) {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo`;
        return;
      }

      setProgress(50);
      setProgressText('Fetching file content');

      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      });

      setProgress(100);
      setProgressText('Loading file content');
      setCode(response.data);
      setIsModalOpen(false);
      setOwner('');
      setRepo('');
      setPath('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setImportError(error.response?.data?.message || 'Failed to import file');
      } else {
        setImportError('Failed to import file');
      }
    } finally {
      setShowProgress(false);
      setProgress(0);
    }
  };

  const handleWriteCode = () => {
    setCode('');
  };

  const faqRef = useRef<HTMLDivElement | null>(null);
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  // Handle GitHub authentication callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const fetchAccessToken = async () => {
        try {
          const authResponse = await axios.post('http://localhost:3000/api/github/exchange-code', { code });
          const token = authResponse.data.access_token;

          // Save the access token in local storage
          localStorage.setItem('token', token);

          // Redirect to the same page without the code query parameter
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error exchanging code for access token:', error);
        }
      };

      fetchAccessToken();
    }
  }, []);

  return (
    <div className="app-background min-h-screen flex flex-col items-center">
      <Navbar faqRef={faqRef} howItWorksRef={howItWorksRef} />
      
      <div className="flex flex-col justify-center items-center mt-10 space-y-4 w-full max-w-4xl">
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

        {/* GitHub Import Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-lg max-w-md w-full p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white">Import from GitHub</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Repository Owner</label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="e.g., username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Repository Name</label>
                  <input
                    type="text"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="e.g., project-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">File Path</label>
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="e.g., src/file.lua"
                  />
                  {importError && <p className="text-red-500 text-sm">{importError}</p>}
                </div>

                <button
                  onClick={handleImportSubmit}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Import
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Offchain;
