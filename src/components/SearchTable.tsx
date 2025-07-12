import React, { useState } from 'react';
import { Search, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { petroleumData, calculatePriceChange } from './data/petroleumdata';


const SearchTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fuel type mapping with full names
  const fuelTypeNames: Record<string, string> = {
    'PMS': 'PMS (Premium Motor Spirit)',
    'AGO': 'AGO (Automotive Gas Oil)',
    'DPK': 'DPK (Dual Purpose Kerosene)',
    'LPG': 'LPG (Liquefied Petroleum Gas)'
  };

  // Convert petroleum data to table format - show all fuel types with real data
  const tableData = (() => {
    const latestDate = "2025-01-03";
    const previousDate = "2024-11-30";
    
    // Get all available fuel types from the data
    const fuelTypes = ['PMS', 'AGO', 'DPK', 'LPG'];
    
    return fuelTypes.map(fuelType => {
      // Calculate average prices for current and previous periods
      const currentData = petroleumData.filter(item => item.Period === latestDate);
      const previousData = petroleumData.filter(item => item.Period === previousDate);
      
      const currentAvg = currentData.reduce((sum, item) => sum + (item[fuelType as keyof typeof item] as number), 0) / currentData.length;
      const previousAvg = previousData.reduce((sum, item) => sum + (item[fuelType as keyof typeof item] as number), 0) / previousData.length;
      
      const priceChangeData = calculatePriceChange(currentAvg, previousAvg);
      
      // Generate chart data using actual price variations from the states
      const chartData = currentData.map(item => item[fuelType as keyof typeof item] as number);
      
      return {
        product: fuelTypeNames[fuelType],
        currentPrice: `₦${currentAvg.toFixed(2)}`,
        performance: `${priceChangeData.isPositive ? '+' : ''}${priceChangeData.change.toFixed(2)}`,
        percentage: `${priceChangeData.isPositive ? '+' : ''}${priceChangeData.percentage.toFixed(2)}%`,
        isPositive: priceChangeData.isPositive,
        chartData: chartData
      };
    });
  })();

  // Filter table data based on search term
  const filteredTableData = tableData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mini chart component for table rows
  const MiniChart = ({ data, isPositive }: { data: number[], isPositive: boolean }) => (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((value, index) => ({ index, value }))}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={isPositive ? '#10b981' : '#f59e0b'} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className=" shadow-lg overflow-hidden">
      <hr className='border-gray-800 my-4'/>
      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center">
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search fuel types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 rounded-full leading-5 !bg-black/50 placeholder-gray-500 focus:outline-none text-gray-100 focus:placeholder-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 focus:!bg-black/90"
            />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-black-50 to-black-50 ">
        <h3 className="text-base font-bold text-gray-400">Report: Week 34 2024</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-black/30 rounded-2xl shadow-lg">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-gray-700 bg-black/30">
              <th className="text-left px-6 py-4 font-semibold text-gray-400">Product retail price</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-400">Current Price</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-400">Performance</th>
              <th className="text-center px-6 py-4 font-semibold text-gray-400">7-Day Chart</th>
              <th className="text-center px-6 py-4 font-semibold text-gray-400">Required Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-400">{item.product}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-bold text-lg text-gray-400">{item.currentPrice}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className={`font-semibold ${item.isPositive ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {item.performance}
                    </span>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      item.isPositive 
                        ? 'bg-green-400 text-slate-200' 
                        : 'bg-orange-500 text-slate-200'
                    }`}>
                      {item.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{item.percentage}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <MiniChart data={item.chartData} isPositive={item.isPositive} />
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No results message */}
      {filteredTableData.length === 0 && (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">No fuel types found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SearchTable;

