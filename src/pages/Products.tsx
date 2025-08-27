import React, { useState } from 'react';
import AddProduct from './AddProduct';

interface ProductsProps {
  searchTerm: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  mrp: string;
  sellingPrice: string;
  stock: number;
  status: string;
  image: string;
}

const Products: React.FC<ProductsProps> = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockRange, setStockRange] = useState({ min: '', max: '' });
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedImageSets, setSelectedImageSets] = useState<Array<{
    fileName: string;
    originalUrl: string;
    variants: Array<{ label: string; url: string; width: number; height: number }>;
  }>>([]);
  const [imageAssignments, setImageAssignments] = useState<{
    thumbnail?: { fileName: string; url: string };
    catalog?: { fileName: string };
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '#1',
      name: 'Premium Cotton T-Shirt',
      category: 'Baking Sheet',
      mrp: '₹899',
      sellingPrice: '₹599',
      stock: 150,
      status: 'Active',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    },
    {
      id: '#2',
      name: 'Wireless Bluetooth Headphones',
      category: 'Baking Paper',
      mrp: '₹2999',
      sellingPrice: '₹1999',
      stock: 45,
      status: 'Active',
      image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    }
  ]);

  const categories = ['All Categories', 'Kitchen Roll', 'Baking Paper', 'Baking Sheet','HRT','JRT','Toilet Paper'];
  const statuses = ['All Status', 'Active', 'Inactive', 'Out of Stock'];
  // Use local search term if available, otherwise use prop searchTerm
  const effectiveSearchTerm = localSearchTerm || searchTerm;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(effectiveSearchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || product.status === selectedStatus;
    
    // Price range filtering
    const sellingPrice = parseInt(product.sellingPrice.replace('₹', ''));
    const matchesPriceRange = (!priceRange.min || sellingPrice >= parseInt(priceRange.min)) &&
                             (!priceRange.max || sellingPrice <= parseInt(priceRange.max));
    
    // Stock range filtering
    const matchesStockRange = (!stockRange.min || product.stock >= parseInt(stockRange.min)) &&
                             (!stockRange.max || product.stock <= parseInt(stockRange.max));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange && matchesStockRange;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
  }, [effectiveSearchTerm, selectedCategory, selectedStatus, priceRange, stockRange]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };

  const handleMoreFilters = () => {
    setShowFiltersModal(true);
  };

  const applyFilters = () => {
    setShowFiltersModal(false);
  };

  const resetFilters = () => {
    setPriceRange({ min: '', max: '' });
    setStockRange({ min: '', max: '' });
    setSelectedStatus('All Status');
    setSelectedCategory('All Categories');
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      // Actually delete the product from the list
      setProducts(prevProducts => prevProducts.filter(product => product.id !== deletingProduct.id));
      setShowDeleteModal(false);
      setDeletingProduct(null);
      // Show success message
      alert(`Product "${deletingProduct.name}" deleted successfully`);
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingProduct(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  const generateResizedDataUrl = (imageSrc: string, targetWidth: number, targetHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Preserve aspect ratio and fit within target box
        const scale = Math.min(targetWidth / image.width, targetHeight / image.height);
        const newWidth = Math.round(image.width * scale);
        const newHeight = Math.round(image.height * scale);

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Fill background white and center image
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, targetWidth, targetHeight);
        const dx = Math.floor((targetWidth - newWidth) / 2);
        const dy = Math.floor((targetHeight - newHeight) / 2);
        context.drawImage(image, dx, dy, newWidth, newHeight);

        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      image.onerror = reject;
      image.src = imageSrc;
    });
  };

  const handleImagesSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImageSets: Array<{
      fileName: string;
      originalUrl: string;
      variants: Array<{ label: string; url: string; width: number; height: number }>;
    }> = [];

    for (const file of files) {
      const objectUrl = URL.createObjectURL(file);
      const [small, medium, large] = await Promise.all([
        generateResizedDataUrl(objectUrl, 64, 64),
        generateResizedDataUrl(objectUrl, 256, 256),
        generateResizedDataUrl(objectUrl, 800, 800)
      ]);

      newImageSets.push({
        fileName: file.name,
        originalUrl: objectUrl,
        variants: [
          { label: 'Catalog Small (64x64)', url: small, width: 64, height: 64 },
          { label: 'Catalog Medium (256x256)', url: medium, width: 256, height: 256 },
          { label: 'Catalog Large (800x800)', url: large, width: 800, height: 800 }
        ]
      });
    }

    const merged = [...selectedImageSets, ...newImageSets];
    setSelectedImageSets(merged);

    // Initialize default assignments if not set yet
    const firstSet = merged[0];
    if (firstSet && (!imageAssignments.thumbnail || !imageAssignments.catalog)) {
      const small = firstSet.variants.find(v => v.width === 64)?.url || firstSet.originalUrl;
      setImageAssignments(prev => ({
        thumbnail: prev.thumbnail ?? { fileName: firstSet.fileName, url: small },
        catalog: prev.catalog ?? { fileName: firstSet.fileName }
      }));
    }
  };

  const handleRemoveImageSet = (fileName: string) => {
    const filtered = selectedImageSets.filter(set => set.fileName !== fileName);
    setSelectedImageSets(filtered);
    setImageAssignments(prev => {
      const updated = { ...prev } as typeof prev;
      if (prev.thumbnail?.fileName === fileName) {
        const fallback = filtered[0];
        updated.thumbnail = fallback
          ? { fileName: fallback.fileName, url: fallback.variants.find(v => v.width === 64)?.url || fallback.originalUrl }
          : undefined;
      }
      if (prev.catalog?.fileName === fileName) {
        const fallback = filtered[0];
        updated.catalog = fallback ? { fileName: fallback.fileName } : undefined;
      }
      return updated;
    });
  };

  const setAssignment = (
    slot: 'thumbnail' | 'catalog',
    fileName: string
  ) => {
    const set = selectedImageSets.find(s => s.fileName === fileName);
    if (!set) return;
    if (slot === 'thumbnail') {
      const url = set.variants.find(v => v.width === 64)?.url || set.originalUrl;
      setImageAssignments(prev => ({ ...prev, thumbnail: { fileName, url } }));
    } else {
      setImageAssignments(prev => ({ ...prev, catalog: { fileName } }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600 text-base sm:text-lg">Manage your product catalog, inventory, and pricing</p>
        </div>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2" onClick={handleAddProduct}>
          <i className="fas fa-plus"></i>
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative sm:col-span-2 md:col-span-1">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base" 
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            <select 
              className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>
            <button className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base" onClick={handleMoreFilters}>
              <i className="fas fa-filter"></i>
              <span className="hidden sm:inline">More Filters</span>
              <span className="sm:hidden">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base">Product</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base hidden sm:table-cell">Category</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base hidden md:table-cell">MRP</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base">Price</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base hidden md:table-cell">Stock</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base">Status</th>
                <th className="text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-gray-900 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img src={product.image} alt="Product" className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{product.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">ID: {product.id}</div>
                        <div className="text-xs text-gray-600 sm:hidden mt-1">{product.category}</div>
                        <div className="text-xs text-gray-600 md:hidden mt-1">Stock: {product.stock}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-900 text-sm sm:text-base hidden sm:table-cell">{product.category}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-900 text-sm sm:text-base hidden md:table-cell">{product.mrp}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{product.sellingPrice}</span>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-900 text-sm sm:text-base hidden md:table-cell">{product.stock}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium badge-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button 
                        className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                        onClick={() => handleViewProduct(product)}
                        title="View"
                      >
                        <i className="fas fa-eye text-xs sm:text-sm"></i>
                      </button>
                      <button 
                        className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        onClick={() => handleEditProduct(product)}
                        title="Edit"
                      >
                        <i className="fas fa-edit text-xs sm:text-sm"></i>
                      </button>
                      <button 
                        className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        onClick={() => handleDeleteProduct(product)}
                        title="Delete"
                      >
                        <i className="fas fa-trash text-xs sm:text-sm"></i>
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
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 py-4">
          <div className="flex items-center space-x-2">
            <button 
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>
            <span className="text-gray-700 text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {/* {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      defaultValue={editingProduct?.name || ''}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>Select Category</option>
                      <option>Kitchen Roll</option>
                      <option>Baking Paper</option>
                      <option>Baking Sheet</option>
                      <option>HRT</option>
                      <option>JRT</option>
                      <option>Toilet Paper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      placeholder="0"
                      defaultValue={editingProduct?.mrp.replace('₹', '') || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      placeholder="0"
                      defaultValue={editingProduct?.sellingPrice.replace('₹', '') || ''}
                    />
                  </div>
                
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      rows={3} 
                      placeholder="Enter product description"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <input 
                      type="file" 
                      className=" px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      multiple 
                      accept="image/*"
                      onChange={handleImagesSelected}
                    />
                    {selectedImageSets.length > 0 && (
                      <div className="flex mt-4 space-y-4">
                        {selectedImageSets.map((set) => (
                          <div key={set.fileName} className="border border-gray-200 rounded-lg p-3 max-w-[200px]">

                            <div className="flex items-center justify-between mb-3">
                              <div className="font-medium text-gray-900 text-sm">{set.fileName}</div>
                              <button
                                type="button"
                                className="text-red-600 text-xs hover:text-red-800"
                                onClick={() => handleRemoveImageSet(set.fileName)}
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {(() => {
                                const variant = set.variants.find(v => v.width === 256) || set.variants[0];
                                return (
                                  <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">{variant.label}</div>
                                    <img src={variant.url} alt={variant.label} className="w-full h-28 object-cover rounded" />
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedImageSets.length > 0 && (
                      <div className="mt-6">
                        <h6 className="text-sm font-semibold text-gray-900 mb-3">Assign Images to Slots</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-200 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">Thumbnail (64x64)</div>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                              value={imageAssignments.thumbnail?.fileName || ''}
                              onChange={(e) => setAssignment('thumbnail', e.target.value)}
                            >
                              <option value="" disabled>Select image</option>
                              {selectedImageSets.map(s => (
                                <option key={s.fileName} value={s.fileName}>{s.fileName}</option>
                              ))}
                            </select>
                            {imageAssignments.thumbnail?.url && (
                              <img src={imageAssignments.thumbnail.url} alt="thumbnail-preview" className="mt-3 w-16 h-16 object-cover rounded" />
                            )}
                          </div>
                         
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )} */}

      {
        showAddModal && <AddProduct setShowAddModal={setShowAddModal} />
      }

      {/* View Product Modal */}
      {showViewModal && viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Product Details</h5>
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
                  <h6 className="text-sm font-semibold text-gray-900 mb-2">Product Information</h6>
                  <p><span className="font-medium text-gray-900">Name:</span> {viewingProduct.name}</p>
                  <p><span className="font-medium text-gray-900">ID:</span> {viewingProduct.id}</p>
                  <p><span className="font-medium text-gray-900">Category:</span> {viewingProduct.category}</p>
                  <p><span className="font-medium text-gray-900">MRP:</span> {viewingProduct.mrp}</p>
                  <p><span className="font-medium text-gray-900">Selling Price:</span> {viewingProduct.sellingPrice}</p>
                  <p><span className="font-medium text-gray-900">Stock:</span> {viewingProduct.stock}</p>
                  <p><span className="font-medium text-gray-900">Status:</span> {viewingProduct.status}</p>
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-2">Product Image</h6>
                  <img src={viewingProduct.image} alt={viewingProduct.name} className="w-full h-auto rounded-lg object-cover" />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingProduct && (
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
              <p className="text-gray-900 mb-4">Are you sure you want to delete "{deletingProduct.name}"?</p>
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

      {/* More Filters Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h5 className="text-xl font-semibold text-gray-900">Advanced Filters</h5>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl" 
                onClick={() => setShowFiltersModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-3">Price Range (₹)</h6>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Minimum Price</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                        placeholder="0"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Maximum Price</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                        placeholder="9999"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Range Filter */}
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-3">Stock Range</h6>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Minimum Stock</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                        placeholder="0"
                        value={stockRange.min}
                        onChange={(e) => setStockRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Maximum Stock</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                        placeholder="9999"
                        value={stockRange.max}
                        onChange={(e) => setStockRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Current Active Filters Display */}
                <div>
                  <h6 className="text-sm font-semibold text-gray-900 mb-3">Active Filters</h6>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {selectedCategory}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span> {selectedStatus}
                    </p>
                    {priceRange.min && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Price Range:</span> ₹{priceRange.min} - {priceRange.max || '∞'}
                      </p>
                    )}
                    {stockRange.min && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Stock Range:</span> {stockRange.min} - {stockRange.max || '∞'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-6 border-t border-gray-200">
              <button 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
              <div className="flex space-x-3">
                <button 
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                  onClick={() => setShowFiltersModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" 
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;