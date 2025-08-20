import React from 'react';

interface CustomerProfileData {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  orders: number;
  totalSpent: string;
  loyaltyPoints: number;
  segment: string;
}

interface CustomerProfileProps {
  customer: CustomerProfileData | null;
  onNavigateToPage: (pageName: string) => void;
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer, onNavigateToPage }) => {
  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Customer Profile</h1>
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
            onClick={() => onNavigateToPage('customers')}
          >
            Back to Customers
          </button>
        </div>
        <div className="bg-white rounded-card border border-gray-200 shadow-card p-6">
          <p className="text-gray-700">No customer selected. Please go back and choose a customer to view their profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Profile</h1>
          <p className="text-gray-600 text-lg">View customer details and activity</p>
        </div>
        <button
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
          onClick={() => onNavigateToPage('customers')}
        >
          Back to Customers
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-card border border-gray-200 shadow-card p-6 text-center">
            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {getInitials(customer.name)}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{customer.name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${customer.segment.toLowerCase()}`}>
              {customer.segment}
            </span>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-envelope text-gray-400"></i>
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-phone text-gray-400"></i>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-calendar text-gray-400"></i>
                <span>Joined: {customer.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-card border border-gray-200 shadow-card">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Overview</h4>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">{customer.orders}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="text-2xl font-bold text-gray-900">{customer.totalSpent}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Loyalty Points</div>
                <div className="text-2xl font-bold text-gray-900">{customer.loyaltyPoints}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card border border-gray-200 shadow-card">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Activity</h4>
            </div>
            <div className="p-6 text-sm text-gray-600">
              <p>Recent activity data would appear here in a real app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;


