import React from 'react';
import { useParams } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { processId } = useParams<{ processId: string }>(); // Explicitly type params

  return (
    <div className="app-background text-white  p-6" style={{fontFamily:"'Roboto'"}}>
      <h1 className="text-2xl font-bold">Process Details for ID: {processId}</h1>
      {/* Add more details or functionality here */}
    </div>
  );
};

export default Dashboard;
    