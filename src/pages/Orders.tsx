import React, { useState } from 'react';

interface OrdersProps {
  searchTerm: string;
}

interface Order {
  id: string;
  customer: string;
  location: string;
  items: string;
  amount: string;
  status: string;
  payment: string;
  date: string;
}

const Orders: React.FC<OrdersProps> = ({ searchTerm }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderStats = [
    {
      count: '45',
      label: 'Processing',
      icon: 'fas fa-box',
      iconClass: 'processing'
    },
    {
      count: '23',
      label: 'Shipped',
      icon: 'fas fa-truck',
      iconClass: 'shipped'
    },
    {
      count: '127',
      label: 'Delivered',
      icon: 'fas fa-check-circle',
      iconClass: 'delivered'
    },
    {
      count: '12',
      label: 'Pending',
      icon: 'fas fa-clock',
      iconClass: 'pending'
    }
  ];

  const orders: Order[] = [
    {
      id: '#12547',
      customer: 'Rajesh Kumar',
      location: 'Mumbai, Maharashtra',
      items: '3 items',
      amount: '₹1,250',
      status: 'Processing',
      payment: 'Paid',
      date: '2024-01-15'
    },
    {
      id: '#12546',
      customer: 'Priya Sharma',
      location: 'Delhi, New Delhi',
      items: '1 item',
      amount: '₹890',
      status: 'Shipped',
      payment: 'Paid',
      date: '2024-01-15'
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return 'fas fa-box';
      case 'Shipped': return 'fas fa-truck';
      case 'Delivered': return 'fas fa-check-circle';
      case 'Pending': return 'fas fa-clock';
      default: return 'fas fa-box';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600 text-lg">Track and manage all customer orders from processing to delivery</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => (
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

      {/* Orders Table */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Payment</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <i className={`${getStatusIcon(order.status)} text-gray-600`}></i>
                      <span className="font-semibold text-gray-900">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.location}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{order.items}</td>
                  <td className="py-4 px-6"><span className="font-semibold text-gray-900">{order.amount}</span></td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium badge-${order.payment.toLowerCase()}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{order.date}</td>
                  <td className="py-4 px-6">
                    <button 
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Order Details</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={() => setShowOrderDetails(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h6>
                    <div className="space-y-2">
                      <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                      <p><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 badge-${selectedOrder.status.toLowerCase()}`}>
                          {selectedOrder.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Payment:</span> 
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 badge-${selectedOrder.payment.toLowerCase()}`}>
                          {selectedOrder.payment}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h6>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                      <p><span className="font-medium">Email:</span> {selectedOrder.customer.toLowerCase().replace(' ', '.')}@example.com</p>
                      <p><span className="font-medium">Phone:</span> +91 98765 43210</p>
                      <p><span className="font-medium">Address:</span> {selectedOrder.location}</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h6 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h6>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 px-4 font-medium text-gray-900">Product</th>
                          <th className="text-left py-2 px-4 font-medium text-gray-900">Quantity</th>
                          <th className="text-left py-2 px-4 font-medium text-gray-900">Price</th>
                          <th className="text-left py-2 px-4 font-medium text-gray-900">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-4">Premium Cotton T-Shirt</td>
                          <td className="py-2 px-4">2</td>
                          <td className="py-2 px-4">₹599</td>
                          <td className="py-2 px-4">₹1,198</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Shipping</td>
                          <td className="py-2 px-4">1</td>
                          <td className="py-2 px-4">₹52</td>
                          <td className="py-2 px-4">₹52</td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t border-gray-200">
                        <tr>
                          <th colSpan={3} className="text-left py-2 px-4 font-medium text-gray-900">Total</th>
                          <th className="py-2 px-4 font-semibold text-gray-900">{selectedOrder.amount}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={() => setShowOrderDetails(false)}
              >
                Close
              </button>
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;