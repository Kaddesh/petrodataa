import React, { useState } from 'react';
import { Download, ChevronDown, Check, Share, X, Copy } from 'lucide-react';
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
  const currentPrice = chartData[chartData.length - 1]?.price || 714.26;
  const previousPrice = chartData[chartData.length - 2]?.price || 714.26;
  const priceChange = currentPrice - previousPrice;
  const percentageChange = ((priceChange / previousPrice) * 100);
  const isPositive = priceChange >= 0;

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
    <div className="relative">
      <button
        onClick={onToggle}
        className="appearance-none text-green-900 px-4 py-2 pr-8 text-sm font-medium cursor-pointer  transition-all flex items-center space-x-2 "
      >
        <span>{selected === 'All' ? placeholder : selected}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {show && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-[9999] min-w-[140px]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{option}</span>
              {option === selected && <Check className="w-4 h-4 text-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const PriceDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
        className="text-sm font-medium text-green-700 flex items-center space-x-2  transition-colors"
      >
        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
        <span>{selectedPrice}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {showPriceDropdown && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] min-w-[120px]">
          {priceOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedPrice(option);
                setShowPriceDropdown(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                <span>{option}</span>
              </div>
              {option === selectedPrice && <Check className="w-4 h-4 text-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-black/30 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-base font-bold text-gray-200">Retail Price Analysis (NGN)</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {fuelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFuel(type)}
                  className={`px-2 py-2 text-sm font-medium transition-colors ${
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

        {/* Price Display */}
        {/*}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-3xl font-bold text-gray-900">₦{currentPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Current Price</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}₦{priceChange.toFixed(2)}
                </span>
                <span className="text-sm">
                  ({isPositive ? '+' : ''}{percentageChange.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">24h Volume</p>
              <p className="text-lg font-semibold text-gray-700">₦2.4M</p>
            </div>
          </div>
        </div> */}

        {/* Chart Area */}
        <div className="p-6">
          <div 
            className="cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <ChartComponent />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period
                      ? 'text-green-600 shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-green-500'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
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
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="bg-gray-100 rounded-xl p-4">
                <ChartComponent />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span className="font-medium">Download</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Copy className="w-4 h-4" />
                <span className="font-medium">Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceChart;


