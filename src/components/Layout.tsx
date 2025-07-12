import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black/90 flex relative">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <main className={`flex-1 transition-all duration-300 w-full lg:w-auto ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      } ml-0 ${mobileMenuOpen ? 'blur-sm lg:blur-none' : ''}`}>
        <div className="p-3 sm:p-4 lg:p-6 h-full min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;