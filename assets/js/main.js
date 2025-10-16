/**
 * MAIN.JS - Core JavaScript Functionality
 * Hotel Booking System
 */

// ============================================
// NAVBAR SCROLL BEHAVIOR
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Check if navbar should start as scrolled
    const startScrolled = navbar.classList.contains('scrolled');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (!startScrolled) {
            // Only remove scrolled class if it didn't start scrolled
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when nav link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ============================================
// AUTHENTICATION STATUS CHECK
// ============================================

function checkAuthStatus() {
    const token = localStorage.getItem('auth_token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const credentials = document.querySelector('.credentials');
    if (!credentials) return;

    if (token && user.full_name) {
        // User is logged in - show user dropdown
        credentials.innerHTML = `
            <div class="user-dropdown">
                <img src="${user.avatar_url || '/assets/images/default-avatar.png'}" alt="${user.full_name}" class="user-avatar">
                <span class="user-name">${user.full_name}</span>
                <i class="fas fa-chevron-down"></i>
                <div class="user-dropdown-menu">
                    <a href="/public/profile.html"><i class="fas fa-user"></i> My Profile</a>
                    <a href="/public/profile.html?view=bookings"><i class="fas fa-calendar"></i> My Bookings</a>
                    <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;

        // Add logout functionality
        document.querySelector('.logout-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        // User not logged in - show login/signup buttons
        credentials.innerHTML = `
            <a href="/public/login.html" class="button-secondary">Login</a>
            <a href="/public/login.html?tab=register" class="button-primary">Sign Up</a>
        `;
    }
}

function logout() {
    if (confirm('Are you sure you want to log out?')) {
        // Clear local storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');

        // Call logout API
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }).finally(() => {
            // Redirect to login page
            window.location.href = '/public/login.html';
        });
    }
}

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

const Validation = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    phone: (phone) => {
        // Flexible international phone validation
        const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    required: (value) => {
        return value && value.trim().length > 0;
    },

    minLength: (value, min) => {
        return value && value.length >= min;
    },

    maxLength: (value, max) => {
        return value && value.length <= max;
    },

    password: (password) => {
        // Min 8 chars, at least one uppercase, one lowercase, one number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return re.test(password);
    },

    passwordStrength: (password) => {
        if (!password) return 'weak';

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 3) return 'medium';
        return 'strong';
    },

    matchPassword: (password, confirmPassword) => {
        return password === confirmPassword;
    }
};

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('[required], [data-validate]');

    inputs.forEach(input => {
        const error = validateField(input);
        if (error) {
            showFieldError(input, error);
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const minLength = field.getAttribute('minlength');
    const maxLength = field.getAttribute('maxlength');
    const pattern = field.getAttribute('pattern');

    // Check required
    if (required && !Validation.required(value)) {
        return 'This field is required';
    }

    if (!value) return null; // If not required and empty, skip other validations

    // Check email
    if (type === 'email' && !Validation.email(value)) {
        return 'Please enter a valid email address';
    }

    // Check phone
    if (type === 'tel' && !Validation.phone(value)) {
        return 'Please enter a valid phone number';
    }

    // Check min length
    if (minLength && !Validation.minLength(value, parseInt(minLength))) {
        return `Minimum ${minLength} characters required`;
    }

    // Check max length
    if (maxLength && !Validation.maxLength(value, parseInt(maxLength))) {
        return `Maximum ${maxLength} characters allowed`;
    }

    // Check pattern
    if (pattern) {
        const re = new RegExp(pattern);
        if (!re.test(value)) {
            return field.getAttribute('data-error-message') || 'Invalid format';
        }
    }

    // Check password strength
    if (field.classList.contains('password-strength-check')) {
        if (!Validation.password(value)) {
            return 'Password must be at least 8 characters with uppercase, lowercase, and number';
        }
    }

    // Check password match
    if (field.hasAttribute('data-match')) {
        const matchField = document.querySelector(`[name="${field.getAttribute('data-match')}"]`);
        if (matchField && value !== matchField.value) {
            return 'Passwords do not match';
        }
    }

    return null;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');

    let errorDiv = field.parentElement.querySelector('.form-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.classList.add('success');

    const errorDiv = field.parentElement.querySelector('.form-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// ============================================
// DATE UTILITIES
// ============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

// ============================================
// CURRENCY FORMATTING
// ============================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Determine icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-message">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    // Close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    // Auto-remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// MODAL UTILITIES
// ============================================

function openModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initModals() {
    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on close button click
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// CLIPBOARD UTILITIES
// ============================================

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy to clipboard', 'error');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!', 'success');
        } catch (err) {
            showToast('Failed to copy to clipboard', 'error');
        }
        document.body.removeChild(textarea);
    }
}

// ============================================
// LOADING STATE
// ============================================

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('button-loading');
        button.disabled = true;
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = 'Processing...';
    } else {
        button.classList.remove('button-loading');
        button.disabled = false;
        button.textContent = button.getAttribute('data-original-text') || button.textContent;
    }
}

function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loader"></div>';
    overlay.id = 'global-loading';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('global-loading');
    if (overlay) {
        overlay.remove();
    }
}

// ============================================
// API UTILITIES
// ============================================

async function apiRequest(url, method = 'GET', data = null) {
    const token = localStorage.getItem('auth_token');

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    checkAuthStatus();
    initModals();
    initSmoothScroll();

    // Add real-time validation to all forms
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                const error = validateField(input);
                if (error) {
                    showFieldError(input, error);
                } else {
                    clearFieldError(input);
                }
            });

            // Clear error on input
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    const error = validateField(input);
                    if (!error) {
                        clearFieldError(input);
                    }
                }
            });
        });

        // Validate on submit
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });
});

// Export for use in other scripts
window.LuxeStay = {
    Validation,
    validateForm,
    validateField,
    showFieldError,
    clearFieldError,
    formatDate,
    calculateNights,
    getTodayDate,
    getTomorrowDate,
    formatCurrency,
    showToast,
    openModal,
    closeModal,
    copyToClipboard,
    setButtonLoading,
    showLoading,
    hideLoading,
    apiRequest,
    checkAuthStatus,
    logout
};
