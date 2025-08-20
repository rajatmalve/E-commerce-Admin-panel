import React, { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSearch: (term: string) => void;
  onSignOut: () => void;
  onNavigateToPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSearch, onSignOut, onNavigateToPage }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSignOut = () => {
    onSignOut();
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    onNavigateToPage('profile');
    setShowProfileMenu(false);
  };

  const handleSettingsClick = () => {
    onNavigateToPage('settings');
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 lg:py-4 lg:px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu Button and Search */}
        <div className="flex items-center flex-1 min-w-0">
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg mr-3 flex-shrink-0" 
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>
          
          {/* Search Bar - Responsive */}
          <div className="relative flex-1 max-w-md min-w-0">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base" 
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-3">
          {/* Notifications - Hidden on very small screens */}
          <div className="hidden sm:block relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">3</span>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleProfileMenu}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold flex-shrink-0">
                <i className="fas fa-user"></i>
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">Admin User</div>
                <div className="text-xs text-gray-500 truncate">admin@example.com</div>
              </div>
              <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform flex-shrink-0 ${showProfileMenu ? 'rotate-180' : ''}`}></i>
            </div>

            {/* Profile Dropdown Menu - Mobile Optimized */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900 truncate">Admin User</div>
                  <div className="text-xs text-gray-500 truncate">admin@example.com</div>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  <button 
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    onClick={handleProfileClick}
                  >
                    <i className="fas fa-user-circle text-gray-400 w-4 text-center"></i>
                    <span>My Profile</span>
                  </button>
                  
                  <button 
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    onClick={handleSettingsClick}
                  >
                    <i className="fas fa-cog text-gray-400 w-4 text-center"></i>
                    <span>Settings</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors">
                    <i className="fas fa-question-circle text-gray-400 w-4 text-center"></i>
                    <span>Help & Support</span>
                  </button>
                </div>
                
                {/* Sign Out */}
                <div className="border-t border-gray-100 pt-1">
                  <button 
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    onClick={handleSignOut}
                  >
                    <i className="fas fa-sign-out-alt text-red-400 w-4 text-center"></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;