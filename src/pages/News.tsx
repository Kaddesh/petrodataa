import React from 'react';

const News: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">News & Report</h1>
        <p className="text-gray-600 mt-1">Latest news and industry reports</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">News & Reports</h2>
          <p className="text-gray-600">News and reports content will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default News;