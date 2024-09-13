import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/mode/lua/lua'; // Import Lua mode
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';  // Optional: import a theme

const CodeEditor: React.FC<{ value: string, onChange: (value: string) => void, onAnalyze: () => void }> = ({ value, onChange, onAnalyze }) => {
    const [language] = useState('lua'); // Only Lua language available
    console.log(language);

    return (
        <div className="editor-container bg-[#1E1E1E] rounded-xl shadow-md max-w-4xl px-4 w-full">
            {/* Top section with Lua Code Editor and Analyze button */}
            <div className="bg-[#1E1E1E] text-white rounded-xl flex justify-between items-center">
                <h2 className="text-xl p-4 font-bold">SENTIO ANALYSIS</h2>
                <button 
                    onClick={onAnalyze} 
                    className="bg-transparent border border-[#a09e9e] rounded-xl p-1 px-5 text-white font-semibold rounded-lg hover:bg-black"
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
                    scrollbarStyle: null, // Ensure scrollbar styles are set to null to avoid default scrollbars
                }}
                className="editor bg-transparent border border-[#1E1E1E] rounded-b-lg no-scroll"
            />
        </div>
    );
};

export default CodeEditor;
