import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your petrodata dashboard</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
          <p className="text-gray-600">Dashboard content will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;