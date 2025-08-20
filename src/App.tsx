import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Marketing from './pages/Marketing';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo

  const handlePageChange = (pageName: string) => {
    setCurrentPage(pageName);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    // You can add more sign out logic here like clearing tokens, etc.
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavigateToPage = (pageName: string) => {
    setCurrentPage(pageName);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard searchTerm={searchTerm} />;
      case 'products':
        return <Products searchTerm={searchTerm} />;
      case 'orders':
        return <Orders searchTerm={searchTerm} />;
      case 'customers':
        return <Customers searchTerm={searchTerm} />;
      case 'marketing':
        return <Marketing searchTerm={searchTerm} />;
      case 'analytics':
        return <Analytics searchTerm={searchTerm} />;
      case 'settings':
        return <Settings searchTerm={searchTerm} />;
      case 'profile':
        return <Profile searchTerm={searchTerm} />;
      default:
        return <Dashboard searchTerm={searchTerm} />;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-sidebar' : 'ml-0'}`}>
        <Header 
          onToggleSidebar={toggleSidebar}
          onSearch={handleSearch}
          onSignOut={handleSignOut}
          onNavigateToPage={handleNavigateToPage}
        />
        <main className="p-4 sm:p-6 lg:p-8 min-h-screen">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;