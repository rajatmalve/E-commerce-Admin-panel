import React from 'react';

interface DashboardProps {
  searchTerm: string;
  onNavigateToPage: (pageName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ searchTerm, onNavigateToPage }) => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      icon: 'fas fa-rupee-sign',
      iconClass: 'revenue',
      trend: '+12.5%',
      trendClass: 'text-success-500',
      subtitle: 'vs last month'
    },
    {
      title: 'Orders Today',
      value: '156',
      icon: 'fas fa-shopping-cart',
      iconClass: 'orders',
      trend: '+8.2%',
      trendClass: 'text-success-500',
      subtitle: 'vs last month'
    },
    {
      title: 'Active Customers',
      value: '2,847',
      icon: 'fas fa-users',
      iconClass: 'customers',
      trend: '+15.3%',
      trendClass: 'text-success-500',
      subtitle: 'vs last month'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      icon: 'fas fa-box',
      iconClass: 'stock',
      trend: '-5.1%',
      trendClass: 'text-red-500',
      subtitle: 'vs last month'
    }
  ];

  const recentOrders = [
    {
      id: '#12547',
      customer: 'Rajesh Kumar',
      status: 'Processing',
      amount: '₹1,250',
      time: '2 mins ago'
    },
    {
      id: '#12546',
      customer: 'Priya Sharma',
      status: 'Shipped',
      amount: '₹890',
      time: '5 mins ago'
    },
    {
      id: '#12545',
      customer: 'Amit Singh',
      status: 'Delivered',
      amount: '₹2,100',
      time: '10 mins ago'
    }
  ];

  const quickActions = [
    {
      icon: 'fas fa-box',
      title: 'Add Product',
      description: 'Create new product listing',
      navigateTo: 'products'
    },
    {
      icon: 'fas fa-users',
      title: 'View Customers',
      description: 'Manage customer data',
      navigateTo: 'customers'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Process Orders',
      description: 'Handle pending orders',
      navigateTo: 'orders'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'View Analytics',
      description: 'Check performance metrics',
      navigateTo: 'analytics'
    }
  ];

  const filteredOrders = recentOrders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActions = quickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-stat-hover transition-all duration-300 h-full transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h6 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h6>
                <h3 className="text-3xl font-bold text-gray-900 m-0">{stat.value}</h3>
              </div>
              <div className={`stat-icon ${stat.iconClass}`}>
                <i className={stat.icon}></i>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <i className={`fas fa-arrow-${stat.trend.startsWith('+') ? 'up' : 'down'} ${stat.trendClass}`}></i>
              <span className={stat.trendClass}>{stat.trend}</span>
              <span className="text-gray-500">{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Recent Orders</h5>
          </div>
          <div className="p-5">
            {filteredOrders.map((order, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-3 last:mb-0">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{order.id}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.time}</div>
                </div>
                <div className="font-bold text-gray-900 text-lg">{order.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Quick Actions</h5>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              {filteredActions.map((action, index) => (
                <div
                  key={index}
                  className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 cursor-pointer hover:border-primary-500 hover:bg-primary-50 h-full"
                  onClick={() => onNavigateToPage((action as any).navigateTo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onNavigateToPage((action as any).navigateTo);
                    }
                  }}
                >
                  <i className={`${action.icon} text-3xl text-primary-500 mb-3`}></i>
                  <h6 className="font-semibold text-gray-900 mb-2">{action.title}</h6>
                  <p className="text-sm text-gray-600 m-0">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;