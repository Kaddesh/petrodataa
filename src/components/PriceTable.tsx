import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getLatestPrices } from './data/petroleumdata';


interface PriceData {
  product: string;
  price: string;
  change: string;
  percentage: string;
  isPositive: boolean;
}

const PriceTable: React.FC = () => {
  const latestData = getLatestPrices();
  
  // Calculate average prices for each fuel type
  const calculateAveragePrice = (fuelType: keyof typeof latestData[0]) => {
    if (fuelType === 'State' || fuelType === 'Period' || fuelType === 'Region') return 0;
    const prices = latestData.map(item => item[fuelType]).filter(price => price > 0);
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
  };

  const priceData: PriceData[] = [
    {
      product: 'PMS (Premium Motor Spirit)',
      price: `₦${calculateAveragePrice('PMS').toFixed(2)}`,
      change: '+12.50',
      percentage: '+1.2%',
      isPositive: true
    },
    {
      product: 'AGO (Automotive Gas Oil)',
      price: `₦${calculateAveragePrice('AGO').toFixed(2)}`,
      change: '-8.75',
      percentage: '-0.7%',
      isPositive: false
    },
    {
      product: 'DPK (Dual Purpose Kerosene)',
      price: `₦${calculateAveragePrice('DPK').toFixed(2)}`,
      change: '+15.30',
      percentage: '+1.1%',
      isPositive: true
    },
    {
      product: 'LPG (Liquefied Petroleum Gas)',
      price: `₦${calculateAveragePrice('LPG').toFixed(2)}`,
      change: '+22.40',
      percentage: '+1.7%',
      isPositive: true
    },
  ];

  return (
    <div className="bg-black/30 rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-black-50 to-black-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700">
        <h2 className="text-sm sm:text-base font-bold text-gray-200">Current Products Retail Prices</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-gray-700 bg-black">
              <th className="text-left px-3 sm:px-6 font-semibold text-gray-700"></th>
              <th className="text-right px-3 sm:px-6 font-semibold text-gray-700"></th>
              <th className="text-right px-3 sm:px-6 font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="font-medium text-white/90 text-sm sm:text-base">
                    {(() => {
                      const parts = item.product.split(' (');
                      if (parts.length > 1) {
                        return (
                          <>
                            <span>{parts[0]} </span>
                            <span className="text-gray-400 text-xs sm:text-sm block sm:inline">{parts[1]}</span>
                          </>
                        );
                      }
                      return <span>{item.product}</span>;
                    })()}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                  <div className="font-bold text-base sm:text-lg text-white/90">{item.price}</div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                  <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                    <span className={`font-semibold text-sm sm:text-base ${item.isPositive ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {item.change}
                    </span>
                    <div className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;

