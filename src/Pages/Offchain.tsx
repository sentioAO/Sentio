/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CodeEditor from "../Components/TextEditor";
import ReportCard, { ReportItem } from "../Components/ReportCard";
import axios from 'axios';
import qs from 'qs';
import { motion } from 'framer-motion';
import Footer from "../Components/Footer";
import { HeroHighlightDemo } from "../Components/Hero";



interface Repository {
  id: number;
  name: string;
  full_name: string;
}

const Offchain = () => {
  const [code, setCode] = useState('');
  const [report, setReport] = useState<null | ReportItem[]>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
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

  const handleGitHubImport = () => {
    const accessToken = localStorage.getItem('github_access_token');
    if (!accessToken) {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23li9yd222KkA5HpSF&scope=repo`;
    } else {
      fetchUserRepos(accessToken);
      setIsModalOpen(true);
    }
  };
  const handleImportSubmit = async () => {
    if (!selectedFile) {
      setImportError('Please select a file to import.');
      return;
    }

    if (!/\.(lua|luanb)$/.test(selectedFile)) {
      setImportError('Selected file must be a .lua or .luanb file.');
      return;
    }

    setShowProgress(true);
    setProgress(25);
    setProgressText('Fetching file content');
    setImportError('');

    try {
      const accessToken = localStorage.getItem('github_access_token');

      if (!accessToken) {
        setImportError('Authentication required.');
        return;
      }

      setProgress(50);
      const response = await axios.get(`https://api.github.com/repos/${selectedRepo}/contents/${selectedFile}`, {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      });
      const content = response.data;
      setProgress(100);
      setProgressText('Loading file content');
      setCode(content);
      setIsModalOpen(false);
      setSelectedRepo('');
      setSelectedFile('');
    } catch (error) {
      console.error('Error importing file:', error);
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


  const fetchUserRepos = async (accessToken: string) => {

    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
        params: {
          per_page: 100

        }
      });
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const fetchRepoFiles = async (repo: string) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}/contents`, {
        headers: {
          Authorization: `token ${localStorage.getItem('github_access_token')}`,
        },
      });
      const luaFiles = response.data
        .filter((file: any) => /\.(lua|luanb)$/.test(file.name))
        .map((file: any) => file.path);
      setFiles(luaFiles);
    } catch (error) {
      console.error('Error fetching repo files:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        try {
          const authResponse = await axios.post('https://sam-server.azurewebsites.net/api/github/exchange-code', { code });
          const token = authResponse.data.access_token;

          localStorage.setItem('github_access_token', token);
          await fetchUserRepos(token);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error exchanging code for access token:', error);
        }
      };

      fetchAccessToken();
    } else {
      const accessToken = localStorage.getItem('github_access_token');
      if (accessToken) {
        fetchUserRepos(accessToken);
      }
    }
  }, []);

  return (
    <div className="app-background min-h-screen flex flex-col items-center">

      <Navbar />

      <div className="flex flex-col justify-center items-center mt-10 space-y-4 w-full max-w-4xl">
      <div className="flex space-x-4">

        <div className="mt-[-5]">

      <HeroHighlightDemo />
        </div>
      

      </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl text-[#9966ff] font-semibold mb-4">Select a Repository</h2>
        <select
        className="border rounded px-3 py-2 w-full mb-4"
        value={selectedRepo}
        onChange={(e) => {
        setSelectedRepo(e.target.value);
        fetchRepoFiles(e.target.value);
        }}
        >
        <option value="">Select a repository</option>
        {repositories.map((repo) => (
        <option key={repo.id} value={repo.full_name}>
        {repo.name}
        </option>
        ))}
        </select>
        {selectedRepo && (
        <>
        <select
        className="border rounded px-3 py-2 w-full mb-4"
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
        >
        <option value="">Select a file</option>
        {files.map((file) => (
          <option key={file} value={file}>
        {file}
          </option>
        ))}
        </select>
        {importError && (
        <p className="text-red-500 text-sm">{importError}</p>
        )}
        </>
        )}
        <div className="flex justify-end space-x-2 mt-4">
        <button
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => setIsModalOpen(false)}
        >
        Cancel
        </button>
        <button
        className="bg-[#9966ff] text-white px-4 py-2 rounded hover:text-gray-800"
        onClick={handleImportSubmit}
        >
        Import
        </button>
        </div>
      </motion.div>
        </div>

      )}
      <button
        className={`bg-gray-800 text-white font-medium px-4 py-2 rounded-md border border-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ${code.trim() !== '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleGitHubImport}
        disabled={code.trim() !== ''}
      >
        <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.6c.4.08.55-.17.55-.38v-1.34c-2.23.48-2.69-1.07-2.69-1.07-.36-.91-.88-1.15-.88-1.15-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.51.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.97 0-.88.31-1.6.82-2.16-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.16 0 3.09-1.87 3.76-3.65 3.96.29.25.54.74.54 1.5v2.22c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Import from GitHub
      </button>
      </div>
      
      <Footer />
      
    </div>
  );
};

export default Offchain;
