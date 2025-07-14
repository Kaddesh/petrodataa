import React, { useState } from 'react';
import { Download, ChevronDown, Check, Share, X, Copy, TrendingUp } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getFuelTypes, getRegions, getStates } from './data/petroleumdata';


interface TooltipPayload {
  value: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const PriceChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('PMS');
  const [selectedPrice, setSelectedPrice] = useState('Price');
  const [showModal, setShowModal] = useState(false);
  
  // Dropdown states
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const periods = ['1D', '1W', '1M', '3M', '6M', 'YTD', 'ALL'];
  const fuelTypes = getFuelTypes();
  const regions = ['All', ...getRegions().slice(0, 5)];
  const states = ['All', ...getStates().slice(0, 5)];
  const priceOptions = ['Price', 'Low', 'High', 'Medium'];

  // Generate different data based on selected period
  const generateDataForPeriod = (period: string) => {
    const basePrice = selectedFuel === 'PMS' ? 1052 : 
                     selectedFuel === 'AGO' ? 1200 : 
                     selectedFuel === 'DPK' ? 1350 : 1400;
    let dataPoints = 30;
    
    switch (period) {
      case '1D':
        dataPoints = 24;
        break;
      case '1W':
        dataPoints = 7;
        break;
      case '1M':
        dataPoints = 30;
        break;
      case '3M':
        dataPoints = 90;
        break;
      case '6M':
        dataPoints = 180;
        break;
      case 'YTD':
        dataPoints = 365;
        break;
      case 'ALL':
        dataPoints = 730;
        break;
    }

    const data = [];
    let currentPrice = basePrice - (Math.random() * 40 - 20);
    
    for (let i = 0; i < dataPoints; i++) {
      const volatility = (Math.random() - 0.5) * (period === '1D' ? 2 : 8);
      const trend = Math.sin(i * 0.05) * (period === '1D' ? 1 : 5);
      const momentum = (Math.random() - 0.45) * (period === '1D' ? 1 : 3);
      
      currentPrice += volatility + trend + momentum;
      currentPrice = Math.max(650, Math.min(780, currentPrice));
      
      data.push({
        index: i,
        price: parseFloat(currentPrice.toFixed(2)),
        volume: Math.random() * 1000000 + 500000,
      });
    }
    
    return data;
  };

  const chartData = generateDataForPeriod(selectedPeriod);

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700">
          <p className="text-lg font-bold text-green-400">
            ₦{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = () => (
    <div className="h-80 mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="index" 
            axisLine={false}
            tickLine={false}
            tick={false}
            hide={true}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={false}
            hide={true}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#colorPrice)"
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: '#10b981',
              stroke: '#ffffff',
              strokeWidth: 3,
              filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const CustomDropdown = ({ 
    options, 
    selected, 
    onSelect, 
    show, 
    onToggle, 
    placeholder 
  }: {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    show: boolean;
    onToggle: () => void;
    placeholder: string;
  }) => (
    <div className="relative min-w-0">
      <button
        onClick={onToggle}
        className="appearance-none text-green-900 px-1 py-2 text-xs sm:text-sm font-medium cursor-pointer transition-all flex items-center space-x-1 sm:space-x-2 whitespace-nowrap"
      >
        <span className="truncate">{selected === 'All' ? placeholder : selected}</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </button>
      
      {show && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-[9999] min-w-[120px] sm:min-w-[140px]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="truncate">{option}</span>
              {option === selected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const PriceDropdown = () => (
    <div className="relative min-w-0">
      <button
        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
        className="text-xs sm:text-sm font-medium text-green-700 flex items-center space-x-1 sm:space-x-2 transition-colors whitespace-nowrap"
      >
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-sm flex-shrink-0"></div>
        <span className="truncate">{selectedPrice}</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </button>
      
      {showPriceDropdown && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] min-w-[100px] sm:min-w-[120px]">
          {priceOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedPrice(option);
                setShowPriceDropdown(false);
              }}
              className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-sm flex-shrink-0"></div>
                <span className="truncate">{option}</span>
              </div>
              {option === selectedPrice && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-black/30 rounded-xl lg:rounded-2xl shadow-lg">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-200">Retail Price Analysis (NGN)</h2>
              <button className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
              {fuelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFuel(type)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedFuel === type
                      ? ' text-green-600 shadow-md'
                      : 'text-white hover:text-green-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="p-4 sm:p-6">
          <div 
            className="cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <ChartComponent />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-0.5">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period
                      ? 'text-green-600 shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-green-500'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
              <CustomDropdown
                options={regions}
                selected={selectedRegion}
                onSelect={setSelectedRegion}
                show={showRegionDropdown}
                onToggle={() => setShowRegionDropdown(!showRegionDropdown)}
                placeholder="Region"
              />
              
              <CustomDropdown
                options={states}
                selected={selectedState}
                onSelect={setSelectedState}
                show={showStateDropdown}
                onToggle={() => setShowStateDropdown(!showStateDropdown)}
                placeholder="State"
              />
              
              <PriceDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 ">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Share Image
                </h3>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Share className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Share</span>
                </button>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 bg-black">
              {/* Price Display */}
              {/*
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        ₦{chartData[chartData.length - 1]?.price.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-gray-500">Current {selectedFuel} Price</p>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">+2.4%</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Period: {selectedPeriod}</p>
                    <p className="text-sm text-gray-500">Region: {selectedRegion}</p>
                  </div>
                </div>
              </div> */}

              {/* Chart Container */}
              <div className="bg-black rounded-lg p-4">
                <div className="h-96 sm:h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="modalColorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="index" 
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#d1d5db"
                      />
                      <YAxis 
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#d1d5db"
                        domain={['dataMin - 5', 'dataMax + 5']}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#modalColorPrice)"
                        dot={false}
                        activeDot={{ 
                          r: 6, 
                          fill: '#10b981',
                          stroke: '#ffffff',
                          strokeWidth: 3,
                          filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Controls */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-1 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300">
                  {periods.map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                        selectedPeriod === period
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-green-600 hover:bg-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <select 
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50 gap-2">
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </button>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceChart;


