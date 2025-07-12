import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Newspaper,
  Award,
  Bookmark,
  Settings,
  Droplet,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onToggle, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  currentPage, 
  setCurrentPage 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'analysis', icon: TrendingUp, label: 'Analysis' },
    { id: 'news', icon: Newspaper, label: 'News & Report' },
    { id: 'exclusive', icon: Award, label: 'Exclusive Result' },
    { id: 'watchlist', icon: Bookmark, label: 'Watchlist' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setCurrentPage(itemId);
    setMobileMenuOpen(false);
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-black/30 backdrop-blur-sm shadow-xl border-r border-gray-700 transition-all duration-300 z-50
        lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'lg:w-20 w-64' : 'lg:w-64 w-64'}
      `}>
      {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-700">
          <div className={`flex items-center space-x-3 ${collapsed ? 'lg:justify-center' : ''}`}>
            <div className={`rounded-lg flex items-center justify-center ${collapsed ? 'lg:w-10 lg:h-10 w-8 h-8' : 'w-8 h-8'}`}>
              <Droplet className={`text-orange-500 ${collapsed ? 'lg:w-8 lg:h-8 w-5 h-5' : 'w-5 h-5'}`} />
          </div>
            {(!collapsed || mobileMenuOpen) && (
            <div>
                <h1 className="text-xl font-bold text-gray-300">
                  <span className='text-emerald-900'>Petro</span>data
                </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? ' text-green-600 shadow-lg'
                  : 'text-gray-400 hover:text-gray-50'
                } ${collapsed ? 'lg:justify-center' : ''}`}
            >
                <Icon className={`${collapsed ? 'lg:w-6 lg:h-6 w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
                {(!collapsed || mobileMenuOpen) && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Collapse Button */}
        <button
          onClick={onToggle}
          className="hidden lg:block absolute top-20 -right-4 transform -translate-y-1/2 w-8 h-8 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <span className="text-white font-bold text-sm">
            {collapsed ? '>>' : '<<'}
          </span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;