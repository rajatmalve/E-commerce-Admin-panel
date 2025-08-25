import React, { useState } from 'react';

interface CouponsProps {
  searchTerm: string;
}

interface Coupon {
  code: string;
  type: 'Percentage' | 'Flat';
  value: string;
  usage: number;
  status: 'Active' | 'Expired' | 'Scheduled';
  validTill: string;
}

const Coupons: React.FC<CouponsProps> = ({ searchTerm }) => {
  const [status, setStatus] = useState<'All' | 'Active' | 'Expired' | 'Scheduled'>('All');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    type: 'Percentage',
    value: '',
    usage: 0,
    status: 'Active',
    validTill: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: 'WELCOME10', type: 'Percentage', value: '10%', usage: 124, status: 'Active', validTill: '2025-01-31' },
    { code: 'DIWALI25', type: 'Percentage', value: '25%', usage: 342, status: 'Expired', validTill: '2024-11-15' },
    { code: 'FLAT200', type: 'Flat', value: '₹200', usage: 87, status: 'Scheduled', validTill: '2025-03-10' },
  ]);

  const categories = ['All Categories', '"Kitchen Roll', 'Baking Paper', 'Baking Sheet','HRT','JRT','Toilet Paper',];
  const statuses = ['All Status', 'Active', 'Inactive', 'Out of Stock'];

  // Use local search term if available, otherwise use prop searchTerm
  const effectiveSearchTerm = localSearchTerm || searchTerm;

  const filtered = coupons.filter(c => {
    const matchesSearch = `${c.code} ${c.type} ${c.value} ${c.status}`.toLowerCase().includes(effectiveSearchTerm.toLowerCase());
    const matchesStatus = status === 'All' || c.status === status;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoupons = filtered.slice(startIndex, endIndex);

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
  }, [effectiveSearchTerm, status]);

  const handleViewCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowViewModal(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon({ ...coupon });
    setShowEditModal(true);
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setDeletingCoupon(coupon);
    setShowDeleteModal(true);
  };

  const handleAddCoupon = () => {
    // Reset the new coupon form
    setNewCoupon({
      code: '',
      type: 'Percentage',
      value: '',
      usage: 0,
      status: 'Active',
      validTill: ''
    });
    setShowAddModal(true);
  };

  const handleNewCouponChange = (field: keyof Coupon, value: string | number) => {
    setNewCoupon(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNewCoupon = () => {
    // Validate required fields
    if (!newCoupon.code.trim()) {
      alert('Please enter a coupon code.');
      return;
    }
    if (!newCoupon.value.trim()) {
      alert('Please enter a coupon value.');
      return;
    }
    if (!newCoupon.validTill) {
      alert('Please select a valid till date.');
      return;
    }

    // Check if coupon code already exists
    const existingCoupon = coupons.find(c => c.code === newCoupon.code.trim());
    if (existingCoupon) {
      alert('A coupon with this code already exists. Please use a different code.');
      return;
    }

    // Add the new coupon to the list
    const couponToAdd = {
      ...newCoupon,
      code: newCoupon.code.trim(),
      usage: parseInt(newCoupon.usage.toString()) || 0
    };

    setCoupons(prev => [couponToAdd, ...prev]);
    setShowAddModal(false);
    
    // Reset the form
    setNewCoupon({
      code: '',
      type: 'Percentage',
      value: '',
      usage: 0,
      status: 'Active',
      validTill: ''
    });

    alert('New coupon added successfully!');
  };

  const handleSaveEdit = () => {
    if (!editingCoupon) return;
    
    // Validate required fields
    if (!editingCoupon.code.trim()) {
      alert('Please enter a coupon code.');
      return;
    }

    // Update the coupon in the list
    setCoupons(prev => prev.map(c => c.code === editingCoupon.code ? editingCoupon : c));
    setShowEditModal(false);
    setEditingCoupon(null);
    alert('Coupon updated successfully!');
  };

  const confirmDelete = () => {
    if (!deletingCoupon) return;
    
    // Remove the coupon from the list
    setCoupons(prev => prev.filter(c => c.code !== deletingCoupon.code));
    setShowDeleteModal(false);
    setDeletingCoupon(null);
    alert(`Coupon "${deletingCoupon.code}" deleted successfully!`);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedCoupon(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingCoupon(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingCoupon(null);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Coupons</h1>
          <p className="text-gray-600 text-base sm:text-lg">Create and manage discount coupons</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Export</button>
          <button className="btn-primary flex items-center gap-2" onClick={handleAddCoupon}>
            <i className="fas fa-plus"></i>
            New Coupon
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option>All</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Scheduled</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Search</label>
            <input 
              className="input-field" 
              placeholder="Search by code, type or status" 
              value={effectiveSearchTerm} 
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-responsive">
          <table>
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left">Code</th>
                <th className="text-left">Type</th>
                <th className="text-left">Value</th>
                <th className="text-left">Usage</th>
                <th className="text-left">Status</th>
                <th className="text-left">Valid Till</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCoupons.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900">{c.code}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{c.type}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{c.value}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{c.usage}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === 'Active' ? 'bg-green-50 text-green-600' : c.status === 'Expired' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{c.validTill}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" 
                        title="View"
                        onClick={() => handleViewCoupon(c)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg" 
                        title="Edit"
                        onClick={() => handleEditCoupon(c)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                        title="Delete"
                        onClick={() => handleDeleteCoupon(c)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* View Coupon Modal */}
      {showViewModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Coupon Details</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={closeViewModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-3">Coupon Information</h6>
                  <div className="space-y-2">
                    <p><span className="font-medium">Code:</span> {selectedCoupon.code}</p>
                    <p><span className="font-medium">Type:</span> {selectedCoupon.type}</p>
                    <p><span className="font-medium">Value:</span> {selectedCoupon.value}</p>
                    <p><span className="font-medium">Usage:</span> {selectedCoupon.usage} times</p>
                    <p><span className="font-medium">Valid Till:</span> {selectedCoupon.validTill}</p>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-3">Status</h6>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCoupon.status === 'Active' ? 'bg-green-50 text-green-600' : 
                    selectedCoupon.status === 'Expired' ? 'bg-red-50 text-red-600' : 
                    'bg-yellow-50 text-yellow-700'
                  }`}>
                    {selectedCoupon.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && editingCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Edit Coupon</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={closeEditModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={editingCoupon.code}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, code: e.target.value } : null)}
                    placeholder="Enter coupon code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={editingCoupon.type}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, type: e.target.value as 'Percentage' | 'Flat' } : null)}
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={editingCoupon.value}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, value: e.target.value } : null)}
                    placeholder={editingCoupon.type === 'Percentage' ? '10%' : '₹200'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={editingCoupon.status}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, status: e.target.value as 'Active' | 'Expired' | 'Scheduled' } : null)}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Till</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={editingCoupon.validTill}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, validTill: e.target.value } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usage Count</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={editingCoupon.usage}
                    onChange={(e) => setEditingCoupon(prev => prev ? { ...prev, usage: parseInt(e.target.value) || 0 } : null)}
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" 
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Confirm Deletion</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={closeDeleteModal}
              >
                ×
              </button>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-900 mb-4">Are you sure you want to delete coupon "{deletingCoupon.code}"?</p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" 
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Add New Coupon</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={closeAddModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={newCoupon.code}
                    onChange={(e) => handleNewCouponChange('code', e.target.value)}
                    placeholder="Enter coupon code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={newCoupon.type}
                    onChange={(e) => handleNewCouponChange('type', e.target.value as 'Percentage' | 'Flat')}
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={newCoupon.value}
                    onChange={(e) => handleNewCouponChange('value', e.target.value)}
                    placeholder="10% or ₹200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={newCoupon.status}
                    onChange={(e) => handleNewCouponChange('status', e.target.value as 'Active' | 'Scheduled')}
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Till</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={newCoupon.validTill}
                    onChange={(e) => handleNewCouponChange('validTill', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Usage Count</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={newCoupon.usage}
                    onChange={(e) => handleNewCouponChange('usage', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" 
                onClick={handleSaveNewCoupon}
              >
                Add Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
