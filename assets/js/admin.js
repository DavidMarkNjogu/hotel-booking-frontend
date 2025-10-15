/* ========================================
   ADMIN.JS
   Admin-specific functionality for hotel booking system
   ======================================== */

// ========== SIDEBAR TOGGLE ==========

document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.topbar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');

            // On mobile, use different class
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('mobile-open');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle('active');
                }
            }
        });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            this.classList.remove('active');
        });
    }
});

// ========== DATA TABLE STATE ==========

let tableState = {
    currentPage: 1,
    itemsPerPage: 10,
    sortColumn: null,
    sortDirection: 'asc',
    searchQuery: '',
    filterColumn: null,
    filterValue: null,
    data: []
};

// ========== DATA TABLE INITIALIZATION ==========

function initDataTable(tableId, data, columns) {
    tableState.data = data;
    tableState.currentPage = 1;

    renderTable(tableId, columns);
    renderPagination(tableId);
}

function renderTable(tableId, columns) {
    const table = document.getElementById(tableId);
    if (!table) return;

    // Get filtered and sorted data
    let processedData = filterData(tableState.data);
    processedData = sortData(processedData);

    // Get paginated data
    const startIndex = (tableState.currentPage - 1) * tableState.itemsPerPage;
    const endIndex = startIndex + tableState.itemsPerPage;
    const paginatedData = processedData.slice(startIndex, endIndex);

    // Clear table body
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Render rows
    paginatedData.forEach(item => {
        const row = document.createElement('tr');

        columns.forEach(column => {
            const cell = document.createElement('td');

            if (column.render) {
                cell.innerHTML = column.render(item);
            } else {
                cell.textContent = item[column.key] || '';
            }

            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    // Update pagination info
    updatePaginationInfo(processedData.length);
}

// ========== SORTING ==========

function sortData(data) {
    if (!tableState.sortColumn) return data;

    return [...data].sort((a, b) => {
        let aVal = a[tableState.sortColumn];
        let bVal = b[tableState.sortColumn];

        // Handle different data types
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) {
            return tableState.sortDirection === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
            return tableState.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

function sortTable(column) {
    if (tableState.sortColumn === column) {
        // Toggle direction
        tableState.sortDirection = tableState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        tableState.sortColumn = column;
        tableState.sortDirection = 'asc';
    }

    // Re-render table
    renderTable('data-table', getTableColumns());
}

// ========== FILTERING ==========

function filterData(data) {
    let filtered = data;

    // Apply search filter
    if (tableState.searchQuery) {
        filtered = filtered.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(tableState.searchQuery.toLowerCase())
            );
        });
    }

    // Apply column filter
    if (tableState.filterColumn && tableState.filterValue) {
        filtered = filtered.filter(item =>
            String(item[tableState.filterColumn]).toLowerCase() === tableState.filterValue.toLowerCase()
        );
    }

    return filtered;
}

function searchTable(query) {
    tableState.searchQuery = query;
    tableState.currentPage = 1;
    renderTable('data-table', getTableColumns());
    renderPagination('data-table');
}

// ========== PAGINATION ==========

function renderPagination(tableId) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    const totalItems = filterData(tableState.data).length;
    const totalPages = Math.ceil(totalItems / tableState.itemsPerPage);

    paginationContainer.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = tableState.currentPage === 1;
    prevBtn.addEventListener('click', () => goToPage(tableState.currentPage - 1));
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    const startPage = Math.max(1, tableState.currentPage - 2);
    const endPage = Math.min(totalPages, tableState.currentPage + 2);

    if (startPage > 1) {
        addPageButton(paginationContainer, 1);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(paginationContainer, i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
        addPageButton(paginationContainer, totalPages);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = tableState.currentPage === totalPages;
    nextBtn.addEventListener('click', () => goToPage(tableState.currentPage + 1));
    paginationContainer.appendChild(nextBtn);
}

function addPageButton(container, pageNumber) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    if (pageNumber === tableState.currentPage) {
        btn.classList.add('active');
    }
    btn.textContent = pageNumber;
    btn.addEventListener('click', () => goToPage(pageNumber));
    container.appendChild(btn);
}

function goToPage(pageNumber) {
    const totalItems = filterData(tableState.data).length;
    const totalPages = Math.ceil(totalItems / tableState.itemsPerPage);

    if (pageNumber >= 1 && pageNumber <= totalPages) {
        tableState.currentPage = pageNumber;
        renderTable('data-table', getTableColumns());
        renderPagination('data-table');
    }
}

function updatePaginationInfo(totalItems) {
    const paginationInfo = document.querySelector('.pagination-info');
    if (!paginationInfo) return;

    const startIndex = (tableState.currentPage - 1) * tableState.itemsPerPage + 1;
    const endIndex = Math.min(tableState.currentPage * tableState.itemsPerPage, totalItems);

    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalItems}`;
}

// ========== CRUD MODALS ==========

let currentEditId = null;
let currentModalType = null;

function openCrudModal(type, action, data = null) {
    currentModalType = type;
    const modalId = `${type}-modal`;
    const modal = document.getElementById(modalId);

    if (!modal) return;

    // Set modal title
    const modalTitle = modal.querySelector('.modal-title');
    if (modalTitle) {
        modalTitle.textContent = action === 'edit' ? `Edit ${capitalize(type)}` : `Add New ${capitalize(type)}`;
    }

    // Populate form if editing
    if (action === 'edit' && data) {
        currentEditId = data.id;
        populateForm(modalId, data);
    } else {
        currentEditId = null;
        clearForm(modalId);
    }

    openModal(modalId);
}

function closeCrudModal(type) {
    const modalId = `${type}-modal`;
    closeModal(modalId);
    currentEditId = null;
    clearForm(modalId);
}

function populateForm(modalId, data) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (!form) return;

    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = !!data[key];
            } else {
                input.value = data[key];
            }
        }
    });
}

function clearForm(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (form) {
        form.reset();
    }
}

// ========== CRUD OPERATIONS ==========

async function createItem(type, data) {
    // TODO: Replace with actual API call
    // POST to /api/admin/${type}
    // Expected response: { success: true, id: 123, data: {...} }

    showLoading('Creating...');

    return new Promise((resolve) => {
        setTimeout(() => {
            hideLoading();
            showToast(`${capitalize(type)} created successfully`, 'success');
            resolve({ success: true, id: Date.now(), data });
        }, 1000);
    });
}

async function updateItem(type, id, data) {
    // TODO: Replace with actual API call
    // PUT to /api/admin/${type}/${id}
    // Expected response: { success: true, data: {...} }

    showLoading('Updating...');

    return new Promise((resolve) => {
        setTimeout(() => {
            hideLoading();
            showToast(`${capitalize(type)} updated successfully`, 'success');
            resolve({ success: true, data });
        }, 1000);
    });
}

async function deleteItem(type, id) {
    // TODO: Replace with actual API call
    // DELETE to /api/admin/${type}/${id}
    // Expected response: { success: true }

    const confirmed = confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmed) return;

    showLoading('Deleting...');

    return new Promise((resolve) => {
        setTimeout(() => {
            hideLoading();
            showToast(`${capitalize(type)} deleted successfully`, 'success');
            resolve({ success: true });
        }, 1000);
    });
}

async function saveCrudForm(type) {
    const modalId = `${type}-modal`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (!form) return;

    // Validate form
    if (!validateCrudForm(form)) {
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Create or update
    if (currentEditId) {
        await updateItem(type, currentEditId, data);
    } else {
        await createItem(type, data);
    }

    // Close modal and refresh table
    closeCrudModal(type);
    refreshTable();
}

function validateCrudForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateRequired(input.value)) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

// ========== BULK ACTIONS ==========

let selectedItems = new Set();

function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        const id = cb.getAttribute('data-id');
        if (checkbox.checked) {
            selectedItems.add(id);
        } else {
            selectedItems.delete(id);
        }
    });
    updateBulkActionsBar();
}

function toggleSelectRow(checkbox) {
    const id = checkbox.getAttribute('data-id');
    if (checkbox.checked) {
        selectedItems.add(id);
    } else {
        selectedItems.delete(id);
    }
    updateBulkActionsBar();
}

function updateBulkActionsBar() {
    const bulkActionsBar = document.querySelector('.bulk-actions-bar');
    const selectedCount = document.querySelector('.selected-count');

    if (bulkActionsBar && selectedCount) {
        if (selectedItems.size > 0) {
            bulkActionsBar.style.display = 'flex';
            selectedCount.textContent = `${selectedItems.size} item${selectedItems.size > 1 ? 's' : ''} selected`;
        } else {
            bulkActionsBar.style.display = 'none';
        }
    }
}

async function bulkDelete(type) {
    if (selectedItems.size === 0) return;

    const confirmed = confirm(`Are you sure you want to delete ${selectedItems.size} ${type}(s)?`);
    if (!confirmed) return;

    showLoading('Deleting...');

    // TODO: Replace with actual API call
    // DELETE to /api/admin/${type}/bulk
    // Body: { ids: Array.from(selectedItems) }

    setTimeout(() => {
        hideLoading();
        showToast(`${selectedItems.size} ${type}(s) deleted successfully`, 'success');
        selectedItems.clear();
        updateBulkActionsBar();
        refreshTable();
    }, 1000);
}

// ========== CHART INITIALIZATION ==========

function initCharts() {
    // Initialize booking trends chart
    initBookingTrendsChart();

    // Initialize room status chart
    initRoomStatusChart();

    // Initialize revenue chart
    initRevenueChart();
}

function initBookingTrendsChart() {
    const ctx = document.getElementById('booking-trends-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Bookings',
                data: [65, 78, 90, 81, 96, 105, 112, 128, 119, 134, 142, 156],
                borderColor: 'hsl(87, 100%, 50%)',
                backgroundColor: 'hsla(87, 100%, 50%, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initRoomStatusChart() {
    const ctx = document.getElementById('room-status-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Available', 'Occupied', 'Maintenance', 'Reserved'],
            datasets: [{
                data: [15, 28, 3, 9],
                backgroundColor: [
                    'hsl(87, 100%, 50%)',
                    'hsl(87, 100%, 36%)',
                    'hsl(0, 100%, 65%)',
                    'hsl(87, 100%, 81%)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [12400, 15600, 18200, 16800, 21300, 24500],
                backgroundColor: 'hsl(87, 100%, 50%)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// ========== DASHBOARD STATS UPDATE ==========

async function fetchDashboardStats() {
    // TODO: Replace with actual API call
    // GET /api/admin/dashboard-stats
    // Expected response: { totalBookings, totalRevenue, occupancyRate, newCustomers }

    return {
        totalBookings: 1247,
        totalRevenue: 156780,
        occupancyRate: 78.5,
        newCustomers: 234
    };
}

function updateDashboardStats(stats) {
    // Update stat cards
    const totalBookingsEl = document.getElementById('total-bookings');
    if (totalBookingsEl) {
        totalBookingsEl.textContent = stats.totalBookings.toLocaleString();
    }

    const totalRevenueEl = document.getElementById('total-revenue');
    if (totalRevenueEl) {
        totalRevenueEl.textContent = formatCurrency(stats.totalRevenue);
    }

    const occupancyRateEl = document.getElementById('occupancy-rate');
    if (occupancyRateEl) {
        occupancyRateEl.textContent = stats.occupancyRate + '%';
    }

    const newCustomersEl = document.getElementById('new-customers');
    if (newCustomersEl) {
        newCustomersEl.textContent = stats.newCustomers.toLocaleString();
    }
}

// ========== API CALL UTILITIES ==========

async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API call failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        showToast(error.message || 'An error occurred', 'error');
        return null;
    }
}

// ========== IMAGE UPLOAD ==========

function initImageUpload() {
    const uploadArea = document.querySelector('.image-upload-area');
    const fileInput = document.getElementById('image-upload-input');

    if (!uploadArea || !fileInput) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // File selection
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    const previewGrid = document.querySelector('.image-preview-grid');
    if (!previewGrid) return;

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="image-preview-img">
                <button type="button" class="image-preview-remove" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previewGrid.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

// ========== UTILITY FUNCTIONS ==========

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function refreshTable() {
    // Re-fetch data and re-render table
    // TODO: Implement actual data fetching
    renderTable('data-table', getTableColumns());
    renderPagination('data-table');
}

function getTableColumns() {
    // This should be dynamically set based on the current view
    // For now, return empty array
    return [];
}

// ========== SEARCH DEBOUNCING ==========

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.data-table-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchTable(e.target.value);
        }, 300));
    }
});

// ========== INITIALIZE ADMIN DASHBOARD ==========

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        initCharts();
    }

    // Fetch and update dashboard stats
    fetchDashboardStats().then(stats => {
        updateDashboardStats(stats);
    });

    // Initialize image upload if on create/edit pages
    initImageUpload();
});

// ========== EXPORT UTILITIES ==========

window.sortTable = sortTable;
window.searchTable = searchTable;
window.goToPage = goToPage;
window.openCrudModal = openCrudModal;
window.closeCrudModal = closeCrudModal;
window.saveCrudForm = saveCrudForm;
window.deleteItem = deleteItem;
window.toggleSelectAll = toggleSelectAll;
window.toggleSelectRow = toggleSelectRow;
window.bulkDelete = bulkDelete;
window.initDataTable = initDataTable;
