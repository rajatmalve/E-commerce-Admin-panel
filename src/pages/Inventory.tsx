import React, { useState } from 'react';

interface InventoryProps {
  searchTerm: string;
}

interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const Inventory: React.FC<InventoryProps> = ({ searchTerm }) => {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockRange, setStockRange] = useState({ min: '', max: '' });
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newItem, setNewItem] = useState<InventoryItem>({
    sku: '',
    name: '',
    category: 'Clothing',
    stock: 0,
    reorderLevel: 10,
    status: 'In Stock',
  });
  const [selectedImageSets, setSelectedImageSets] = useState<Array<{
    fileName: string;
    originalUrl: string;
    variants: Array<{ label: string; url: string; width: number; height: number }>;
  }>>([]);
  const [imageAssignments, setImageAssignments] = useState<{
    thumbnail?: { fileName: string; url: string };
    catalog?: { fileName: string };
  }>({});

  const initialItems: InventoryItem[] = [
    { sku: 'PRM-TSH-001', name: 'Premium Cotton T-Shirt', category: 'Clothing', stock: 150, reorderLevel: 50, status: 'In Stock' },
    { sku: 'BLT-HP-100', name: 'Wireless Headphones', category: 'Electronics', stock: 12, reorderLevel: 20, status: 'Low Stock' },
    { sku: 'CRM-ORG-050', name: 'Organic Face Cream', category: 'Beauty', stock: 0, reorderLevel: 15, status: 'Out of Stock' },
  ];

  const [items, setItems] = useState<InventoryItem[]>(initialItems);

  // Use local search term if available, otherwise use prop searchTerm
  const effectiveSearchTerm = localSearchTerm || searchTerm;

  const filtered = items.filter(i => {
    const matchesSearch = `${i.sku} ${i.name} ${i.category} ${i.status}`.toLowerCase().includes(effectiveSearchTerm.toLowerCase());
    const matchesCategory = category === 'All' || i.category === category;
    const matchesStatus = status === 'All' || i.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

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
  }, [effectiveSearchTerm, category, status]);

  const openAdd = () => setShowAddModal(true);
  const closeAdd = () => setShowAddModal(false);
  
  const openView = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };
  const closeView = () => setShowViewModal(false);
  
  const openEdit = (item: InventoryItem) => {
    setSelectedItem({ ...item });
    setShowEditModal(true);
  };
  const closeEdit = () => setShowEditModal(false);
  
  const openDelete = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };
  const closeDelete = () => setShowDeleteModal(false);
  
  const handleNewChange = (field: keyof InventoryItem, value: string | number) => {
    setNewItem(prev => ({ ...prev, [field]: value } as InventoryItem));
  };
  
  const handleEditChange = (field: keyof InventoryItem, value: string | number) => {
    if (selectedItem) {
      setSelectedItem(prev => ({ ...prev!, [field]: value } as InventoryItem));
    }
  };
  
  const handleSaveNew = () => {
    if (!newItem.name.trim() || !newItem.sku.trim()) {
      alert('Please enter both Item Name and SKU.');
      return;
    }
    setItems(prev => [{ ...newItem }, ...prev]);
    setShowAddModal(false);
    setNewItem({ sku: '', name: '', category: 'Clothing', stock: 0, reorderLevel: 10, status: 'In Stock' });
  };
  
  const handleSaveEdit = () => {
    if (!selectedItem || !selectedItem.name.trim() || !selectedItem.sku.trim()) {
      alert('Please enter both Item Name and SKU.');
      return;
    }
    setItems(prev => prev.map(item => item.sku === selectedItem.sku ? selectedItem : item));
    setShowEditModal(false);
    setSelectedItem(null);
  };
  
  const handleDelete = () => {
    if (!selectedItem) return;
    setItems(prev => prev.filter(item => item.sku !== selectedItem.sku));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600">Track stock levels and manage reorders</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Export</button>
          <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
            <i className="fas fa-plus"></i>
            Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Search</label>
            <input 
              className="input-field pl-4" 
              placeholder="Search by name, SKU, category" 
              value={localSearchTerm} 
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Beauty</option>
              <option>Home</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-responsive">
          <table>
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left">SKU</th>
                <th className="text-left">Item</th>
                <th className="text-left">Category</th>
                <th className="text-left">Stock</th>
                <th className="text-left">Reorder Level</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((i, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900">{i.sku}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{i.name}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{i.category}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{i.stock}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{i.reorderLevel}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      i.status === 'In Stock' ? 'bg-green-50 text-green-600' : i.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View" onClick={() => openView(i)}><i className="fas fa-eye"></i></button>
                      <button className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg" title="Edit" onClick={() => openEdit(i)}><i className="fas fa-edit"></i></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete" onClick={() => openDelete(i)}><i className="fas fa-trash"></i></button>
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
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn-secondary px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn-secondary px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeAdd}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-xl animate-scale-in">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add Inventory Item</h3>
              <button className="p-2 text-gray-500 hover:text-gray-700" onClick={closeAdd} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Item Name</label>
                  <input className="input-field" value={newItem.name} onChange={(e) => handleNewChange('name', e.target.value)} placeholder="Enter item name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">SKU</label>
                  <input className="input-field" value={newItem.sku} onChange={(e) => handleNewChange('sku', e.target.value)} placeholder="e.g., PRD-ABC-001" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <select className="input-field" value={newItem.category} onChange={(e) => handleNewChange('category', e.target.value)}>
                    <option>Clothing</option>
                    <option>Electronics</option>
                    <option>Beauty</option>
                    <option>Home</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <select className="input-field" value={newItem.status} onChange={(e) => handleNewChange('status', e.target.value)}>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
                  <input type="number" className="input-field" value={newItem.stock} onChange={(e) => handleNewChange('stock', Number(e.target.value))} min={0} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Reorder Level</label>
                  <input type="number" className="input-field" value={newItem.reorderLevel} onChange={(e) => handleNewChange('reorderLevel', Number(e.target.value))} min={0} />
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button className="btn-secondary w-full sm:w-auto" onClick={closeAdd}>Cancel</button>
              <button className="btn-primary w-full sm:w-auto" onClick={handleSaveNew}>
                <i className="fas fa-save mr-2"></i>
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Item Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeView}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-xl animate-scale-in">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">View Inventory Item</h3>
              <button className="p-2 text-gray-500 hover:text-gray-700" onClick={closeView} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Item Name</label>
                  <p className="input-field">{selectedItem.name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">SKU</label>
                  <p className="input-field">{selectedItem.sku}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <p className="input-field">{selectedItem.category}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <p className="input-field">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedItem.status === 'In Stock' ? 'bg-green-50 text-green-600' : selectedItem.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {selectedItem.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
                  <p className="input-field">{selectedItem.stock}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Reorder Level</label>
                  <p className="input-field">{selectedItem.reorderLevel}</p>
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button className="btn-secondary w-full sm:w-auto" onClick={closeView}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeEdit}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-xl animate-scale-in">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Inventory Item</h3>
              <button className="p-2 text-gray-500 hover:text-gray-700" onClick={closeEdit} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Item Name</label>
                  <input className="input-field" value={selectedItem.name} onChange={(e) => handleEditChange('name', e.target.value)} placeholder="Enter item name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">SKU</label>
                  <input className="input-field" value={selectedItem.sku} onChange={(e) => handleEditChange('sku', e.target.value)} placeholder="e.g., PRD-ABC-001" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <select className="input-field" value={selectedItem.category} onChange={(e) => handleEditChange('category', e.target.value)}>
                    <option>Clothing</option>
                    <option>Electronics</option>
                    <option>Beauty</option>
                    <option>Home</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <select className="input-field" value={selectedItem.status} onChange={(e) => handleEditChange('status', e.target.value)}>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
                  <input type="number" className="input-field" value={selectedItem.stock} onChange={(e) => handleEditChange('stock', Number(e.target.value))} min={0} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Reorder Level</label>
                  <input type="number" className="input-field" value={selectedItem.reorderLevel} onChange={(e) => handleEditChange('reorderLevel', Number(e.target.value))} min={0} />
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button className="btn-secondary w-full sm:w-auto" onClick={closeEdit}>Cancel</button>
              <button className="btn-primary w-full sm:w-auto" onClick={handleSaveEdit}>
                <i className="fas fa-save mr-2"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Item Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDelete}></div>
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl animate-scale-in">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <button className="p-2 text-gray-500 hover:text-gray-700" onClick={closeDelete} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-800 mb-4">Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button className="btn-secondary w-full sm:w-auto" onClick={closeDelete}>Cancel</button>
                <button className="btn-danger w-full sm:w-auto" onClick={handleDelete}>
                  <i className="fas fa-trash mr-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
