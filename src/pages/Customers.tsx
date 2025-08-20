import React from 'react';

interface CustomersProps {
  searchTerm: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  orders: number;
  totalSpent: string;
  loyaltyPoints: number;
  segment: string;
}

const Customers: React.FC<CustomersProps> = ({ searchTerm }) => {
  const customerStats = [
    {
      count: '2,847',
      label: 'Total Customers',
      icon: 'fas fa-users',
      iconClass: 'customers'
    },
    {
      count: '156',
      label: 'VIP Customers',
      icon: 'fas fa-crown',
      iconClass: 'vip'
    },
    {
      count: '234',
      label: 'New This Month',
      icon: 'fas fa-user-plus',
      iconClass: 'new'
    },
    {
      count: '₹18.5L',
      label: 'Total Revenue',
      icon: 'fas fa-trophy',
      iconClass: 'revenue'
    }
  ];

  const customers: Customer[] = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      joinDate: '2023-06-15',
      orders: 15,
      totalSpent: '₹25,670',
      loyaltyPoints: 1250,
      segment: 'VIP'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600 text-lg">Manage customer relationships, loyalty points, and segments</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`stat-icon ${stat.iconClass}`}>
                <i className={stat.icon}></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 m-0">{stat.count}</h3>
                <h6 className="text-sm font-medium text-gray-500 m-0">{stat.label}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Orders</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Total Spent</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Loyalty Points</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Segment</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(customer.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Joined {customer.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6"><span className="font-semibold text-gray-900">{customer.orders}</span></td>
                  <td className="py-4 px-6"><span className="font-semibold text-gray-900">{customer.totalSpent}</span></td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-trophy text-yellow-500"></i>
                      <span className="text-gray-900">{customer.loyaltyPoints}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${customer.segment.toLowerCase()}`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;