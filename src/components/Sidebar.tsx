import React from 'react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (pageName: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen, onToggle }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'orders', label: 'Orders', icon: 'fas fa-shopping-cart' },
    { id: 'customers', label: 'Customers', icon: 'fas fa-users' },
    { id: 'marketing', label: 'Marketing', icon: 'fas fa-bullhorn' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-sidebar h-screen bg-primary-500 text-white z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-white border-opacity-10 flex justify-between items-center">
          <h4 className="text-lg lg:text-xl font-bold text-white m-0 truncate">Commerce Pro</h4>
          <button 
            className="lg:hidden p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors" 
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full px-3 lg:px-6 py-3 lg:py-3.5 flex items-center text-left transition-all duration-300 ease-in-out rounded-lg ${
                    currentPage === item.id 
                      ? 'text-white bg-blue-500 shadow-lg' 
                      : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <i className={`${item.icon} w-5 lg:w-6 mr-3 text-base lg:text-lg flex-shrink-0`}></i>
                  <span className="text-sm lg:text-base font-medium truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer - Mobile Only */}
        <div className="lg:hidden mt-auto p-4 border-t border-white border-opacity-10">
          <div className="text-center text-white text-opacity-70 text-xs">
            <p>Commerce Pro v1.0</p>
            <p className="mt-1">© 2024 All rights reserved</p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;