import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Newspaper,
  Award,
  Bookmark,
  Settings,
  Droplet
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'analysis', icon: TrendingUp, label: 'Analysis' },
    { id: 'news', icon: Newspaper, label: 'News & Report' },
    { id: 'exclusive', icon: Award, label: 'Exclusive Result' },
    { id: 'watchlist', icon: Bookmark, label: 'Watchlist' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-black/30 shadow-xl border-r border-gray-200 transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-56'}`}>
      {/* Header */}
      <div className="flex items-center p-4 border-gray-200">
        <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className={`rounded-lg flex items-center justify-center ${collapsed ? 'w-10 h-10' : 'w-8 h-8'}`}>
            <Droplet className={`text-orange-500 ${collapsed ? 'w-8 h-8' : 'w-5 h-5'}`} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-300"> <span className='text-emerald-900 '>Petro</span>data</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? ' text-green-600 shadow-lg'
                  : 'text-gray-400 hover:text-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="absolute top-20 -right-4 transform -translate-y-1/2 w-8 h-8 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors z-10"
      >
        <span className="text-white font-bold text-sm">
          {collapsed ? '>>' : '<<'}
        </span>
      </button>
    </div>
  );
};

export default Sidebar;