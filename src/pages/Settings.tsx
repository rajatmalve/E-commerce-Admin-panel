import React, { useState } from 'react';
import ThemePreview from '../components/ThemePreview';

interface SettingsProps {
  searchTerm: string;
}

const Settings: React.FC<SettingsProps> = ({ searchTerm }) => {
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('1000');
  const [codFee, setCodFee] = useState('50');

  const quickSettings = [
    {
      icon: 'fas fa-shipping-fast',
      title: 'Free Shipping Threshold',
      description: 'Set minimum order value for free shipping',
      value: freeShippingThreshold,
      onChange: setFreeShippingThreshold,
      unit: '₹'
    },
    {
      icon: 'fas fa-money-bill-wave',
      title: 'Cash on Delivery Fee',
      description: 'Additional fee for COD orders',
      value: codFee,
      onChange: setCodFee,
      unit: '₹'
    }
  ];

  const settingCategories = [
    {
      title: 'General Settings',
      icon: 'fas fa-cog',
      items: ['Store Information', 'Currency Settings', 'Language Settings', 'Timezone Settings']
    },
    {
      title: 'Payment Settings',
      icon: 'fas fa-credit-card',
      items: ['Payment Gateways', 'Tax Configuration', 'Invoice Settings', 'Refund Policy']
    },
    {
      title: 'Shipping Settings',
      icon: 'fas fa-truck',
      items: ['Shipping Zones', 'Shipping Methods', 'Package Dimensions', 'Tracking Settings']
    },
    {
      title: 'User Management',
      icon: 'fas fa-users',
      items: ['User Roles', 'Permissions', 'Access Control', 'Activity Logs']
    }
  ];

  const filteredSettings = quickSettings.filter(setting =>
    setting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = settingCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings & Configuration</h1>
        <p className="text-gray-600 text-base sm:text-lg">Configure system preferences, user roles, and business rules</p>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSettings.map((setting, index) => (
          <div key={index} className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                <i className={setting.icon}></i>
              </div>
              <div className="flex-1">
                <h6 className="font-semibold text-gray-900 mb-2">{setting.title}</h6>
                <p className="text-sm text-gray-600 mb-4">{setting.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{setting.unit}</span>
                  <input
                    type="number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={setting.value}
                    onChange={(e) => setting.onChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setting Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                  <i className={category.icon}></i>
                </div>
                <h6 className="font-semibold text-gray-900">{category.title}</h6>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item}</span>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Configure
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card">
        <div className="p-5 border-b border-gray-200">
          <h5 className="text-lg font-semibold text-gray-900 m-0">Advanced Settings</h5>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">Maintenance Mode</h6>
                <p className="text-sm text-gray-600">Temporarily disable the store for maintenance</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">Email Notifications</h6>
                <p className="text-sm text-gray-600">Send email notifications for orders and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">Analytics Tracking</h6>
                <p className="text-sm text-gray-600">Track user behavior and analytics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;