import React from 'react';
import { Search, Bell, AlertTriangle, Sun, Moon, BarChart3, Plane, Coins, Zap } from 'lucide-react';
import PriceTable from '../components/PriceTable';
import PriceChart from '../components/PriceChart';
import SearchTable from '../components/SearchTable';

const Analysis: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [activeAnalysis, setActiveAnalysis] = React.useState('retail');

  const analysisTypes = [
    { id: 'retail', icon: BarChart3, label: 'Retail Price Analysis' },
    { id: 'flight', icon: Plane, label: 'Flight Analysis' },
    { id: 'deposits', icon: Coins, label: 'Deposits Analysis' },
    { id: 'power', icon: Zap, label: 'Power Analysis' },
    { id: 'cargo', icon: Zap, label: 'Cargo Analysis' },
    { id: 'rawdata', icon: Zap, label: 'Raw Data' },
  ];

  return (
    <div className="space-y-6 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-300">Analysis</h1>
          <p className="text-gray-400 mt-1">Thursday, February 15</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search Icon in Circle */}
          <button className="w-10 h-10 bg-slate-500 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>

          {/* Set Alert Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-full transition-colors">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Set Alert</span>
          </button>

          {/* Notification Bell in Circle */}
          <button className="w-10 h-10 bg-slate-500 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Light/Dark Mode Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center bg-green-900 hover:bg-green-700 rounded-full transition-colors"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
               isDarkMode ? 'bg-white text-green-200' : 'bg-gray-300 text-gray-600'
            }`}>
              <Moon className="w-4 h-4" />
              
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              !isDarkMode ? 'text-white' : ''
            }`}>
              <Sun className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Analysis Type Tabs */}
      <div className="flex items-center space-x-1 p-1 w-fit">
        {analysisTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveAnalysis(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
                activeAnalysis === type.id
                  ? ' text-green-600 shadow-sm'
                  : 'text-gray-400 hover:text-green-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PriceTable />
        <PriceChart />
      </div>
      
      <SearchTable />
    </div>
  );
};

export default Analysis;