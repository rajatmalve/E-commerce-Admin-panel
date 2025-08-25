import React, { useMemo, useState } from 'react';

interface CustomersProps {
  searchTerm: string;
  onViewCustomerProfile: (customer: Customer) => void;
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

const Customers: React.FC<CustomersProps> = ({ searchTerm, onViewCustomerProfile }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const customers: Customer[] = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43210',
      joinDate: '2023-06-15',
      orders: 12,
      totalSpent: '₹25,000',
      loyaltyPoints: 1250,
      segment: 'VIP'
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43211',
      joinDate: '2023-08-20',
      orders: 8,
      totalSpent: '₹18,500',
      loyaltyPoints: 850,
      segment: 'NEW'
    },
    {
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      phone: '+91 98765 43212',
      joinDate: '2023-05-10',
      orders: 3,
      totalSpent: '₹5,200',
      loyaltyPoints: 320,
      segment: 'NEW'
    }
  ];

  const filtered = customers.filter(c => {
    const matchesSearch = `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const isNewThisMonth = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const parseRupeesToNumber = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    return Number(numeric || 0);
  };

  const formatINR = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  const computedStats = useMemo(() => {
    const totalCustomers = customers.length;
    const vipCustomers = customers.filter(c => c.segment === 'VIP').length;
    const newThisMonth = customers.filter(c => isNewThisMonth(c.joinDate)).length;
    const totalRevenue = customers.reduce((sum, c) => sum + parseRupeesToNumber(c.totalSpent), 0);

    return [
      { key: 'ALL' as const, count: String(totalCustomers), label: 'Total Customers', icon: 'fas fa-users', iconClass: 'customers' },
      { key: 'VIP' as const, count: String(vipCustomers), label: 'VIP Customers', icon: 'fas fa-crown', iconClass: 'vip' },
      { key: 'NEW' as const, count: String(newThisMonth), label: 'New This Month', icon: 'fas fa-user-plus', iconClass: 'new' },
      { key: 'REVENUE' as const, count: formatINR(totalRevenue), label: 'Total Revenue', icon: 'fas fa-trophy', iconClass: 'revenue' }
    ];
  }, [customers]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    return matchesSearch;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600 text-base sm:text-lg">Manage customer relationships, loyalty points, and segments</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {computedStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            onClick={() => {
              // Handle click if needed
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // Handle key press if needed
              }
            }}
          >
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
              {currentCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                          <span className="text-sm font-medium leading-none text-white">
                            {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{customer.phone}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.segment === 'VIP' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{customer.orders}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{customer.totalSpent}</td>
                  <td className="py-4 px-6 text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center py-4 px-6 border-t border-gray-200">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="mx-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;