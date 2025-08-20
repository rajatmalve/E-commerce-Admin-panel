import React from 'react';

interface AnalyticsProps {
  searchTerm: string;
}

interface Metric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface SalesData {
  month: string;
  sales: number;
  orders: number;
}

interface TopProduct {
  name: string;
  category: string;
  sales: string;
  growth: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ searchTerm }) => {
  const keyMetrics: Metric[] = [
    {
      label: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      label: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      label: 'Average Order Value',
      value: '₹1,987',
      change: '+5.1%',
      changeType: 'positive'
    },
    {
      label: 'Customer Retention',
      value: '78.5%',
      change: '+2.3%',
      changeType: 'positive'
    }
  ];

  const salesData: SalesData[] = [
    { month: 'Jan', sales: 45000, orders: 89 },
    { month: 'Feb', sales: 52000, orders: 102 },
    { month: 'Mar', sales: 48000, orders: 95 },
    { month: 'Apr', sales: 61000, orders: 118 },
    { month: 'May', sales: 55000, orders: 107 },
    { month: 'Jun', sales: 68000, orders: 125 }
  ];

  const topProducts: TopProduct[] = [
    {
      name: 'Premium Cotton T-Shirt',
      category: 'Clothing',
      sales: '₹45,670',
      growth: '+15.2%'
    },
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      sales: '₹38,920',
      growth: '+12.8%'
    }
  ];

  const filteredProducts = topProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxSales = Math.max(...salesData.map(d => d.sales));
  const maxOrders = Math.max(...salesData.map(d => d.orders));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-600 text-lg">Track performance metrics, analyze trends, and make data-driven decisions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-card p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="mb-4">
              <h6 className="text-sm font-medium text-gray-500 mb-2">{metric.label}</h6>
              <h3 className="text-3xl font-bold text-gray-900 m-0">{metric.value}</h3>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <i className={`fas fa-arrow-${metric.changeType === 'positive' ? 'up' : 'down'} ${metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}></i>
              <span className={metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>{metric.change}</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Chart */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Sales Performance</h5>
          </div>
          <div className="p-5">
            <div className="chart-bar">
              {salesData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div 
                    className="bar w-full bg-primary-500 rounded-t min-h-5"
                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                  ></div>
                  <div className="bar-label text-center">
                    <strong className="block mb-1">{data.month}</strong>
                    <small className="block text-gray-500 mb-1">₹{data.sales.toLocaleString()}</small>
                    <small className="block text-gray-500">{data.orders} orders</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="p-5 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 m-0">Top Performing Products</h5>
          </div>
          <div className="p-5">
            {filteredProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3 last:mb-0">
                <div className="flex-1">
                  <h6 className="font-semibold text-gray-900 m-0">{product.name}</h6>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{product.sales}</div>
                  <div className="text-sm text-green-600 font-medium">{product.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow">
        <div className="p-5 border-b border-gray-200">
          <h5 className="text-lg font-semibold text-gray-900 m-0">Geographic Distribution</h5>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-map-marker-alt text-2xl text-blue-600"></i>
              </div>
              <h6 className="font-semibold text-gray-900 mb-1">Mumbai</h6>
              <p className="text-sm text-gray-500 mb-2">Maharashtra</p>
              <div className="text-2xl font-bold text-blue-600">₹89,450</div>
              <div className="text-sm text-green-600">+18.2%</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-map-marker-alt text-2xl text-green-600"></i>
              </div>
              <h6 className="font-semibold text-gray-900 mb-1">Delhi</h6>
              <p className="text-sm text-gray-500 mb-2">New Delhi</p>
              <div className="text-2xl font-bold text-green-600">₹76,320</div>
              <div className="text-sm text-green-600">+12.8%</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-map-marker-alt text-2xl text-purple-600"></i>
              </div>
              <h6 className="font-semibold text-gray-900 mb-1">Bangalore</h6>
              <p className="text-sm text-gray-500 mb-2">Karnataka</p>
              <div className="text-2xl font-bold text-purple-600">₹67,890</div>
              <div className="text-sm text-green-600">+9.5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;