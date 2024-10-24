import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { ReportItem, ReportStats } from '../Components/ReportCard'; // Ensure this interface is shared

const Certificate: React.FC = () => {
    const location = useLocation(); // Use useLocation to get the state passed from navigation
    const { report, reportStats }: { report: ReportItem[], reportStats: ReportStats } = location.state || { report: [], reportStats: null }; // Extract report and reportStats

    return (
        <div className="p-10 bg-gray-100 border border-gray-300 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-4xl text-center font-bold text-blue-500 mb-4">Code Audit Report</h1>
            <h2 className="text-2xl text-center font-semibold text-gray-700 mb-8">Certificate of Analysis</h2>

            {/* Report Stats Section */}
            {reportStats && (
                <div className="bg-white p-6 mb-8 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-3xl font-bold text-center text-blue-600 mb-4">Summary of Code Audit</h3>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        Total Lines of Code: <span className="text-purple-600">{reportStats.totalLinesOfCode}</span>
                    </p>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        Vulnerable Lines of Code: <span className="text-red-600">{reportStats.uniqueVulnerableLines}</span>
                    </p>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        Vulnerable Code Percentage: <span className="text-yellow-500">{reportStats.vulnerableCodePercentage}%</span>
                    </p>
                    
                    <div className="grid grid-cols-3 gap-6 text-center mt-4">
                        <div>
                            <p className="text-lg font-semibold text-red-600">High Severity</p>
                            <p className="text-2xl">{reportStats.highSeverity}</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-yellow-500">Medium Severity</p>
                            <p className="text-2xl">{reportStats.mediumSeverity}</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-green-500">Low Severity</p>
                            <p className="text-2xl">{reportStats.lowSeverity}</p>
                        </div>
                    </div>

                    <h4 className="text-xl font-semibold text-gray-800 mt-6">Threat Checklist</h4>
                    <ul className="text-gray-700 list-disc ml-5 mt-2">
                        {reportStats.threatChecklist.map((check, index) => (
                            <li key={index}>
                                {check.exists ? (
                                    <span className="text-red-600">✔</span>
                                ) : (
                                    <span className="text-green-500">✘</span>
                                )} {check.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Report Items Section */}
            <div className="grid grid-cols-1 gap-6">
                {report.map((item: ReportItem, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                        <p className="text-gray-700 font-semibold">Issue: <span className="text-red-500">{item.name}</span></p>
                        <p className="text-gray-700">Description: {item.description}</p>
                        <p className="text-gray-700">Pattern: {item.pattern}</p>
                        <p className="text-gray-700">Line: {item.line}</p>
                        <p className={`font-semibold ${item.severity === 'high' ? 'text-red-600' : item.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                            Severity: {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Overall Conclusion Section */}
            <div className="bg-white p-6 mt-8 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-center text-blue-600">Overall Conclusion</h3>
                <p className="text-lg text-center text-gray-700 mt-4">
                    Based on the results of the audit, your code contains{' '}
                    {reportStats.highSeverity > 0 ? 'critical' : reportStats.mediumSeverity > 0 ? 'moderate' : 'minor'}
                    {' '}vulnerabilities. Please address the high severity issues immediately before deploying the code to production.
                </p>
            </div>
        </div>
    );
};

export default Certificate;
