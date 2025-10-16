/**
 * BOOKING.JS - Booking-Specific Functionality
 * Hotel Booking System
 */

// ============================================
// PRICE CALCULATOR
// ============================================

function calculateBookingTotal(pricePerNight, checkInDate, checkOutDate, extras = {}) {
    const nights = LuxeStay.calculateNights(checkInDate, checkOutDate);

    if (nights <= 0) {
        return null;
    }

    const subtotal = pricePerNight * nights;
    const serviceFee = extras.serviceFee || 30; // Default $30 service fee
    const taxRate = extras.taxRate || 0.10; // Default 10% tax
    const discount = extras.discount || 0;

    const tax = subtotal * taxRate;
    const total = subtotal + serviceFee + tax - discount;

    return {
        nights,
        pricePerNight,
        subtotal,
        serviceFee,
        tax,
        taxRate,
        discount,
        total
    };
}

function updatePriceDisplay(calculation) {
    if (!calculation) return;

    // Update breakdown elements
    const elements = {
        nights: document.querySelector('[data-nights]'),
        pricePerNight: document.querySelector('[data-price-per-night]'),
        subtotal: document.querySelector('[data-subtotal]'),
        serviceFee: document.querySelector('[data-service-fee]'),
        tax: document.querySelector('[data-tax]'),
        discount: document.querySelector('[data-discount]'),
        total: document.querySelector('[data-total]')
    };

    if (elements.nights) {
        elements.nights.textContent = `${calculation.nights} ${calculation.nights === 1 ? 'night' : 'nights'}`;
    }

    if (elements.pricePerNight) {
        elements.pricePerNight.textContent = LuxeStay.formatCurrency(calculation.pricePerNight);
    }

    if (elements.subtotal) {
        elements.subtotal.textContent = `${LuxeStay.formatCurrency(calculation.pricePerNight)} × ${calculation.nights} nights = ${LuxeStay.formatCurrency(calculation.subtotal)}`;
    }

    if (elements.serviceFee) {
        elements.serviceFee.textContent = LuxeStay.formatCurrency(calculation.serviceFee);
    }

    if (elements.tax) {
        elements.tax.textContent = LuxeStay.formatCurrency(calculation.tax);
    }

    if (elements.discount && calculation.discount > 0) {
        elements.discount.textContent = `-${LuxeStay.formatCurrency(calculation.discount)}`;
        elements.discount.parentElement.style.display = 'flex';
    }

    if (elements.total) {
        elements.total.textContent = LuxeStay.formatCurrency(calculation.total);
    }
}

// ============================================
// DATE PICKER INITIALIZATION
// ============================================

function initDatePickers() {
    const checkInInput = document.querySelector('input[name="check_in"], #check-in');
    const checkOutInput = document.querySelector('input[name="check_out"], #check-out');

    if (checkInInput) {
        // Set minimum date to today
        checkInInput.min = LuxeStay.getTodayDate();
        checkInInput.value = LuxeStay.getTodayDate();

        checkInInput.addEventListener('change', () => {
            // Update check-out minimum date
            if (checkOutInput) {
                const checkInDate = new Date(checkInInput.value);
                checkInDate.setDate(checkInDate.getDate() + 1);
                checkOutInput.min = checkInDate.toISOString().split('T')[0];

                // If check-out is before new check-in, update it
                if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
                    checkOutInput.value = checkInDate.toISOString().split('T')[0];
                }
            }

            recalculatePrice();
        });
    }

    if (checkOutInput) {
        // Set minimum date to tomorrow
        checkOutInput.min = LuxeStay.getTomorrowDate();
        checkOutInput.value = LuxeStay.getTomorrowDate();

        checkOutInput.addEventListener('change', () => {
            recalculatePrice();
        });
    }

    // Initial price calculation
    recalculatePrice();
}

function recalculatePrice() {
    const checkInInput = document.querySelector('input[name="check_in"], #check-in');
    const checkOutInput = document.querySelector('input[name="check_out"], #check-out');
    const pricePerNightElement = document.querySelector('[data-room-price]');

    if (!checkInInput || !checkOutInput || !pricePerNightElement) return;

    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const pricePerNight = parseFloat(pricePerNightElement.getAttribute('data-room-price'));

    if (!checkIn || !checkOut || !pricePerNight) return;

    const calculation = calculateBookingTotal(pricePerNight, checkIn, checkOut);

    if (calculation) {
        updatePriceDisplay(calculation);
    } else {
        LuxeStay.showToast('Check-out date must be after check-in date', 'error');
    }
}

// ============================================
// BOOKING FORM VALIDATION
// ============================================

function validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
        return 'Please select check-in and check-out dates';
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
        return 'Check-in date cannot be in the past';
    }

    if (checkOutDate <= checkInDate) {
        return 'Check-out date must be after check-in date';
    }

    return null;
}

function validateBookingForm(formData) {
    const errors = {};

    // Validate dates
    const dateError = validateDates(formData.check_in, formData.check_out);
    if (dateError) {
        errors.dates = dateError;
    }

    // Validate guests
    if (!formData.guests || formData.guests < 1) {
        errors.guests = 'Please select number of guests';
    }

    // Validate guest information
    if (!formData.guest_info) {
        errors.guest_info = 'Guest information is required';
        return errors;
    }

    if (!formData.guest_info.full_name || formData.guest_info.full_name.trim().length < 2) {
        errors.full_name = 'Please enter your full name';
    }

    if (!formData.guest_info.email || !LuxeStay.Validation.email(formData.guest_info.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formData.guest_info.phone || !LuxeStay.Validation.phone(formData.guest_info.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.guest_info.country) {
        errors.country = 'Please select your country';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

// ============================================
// SESSION STORAGE MANAGEMENT
// ============================================

function saveBookingData(data) {
    try {
        sessionStorage.setItem('booking_data', JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save booking data:', e);
    }
}

function loadBookingData() {
    try {
        const data = sessionStorage.getItem('booking_data');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load booking data:', e);
        return null;
    }
}

function clearBookingData() {
    try {
        sessionStorage.removeItem('booking_data');
    } catch (e) {
        console.error('Failed to clear booking data:', e);
    }
}

function restoreBookingForm() {
    const savedData = loadBookingData();
    if (!savedData) return false;

    // Restore room selection
    if (savedData.room_id) {
        const roomInput = document.querySelector('input[name="room_id"]');
        if (roomInput) roomInput.value = savedData.room_id;
    }

    // Restore dates
    if (savedData.check_in) {
        const checkInInput = document.querySelector('input[name="check_in"], #check-in');
        if (checkInInput) checkInInput.value = savedData.check_in;
    }

    if (savedData.check_out) {
        const checkOutInput = document.querySelector('input[name="check_out"], #check-out');
        if (checkOutInput) checkOutInput.value = savedData.check_out;
    }

    // Restore guests
    if (savedData.guests) {
        const guestsInput = document.querySelector('select[name="guests"], #guests');
        if (guestsInput) guestsInput.value = savedData.guests;
    }

    // Restore guest information
    if (savedData.guest_info) {
        Object.keys(savedData.guest_info).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) input.value = savedData.guest_info[key];
        });
    }

    return true;
}

// ============================================
// PAYMENT CARD VALIDATION
// ============================================

function formatCardNumber(cardNumber) {
    // Remove all non-digit characters
    const cleaned = cardNumber.replace(/\D/g, '');

    // Add space every 4 digits
    const formatted = cleaned.match(/.{1,4}/g);

    return formatted ? formatted.join(' ') : cleaned;
}

function detectCardBrand(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');

    // Visa
    if (/^4/.test(cleaned)) {
        return 'visa';
    }

    // Mastercard
    if (/^5[1-5]/.test(cleaned) || /^2(2[2-9]|[3-6]|7[0-1]|720)/.test(cleaned)) {
        return 'mastercard';
    }

    // American Express
    if (/^3[47]/.test(cleaned)) {
        return 'amex';
    }

    // Discover
    if (/^6(?:011|5)/.test(cleaned)) {
        return 'discover';
    }

    return 'unknown';
}

function luhnCheck(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');

    if (cleaned.length < 13 || cleaned.length > 19) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

function validateCardNumber(cardNumber) {
    if (!cardNumber) {
        return 'Card number is required';
    }

    if (!luhnCheck(cardNumber)) {
        return 'Invalid card number';
    }

    return null;
}

function validateExpiryDate(expiry) {
    if (!expiry) {
        return 'Expiry date is required';
    }

    const parts = expiry.split('/');
    if (parts.length !== 2) {
        return 'Invalid expiry date format (MM/YY)';
    }

    const month = parseInt(parts[0]);
    const year = parseInt('20' + parts[1]);

    if (month < 1 || month > 12) {
        return 'Invalid month';
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 'Card has expired';
    }

    return null;
}

function validateCVV(cvv, cardBrand) {
    if (!cvv) {
        return 'CVV is required';
    }

    const cleaned = cvv.replace(/\D/g, '');

    if (cardBrand === 'amex') {
        if (cleaned.length !== 4) {
            return 'CVV must be 4 digits for American Express';
        }
    } else {
        if (cleaned.length !== 3) {
            return 'CVV must be 3 digits';
        }
    }

    return null;
}

function formatExpiryDate(expiry) {
    const cleaned = expiry.replace(/\D/g, '');

    if (cleaned.length >= 2) {
        return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }

    return cleaned;
}

// ============================================
// INIT CARD INPUT FORMATTING
// ============================================

function initCardInputs() {
    const cardNumberInput = document.querySelector('input[name="card_number"], #card-number');
    const expiryInput = document.querySelector('input[name="expiry"], #expiry');
    const cvvInput = document.querySelector('input[name="cvv"], #cvv');
    const cardBrandIcon = document.querySelector('.card-brand-icon');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            const formatted = formatCardNumber(e.target.value);
            e.target.value = formatted;

            // Update card brand icon
            const brand = detectCardBrand(formatted);
            if (cardBrandIcon) {
                cardBrandIcon.className = `card-brand-icon ${brand}`;
            }

            // Validate
            if (formatted.replace(/\s/g, '').length >= 13) {
                const error = validateCardNumber(formatted);
                if (error) {
                    LuxeStay.showFieldError(e.target, error);
                } else {
                    LuxeStay.clearFieldError(e.target);
                }
            }
        });

        cardNumberInput.addEventListener('blur', (e) => {
            const error = validateCardNumber(e.target.value);
            if (error) {
                LuxeStay.showFieldError(e.target, error);
            } else {
                LuxeStay.clearFieldError(e.target);
            }
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            const formatted = formatExpiryDate(e.target.value);
            e.target.value = formatted;
        });

        expiryInput.addEventListener('blur', (e) => {
            const error = validateExpiryDate(e.target.value);
            if (error) {
                LuxeStay.showFieldError(e.target, error);
            } else {
                LuxeStay.clearFieldError(e.target);
            }
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            // Only allow digits
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        cvvInput.addEventListener('blur', (e) => {
            const cardBrand = cardNumberInput ? detectCardBrand(cardNumberInput.value) : 'unknown';
            const error = validateCVV(e.target.value, cardBrand);
            if (error) {
                LuxeStay.showFieldError(e.target, error);
            } else {
                LuxeStay.clearFieldError(e.target);
            }
        });
    }
}

// ============================================
// PROMO CODE APPLICATION
// ============================================

async function applyPromoCode(code, bookingId = null) {
    if (!code || code.trim().length === 0) {
        LuxeStay.showToast('Please enter a promo code', 'error');
        return null;
    }

    try {
        const response = await LuxeStay.apiRequest('/api/promo/validate', 'POST', {
            code: code.trim().toUpperCase(),
            booking_id: bookingId
        });

        if (response.success) {
            LuxeStay.showToast('Promo code applied successfully!', 'success');
            return {
                discount: response.discount,
                newTotal: response.new_total
            };
        }
    } catch (error) {
        LuxeStay.showToast(error.message || 'Invalid or expired promo code', 'error');
        return null;
    }
}

function initPromoCode() {
    const promoInput = document.querySelector('input[name="promo_code"], #promo-code');
    const applyButton = document.querySelector('.apply-promo, [data-apply-promo]');

    if (!promoInput || !applyButton) return;

    applyButton.addEventListener('click', async () => {
        const code = promoInput.value;
        const result = await applyPromoCode(code);

        if (result) {
            // Update price display with discount
            const discountElement = document.querySelector('[data-discount]');
            if (discountElement) {
                discountElement.textContent = `-${LuxeStay.formatCurrency(result.discount)}`;
                discountElement.parentElement.style.display = 'flex';
            }

            const totalElement = document.querySelector('[data-total]');
            if (totalElement) {
                totalElement.textContent = LuxeStay.formatCurrency(result.newTotal);
            }

            // Disable promo input and button
            promoInput.disabled = true;
            applyButton.disabled = true;
            applyButton.textContent = 'Applied';
        }
    });
}

// ============================================
// MULTI-STEP BOOKING WIZARD
// ============================================

function initBookingWizard() {
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 1;

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });

        progressSteps.forEach((step, index) => {
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        currentStep = stepNumber;

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('step', stepNumber);
        window.history.pushState({}, '', url);
    }

    // Next button handlers
    document.querySelectorAll('[data-next-step]').forEach(button => {
        button.addEventListener('click', () => {
            const nextStep = parseInt(button.getAttribute('data-next-step'));

            // Validate current step before proceeding
            if (validateCurrentStep(currentStep)) {
                // Save data to sessionStorage
                saveCurrentStepData(currentStep);
                showStep(nextStep);
            }
        });
    });

    // Back button handlers
    document.querySelectorAll('[data-prev-step]').forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = parseInt(button.getAttribute('data-prev-step'));
            showStep(prevStep);
        });
    });

    // Handle browser back button
    window.addEventListener('popstate', () => {
        const url = new URL(window.location);
        const step = parseInt(url.searchParams.get('step')) || 1;
        showStep(step);
    });

    // Initialize first step
    const url = new URL(window.location);
    const initialStep = parseInt(url.searchParams.get('step')) || 1;
    showStep(initialStep);

    // Restore saved data
    const savedData = loadBookingData();
    if (savedData && confirm('You have an incomplete booking. Would you like to continue?')) {
        restoreBookingForm();
    }
}

function validateCurrentStep(stepNumber) {
    const currentStepElement = document.querySelector(`.wizard-step:nth-child(${stepNumber})`);
    if (!currentStepElement) return true;

    const form = currentStepElement.querySelector('form') || currentStepElement.closest('form');
    if (form) {
        return LuxeStay.validateForm(form);
    }

    return true;
}

function saveCurrentStepData(stepNumber) {
    const currentStepElement = document.querySelector(`.wizard-step:nth-child(${stepNumber})`);
    if (!currentStepElement) return;

    const formData = {};
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });

    const existingData = loadBookingData() || {};
    saveBookingData({ ...existingData, ...formData });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initDatePickers();
    initCardInputs();
    initPromoCode();

    // Check if it's a booking wizard page
    if (document.querySelector('.wizard-step')) {
        initBookingWizard();
    }

    // Check if there's saved booking data and offer to restore
    const currentPage = window.location.pathname;
    if (currentPage.includes('booking') && !currentPage.includes('confirmation')) {
        const savedData = loadBookingData();
        if (savedData) {
            restoreBookingForm();
        }
    }
});

// Export for use in other scripts
window.BookingUtils = {
    calculateBookingTotal,
    updatePriceDisplay,
    validateDates,
    validateBookingForm,
    saveBookingData,
    loadBookingData,
    clearBookingData,
    formatCardNumber,
    detectCardBrand,
    luhnCheck,
    validateCardNumber,
    validateExpiryDate,
    validateCVV,
    applyPromoCode
};
