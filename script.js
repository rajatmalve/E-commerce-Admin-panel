// JavaScript for E-commerce Dashboard

// Global variables
let currentPage = 'dashboard';
let sidebarOpen = true;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    showPage('dashboard');
});

// Initialize dashboard functionality
function initializeDashboard() {
    // Set active navigation item
    updateActiveNavigation();
    
    // Initialize responsive behavior
    handleResponsiveLayout();
    
    // Setup window resize handler
    window.addEventListener('resize', handleResponsiveLayout);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation click handlers
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showPage(page);
        });
    });
    
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.form-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
    
    // Button click handlers
    setupButtonHandlers();
}

// Show specific page
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        updateActiveNavigation();
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 992) {
            closeSidebar();
        }
    }
}

// Update active navigation item
function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const page = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (page === currentPage) {
            link.classList.add('active');
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay') || createSidebarOverlay();
    
    if (window.innerWidth < 992) {
        // Mobile behavior
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    } else {
        // Desktop behavior
        sidebarOpen = !sidebarOpen;
        updateSidebarState();
    }
}

// Close sidebar (mobile)
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('show');
    }
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Create sidebar overlay for mobile
function createSidebarOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
    return overlay;
}

// Update sidebar state
function updateSidebarState() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarOpen) {
        sidebar.style.transform = 'translateX(0)';
        mainContent.style.marginLeft = '260px';
    } else {
        sidebar.style.transform = 'translateX(-260px)';
        mainContent.style.marginLeft = '0';
    }
}

// Handle responsive layout
function handleResponsiveLayout() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth < 992) {
        // Mobile layout
        sidebar.classList.remove('show');
        mainContent.style.marginLeft = '0';
        
        // Create overlay if it doesn't exist
        if (!document.querySelector('.sidebar-overlay')) {
            createSidebarOverlay();
        }
    } else {
        // Desktop layout
        sidebar.classList.remove('show');
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
        updateSidebarState();
    }
}

// Handle search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const currentPageElement = document.querySelector('.page.active');
    
    if (!currentPageElement) return;
    
    // Search in tables
    const tableRows = currentPageElement.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Search in cards/items
    const items = currentPageElement.querySelectorAll('.order-item, .campaign-item, .recommendation-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle filter functionality
function handleFilter(e) {
    const filterValue = e.target.value.toLowerCase();
    const currentPageElement = document.querySelector('.page.active');
    
    if (!currentPageElement || filterValue === 'all') {
        // Show all items
        const allItems = currentPageElement.querySelectorAll('tbody tr, .order-item, .campaign-item');
        allItems.forEach(item => {
            item.style.display = '';
        });
        return;
    }
    
    // Filter based on category, status, etc.
    const tableRows = currentPageElement.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Setup button handlers
function setupButtonHandlers() {
    // Add Product button
    const addProductBtn = document.querySelector('#products-page .btn-primary');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            showModal('Add New Product', createProductForm());
        });
    }
    
    // Create Campaign button
    const createCampaignBtn = document.querySelector('#marketing-page .btn-primary');
    if (createCampaignBtn) {
        createCampaignBtn.addEventListener('click', function() {
            showModal('Create New Campaign', createCampaignForm());
        });
    }
    
    // View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.btn-primary');
    viewDetailsButtons.forEach(btn => {
        if (btn.textContent.includes('View Details')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const orderId = row.querySelector('strong').textContent;
                showOrderDetails(orderId);
            });
        }
    });
    
    // Action buttons
    setupActionButtons();
}

// Setup action buttons (edit, delete, view)
function setupActionButtons() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-outline-secondary');
    editButtons.forEach(btn => {
        if (btn.querySelector('.fa-edit')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const productName = row.querySelector('.product-name').textContent;
                showModal('Edit Product', createProductForm(productName));
            });
        }
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-outline-danger');
    deleteButtons.forEach(btn => {
        if (btn.querySelector('.fa-trash')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const itemName = row.querySelector('.product-name, .fw-bold').textContent;
                showConfirmDialog('Delete Item', `Are you sure you want to delete "${itemName}"?`);
            });
        }
    });
    
    // View buttons
    const viewButtons = document.querySelectorAll('.btn-outline-primary');
    viewButtons.forEach(btn => {
        if (btn.querySelector('.fa-eye')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const itemName = row.querySelector('.product-name, .fw-bold').textContent;
                showItemDetails(itemName);
            });
        }
    });
}

// Show modal dialog
function showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('dynamicModal');
    if (!modal) {
        modal = createModal();
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Create modal element
function createModal() {
    const modalHTML = `
        <div class="modal fade" id="dynamicModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    return document.getElementById('dynamicModal');
}

// Create product form
function createProductForm(productName = '') {
    return `
        <form>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" value="${productName}" placeholder="Enter product name">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select">
                        <option>Select Category</option>
                        <option>Clothing</option>
                        <option>Electronics</option>
                        <option>Beauty</option>
                        <option>Home</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">MRP (₹)</label>
                    <input type="number" class="form-control" placeholder="0">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Selling Price (₹)</label>
                    <input type="number" class="form-control" placeholder="0">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Stock Quantity</label>
                    <input type="number" class="form-control" placeholder="0">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Status</label>
                    <select class="form-select">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" placeholder="Enter product description"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Product Images</label>
                    <input type="file" class="form-control" multiple accept="image/*">
                </div>
            </div>
        </form>
    `;
}

// Create campaign form
function createCampaignForm() {
    return `
        <form>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Campaign Name</label>
                    <input type="text" class="form-control" placeholder="Enter campaign name">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Campaign Type</label>
                    <select class="form-select">
                        <option>Discount</option>
                        <option>Free Shipping</option>
                        <option>Buy One Get One</option>
                        <option>Seasonal Sale</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Discount Percentage</label>
                    <input type="number" class="form-control" placeholder="0" min="0" max="100">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Minimum Order Value (₹)</label>
                    <input type="number" class="form-control" placeholder="0">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Start Date</label>
                    <input type="date" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">End Date</label>
                    <input type="date" class="form-control">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Campaign Description</label>
                    <textarea class="form-control" rows="3" placeholder="Enter campaign description"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="autoApply">
                        <label class="form-check-label" for="autoApply">
                            Auto-apply discount at checkout
                        </label>
                    </div>
                </div>
            </div>
        </form>
    `;
}

// Show order details
function showOrderDetails(orderId) {
    const orderDetailsHTML = `
        <div class="order-details">
            <div class="row">
                <div class="col-md-6">
                    <h6>Order Information</h6>
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Date:</strong> 2024-01-15</p>
                    <p><strong>Status:</strong> <span class="badge badge-processing">Processing</span></p>
                    <p><strong>Payment:</strong> <span class="badge badge-paid">Paid</span></p>
                </div>
                <div class="col-md-6">
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> Rajesh Kumar</p>
                    <p><strong>Email:</strong> rajesh@example.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> Mumbai, Maharashtra</p>
                </div>
            </div>
            <hr>
            <h6>Order Items</h6>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Premium Cotton T-Shirt</td>
                            <td>2</td>
                            <td>₹599</td>
                            <td>₹1,198</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>1</td>
                            <td>₹52</td>
                            <td>₹52</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3">Total</th>
                            <th>₹1,250</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    
    showModal('Order Details', orderDetailsHTML);
}

// Show item details
function showItemDetails(itemName) {
    const detailsHTML = `
        <div class="item-details">
            <h6>${itemName}</h6>
            <p>Detailed information about ${itemName} would be displayed here.</p>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Category:</strong> Clothing</p>
                    <p><strong>Brand:</strong> Premium Brand</p>
                    <p><strong>SKU:</strong> PRM-TSH-001</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Stock:</strong> 150 units</p>
                    <p><strong>Status:</strong> Active</p>
                    <p><strong>Last Updated:</strong> 2024-01-15</p>
                </div>
            </div>
        </div>
    `;
    
    showModal('Item Details', detailsHTML);
}

// Show confirmation dialog
function showConfirmDialog(title, message) {
    const confirmHTML = `
        <div class="text-center">
            <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p>${message}</p>
        </div>
    `;
    
    showModal(title, confirmHTML);
    
    // Update modal footer for confirmation
    const modal = document.getElementById('dynamicModal');
    const footer = modal.querySelector('.modal-footer');
    footer.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" onclick="confirmDelete()">Delete</button>
    `;
}

// Confirm delete action
function confirmDelete() {
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('dynamicModal'));
    modal.hide();
    
    // Show success message
    showToast('Item deleted successfully', 'success');
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert">
            <div class="toast-header">
                <i class="fas fa-${getToastIcon(type)} text-${type} me-2"></i>
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// Get toast icon based on type
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN').format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.showPage = showPage;
window.toggleSidebar = toggleSidebar;
window.confirmDelete = confirmDelete;