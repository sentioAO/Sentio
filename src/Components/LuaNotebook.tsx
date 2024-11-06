import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/mode/lua/lua';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

interface NotebookCell {
  id: number;
  code: string;
}

interface Vulnerability {
  name: string;
  description: string;
  severity: string;
  line: number;
}

interface AnalysisResult {
  code_cell: string;
  vulnerabilities: Vulnerability[];
}

const LuaNotebook: React.FC = () => {
  const [cells, setCells] = useState<NotebookCell[]>([{ id: 1, code: '' }]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const addNewCell = () => {
    setCells((prevCells) => [...prevCells, { id: prevCells.length + 1, code: '' }]);
  };

  const deleteCell = (id: number) => {
    setCells((prevCells) => prevCells.filter((cell) => cell.id !== id));
  };

  const updateCell = (id: number, newCode: string) => {
    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, code: newCode } : cell))
    );
  };

  const analyzeCells = async () => {
    try {
      const codeCells = cells.map((cell) => cell.code);
      const response = await fetch('https://sam-offchain-dbedazdhd2dugrdk.eastus-01.azurewebsites.net/analyzecells', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code_cells: codeCells }),
      });
  
      if (response.ok) {
        const results = await response.json();
        setAnalysisResults(results);
      } else {
        console.error(`Failed to analyze cells: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error analyzing cells:', error);
    }
  };
  

  return (
    <div className="notebook-container flex flex-col space-y-4 p-4 w-full">
      <h1 className="text-2xl text-white font-bold mb-4">Sentio Notebook</h1>

      {cells.map((cell) => (
        <div key={cell.id} className="w-full flex flex-col bg-black rounded-lg shadow-lg p-4 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">Cell {cell.id}</h2>
            <button onClick={() => deleteCell(cell.id)} className="text-red-500 font-semibold">
              Delete Cell
            </button>
          </div>

          <ControlledEditor
            value={cell.code}
            onBeforeChange={(_, __, newValue) => updateCell(cell.id, newValue)}
            options={{
              mode: 'lua',
              theme: 'dracula',
              lineNumbers: true,
              tabSize: 2,
              lineWrapping: true,
            }}
            className="editor"
          />
        </div>
      ))}

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={addNewCell} className="bg-white  p-2 rounded-lg">
          Add New Cell
        </button>
        <button onClick={analyzeCells} className="gradient-button text-white p-2 rounded-lg">
          Analyze All Cells
        </button>
      </div>

      {analysisResults.length > 0 && (
        <div className="analysis-results mt-4 w-full app-background p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white">Analysis Results</h2>
          {analysisResults.map((result, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg mt-2">
              <h3 className="font-semibold text-white">Cell {index + 1}</h3>
              <pre className="bg-gray-900 text-white p-2 rounded-lg">{result.code_cell}</pre>
              {result.vulnerabilities.length > 0 ? (
                <ul className="list-disc list-inside text-red-400">
                  {result.vulnerabilities.map((vul, vulIndex) => (
                    <li key={vulIndex}>
                      <strong>{vul.name}</strong>: {vul.description} (Severity: {vul.severity}, Line: {vul.line})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-400">No vulnerabilities found.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LuaNotebook;
