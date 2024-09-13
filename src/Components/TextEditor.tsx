import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/mode/lua/lua'; // Import Lua mode
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';  // Optional: import a theme

const CodeEditor: React.FC<{ value: string, onChange: (value: string) => void, onAnalyze: () => void }> = ({ value, onChange, onAnalyze }) => {
    const [language] = useState('lua'); // Only Lua language available
    console.log(language)
    return (
        <div className="editor-container bg-gray-200  rounded-lg shadow-md max-w-4xl w-full">
            {/* Top section with Lua Code Editor and Analyze button */}
            <div className="bg-[#1E1E1E] text-white  rounded-t-lg flex justify-between items-center ">
                <h2 className="text-xl p-4 font-bold">Lua Code Editor</h2>
                <button 
                    onClick={onAnalyze} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                >
                    Analyze
                </button>
            </div>
            
            {/* Code editor with gray border */}
            <ControlledEditor
                value={value}
                onBeforeChange={(editor, data, newValue) => {
                    onChange(newValue);
                    console.log(editor, data, newValue);
                }}
                options={{
                    mode: 'lua',
                    theme: 'dracula',
                    lineNumbers: true,
                    tabSize: 2,
                }}
                className="editor bg-transparent border border-[#1E1E1E] rounded-b-lg"
            />
        </div>
    );
};

export default CodeEditor;
