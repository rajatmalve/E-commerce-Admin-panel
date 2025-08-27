import React, { useEffect, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSearch: (term: string) => void;
  onSignOut: () => void;
  onNavigateToPage: (page: string) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  action?: {
    label: string;
    page: string;
  };
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSearch, onSignOut, onNavigateToPage }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState({ name: "" })

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #12548 has been placed by Priya Sharma',
      type: 'success',
      timestamp: '2 minutes ago',
      isRead: false,
      action: { label: 'View Order', page: 'orders' }
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Premium Cotton T-Shirt is running low on stock (15 items left)',
      type: 'warning',
      timestamp: '1 hour ago',
      isRead: false,
      action: { label: 'View Inventory', page: 'inventory' }
    },
    {
      id: '3',
      title: 'Coupon Expiring Soon',
      message: 'DIWALI25 coupon will expire in 2 days',
      type: 'info',
      timestamp: '3 hours ago',
      isRead: true,
      action: { label: 'View Coupons', page: 'coupons' }
    },
    {
      id: '4',
      title: 'New Customer Registration',
      message: 'Amit Singh has joined as a new customer',
      type: 'info',
      timestamp: '5 hours ago',
      isRead: true,
      action: { label: 'View Customer', page: 'customers' }
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );

    // Navigate to action page if available
    if (notification.action) {
      onNavigateToPage(notification.action.page);
    }

    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle text-green-500';
      case 'warning':
        return 'fas fa-exclamation-triangle text-yellow-500';
      case 'error':
        return 'fas fa-times-circle text-red-500';
      default:
        return 'fas fa-info-circle text-blue-500';
    }
  };

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
useEffect(() => {
  try {
    const userDetails = localStorage.getItem("pochoUserDetails");
    if (userDetails) {
      const parsed = typeof userDetails === "string" ? JSON.parse(userDetails) : userDetails;
      setUserData(parsed);
    }
  } catch (error) {
    console.error("Invalid userDetails in localStorage", error);
    localStorage.removeItem("pochoUserDetails"); // corrupted data hata do
    setUserData({ name: "" });
  }
}, []);


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
          {/* Notifications - Mobile */}
          <div className="sm:hidden relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <i className="fas fa-bell text-lg"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="py-1">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <i className="fas fa-bell-slash text-2xl mb-2"></i>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${notification.isRead ? 'opacity-75' : ''
                          } ${getNotificationBg(notification.type)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <i className={`${getNotificationIcon(notification.type)} mt-1 flex-shrink-0`}></i>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                            <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            {notification.action && (
                              <button className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-2">
                                {notification.action.label} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => onNavigateToPage('notifications')}
                      className="w-full text-center text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All ({notifications.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications - Desktop */}
          <div className="hidden sm:block relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <i className="fas fa-bell text-lg"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="py-1">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <i className="fas fa-bell-slash text-2xl mb-2"></i>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${notification.isRead ? 'opacity-75' : ''
                          } ${getNotificationBg(notification.type)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <i className={`${getNotificationIcon(notification.type)} mt-1 flex-shrink-0`}></i>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                            <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            {notification.action && (
                              <button className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-2">
                                {notification.action.label} →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => onNavigateToPage('notifications')}
                      className="w-full text-center text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <ThemeSwitcher />

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
                <div className="text-sm font-semibold text-gray-900 truncate">{userData?.name}</div>
                <div className="text-xs text-gray-500 truncate">{userData?.email}</div>
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

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;