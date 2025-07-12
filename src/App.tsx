import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import News from './pages/News';
import ExclusiveResult from './pages/ExclusiveResult';
import Watchlist from './pages/Watchlist';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('analysis');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analysis':
        return <Analysis />;
      case 'news':
        return <News />;
      case 'exclusive':
        return <ExclusiveResult />;
      case 'watchlist':
        return <Watchlist />;
      case 'settings':
        return <Settings />;
      default:
        return <Analysis />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;