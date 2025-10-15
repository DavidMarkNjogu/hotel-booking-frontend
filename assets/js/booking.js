/* ========================================
   BOOKING.JS
   Booking-specific functionality for hotel booking system
   ======================================== */

// ========== BOOKING STATE ==========

let bookingData = {
    roomId: null,
    roomType: null,
    checkIn: null,
    checkOut: null,
    nights: 0,
    guests: 1,
    roomRate: 0,
    additionalServices: [],
    specialRequests: '',
    subtotal: 0,
    tax: 0,
    total: 0
};

// ========== DATE PICKER INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (checkInInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);

        checkInInput.addEventListener('change', function() {
            bookingData.checkIn = this.value;

            // Set minimum checkout date to one day after check-in
            if (checkOutInput && this.value) {
                const checkIn = new Date(this.value);
                checkIn.setDate(checkIn.setDate() + 1);
                const minCheckOut = checkIn.toISOString().split('T')[0];
                checkOutInput.setAttribute('min', minCheckOut);

                // If checkout is before or same as checkin, clear it
                if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                    checkOutInput.value = '';
                    bookingData.checkOut = null;
                }
            }

            calculateBookingTotal();
        });
    }

    if (checkOutInput) {
        checkOutInput.addEventListener('change', function() {
            bookingData.checkOut = this.value;
            calculateBookingTotal();
        });
    }
});

// ========== GUEST COUNTER ==========

document.addEventListener('DOMContentLoaded', function() {
    const guestDecrement = document.getElementById('guest-decrement');
    const guestIncrement = document.getElementById('guest-increment');
    const guestCount = document.getElementById('guest-count');

    if (guestDecrement && guestIncrement && guestCount) {
        guestDecrement.addEventListener('click', function() {
            let count = parseInt(guestCount.textContent) || 1;
            if (count > 1) {
                count--;
                guestCount.textContent = count;
                bookingData.guests = count;
                calculateBookingTotal();
            }
        });

        guestIncrement.addEventListener('click', function() {
            let count = parseInt(guestCount.textContent) || 1;
            const maxGuests = parseInt(this.getAttribute('data-max')) || 10;
            if (count < maxGuests) {
                count++;
                guestCount.textContent = count;
                bookingData.guests = count;
                calculateBookingTotal();
            }
        });
    }
});

// ========== PRICE CALCULATOR ==========

function calculateBookingTotal() {
    // Calculate number of nights
    if (bookingData.checkIn && bookingData.checkOut) {
        const checkIn = new Date(bookingData.checkIn);
        const checkOut = new Date(bookingData.checkOut);
        bookingData.nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    } else {
        bookingData.nights = 0;
    }

    // Calculate subtotal
    bookingData.subtotal = bookingData.roomRate * bookingData.nights;

    // Add additional services
    bookingData.additionalServices.forEach(service => {
        bookingData.subtotal += service.price;
    });

    // Calculate tax (10%)
    bookingData.tax = bookingData.subtotal * 0.10;

    // Calculate total
    bookingData.total = bookingData.subtotal + bookingData.tax;

    // Update UI
    updatePriceSummary();
}

function updatePriceSummary() {
    // Update nights display
    const nightsDisplay = document.getElementById('nights-display');
    if (nightsDisplay) {
        nightsDisplay.textContent = bookingData.nights;
    }

    // Update room rate display
    const roomRateDisplay = document.getElementById('room-rate-display');
    if (roomRateDisplay) {
        roomRateDisplay.textContent = formatCurrency(bookingData.roomRate);
    }

    // Update subtotal
    const subtotalDisplay = document.getElementById('subtotal-display');
    if (subtotalDisplay) {
        subtotalDisplay.textContent = formatCurrency(bookingData.subtotal);
    }

    // Update tax
    const taxDisplay = document.getElementById('tax-display');
    if (taxDisplay) {
        taxDisplay.textContent = formatCurrency(bookingData.tax);
    }

    // Update total
    const totalDisplay = document.getElementById('total-display');
    if (totalDisplay) {
        totalDisplay.textContent = formatCurrency(bookingData.total);
    }

    // Update nights breakdown
    const nightsBreakdown = document.getElementById('nights-breakdown');
    if (nightsBreakdown && bookingData.nights > 0) {
        nightsBreakdown.textContent = `${formatCurrency(bookingData.roomRate)} × ${bookingData.nights} night${bookingData.nights > 1 ? 's' : ''}`;
    }
}

function setRoomRate(rate) {
    bookingData.roomRate = rate;
    calculateBookingTotal();
}

// ========== ADDITIONAL SERVICES ==========

document.addEventListener('DOMContentLoaded', function() {
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');

    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const serviceName = this.getAttribute('data-service');
            const servicePrice = parseFloat(this.getAttribute('data-price')) || 0;

            if (this.checked) {
                // Add service
                bookingData.additionalServices.push({
                    name: serviceName,
                    price: servicePrice
                });
            } else {
                // Remove service
                bookingData.additionalServices = bookingData.additionalServices.filter(
                    service => service.name !== serviceName
                );
            }

            calculateBookingTotal();
        });
    });
});

// ========== BOOKING FORM VALIDATION ==========

function validateBookingForm() {
    let isValid = true;

    // Validate check-in date
    const checkInInput = document.getElementById('check-in');
    if (checkInInput) {
        if (!checkInInput.value) {
            showError(checkInInput, 'Please select check-in date');
            isValid = false;
        } else {
            showSuccess(checkInInput);
        }
    }

    // Validate check-out date
    const checkOutInput = document.getElementById('check-out');
    if (checkOutInput) {
        if (!checkOutInput.value) {
            showError(checkOutInput, 'Please select check-out date');
            isValid = false;
        } else if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
            showError(checkOutInput, 'Check-out must be after check-in');
            isValid = false;
        } else {
            showSuccess(checkOutInput);
        }
    }

    // Validate full name
    const fullNameInput = document.getElementById('full-name');
    if (fullNameInput) {
        if (!validateRequired(fullNameInput.value)) {
            showError(fullNameInput, 'Please enter your full name');
            isValid = false;
        } else if (fullNameInput.value.trim().split(' ').length < 2) {
            showError(fullNameInput, 'Please enter your first and last name');
            isValid = false;
        } else {
            showSuccess(fullNameInput);
        }
    }

    // Validate email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        if (!validateRequired(emailInput.value)) {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
    }

    // Validate phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        if (!validateRequired(phoneInput.value)) {
            showError(phoneInput, 'Please enter your phone number');
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        } else {
            showSuccess(phoneInput);
        }
    }

    return isValid;
}

// ========== MULTI-STEP WIZARD NAVIGATION ==========

let currentStep = 1;
const totalSteps = 4;

function showStep(stepNumber) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const step = document.getElementById(`step-${i}`);
        if (step) {
            step.classList.remove('active');
            step.style.display = 'none';
        }
    }

    // Show current step
    const currentStepElement = document.getElementById(`step-${stepNumber}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStepElement.style.display = 'block';
    }

    // Update progress bar
    updateProgressBar(stepNumber);

    // Update step indicators
    updateStepIndicators(stepNumber);

    // Update buttons
    updateNavigationButtons(stepNumber);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(stepNumber) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = (stepNumber / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function updateStepIndicators(stepNumber) {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.querySelector(`.step-indicator[data-step="${i}"]`);
        if (indicator) {
            if (i < stepNumber) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else if (i === stepNumber) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        }
    }
}

function updateNavigationButtons(stepNumber) {
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const submitBtn = document.getElementById('submit-booking-btn');

    if (prevBtn) {
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-block';
    }

    if (nextBtn) {
        nextBtn.style.display = stepNumber === totalSteps ? 'none' : 'inline-block';
    }

    if (submitBtn) {
        submitBtn.style.display = stepNumber === totalSteps ? 'inline-block' : 'none';
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            saveBookingProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        default:
            return true;
    }
}

function validateStep1() {
    // Validate room selection and dates
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');

    if (!checkIn.value || !checkOut.value) {
        showToast('Please select check-in and check-out dates', 'error');
        return false;
    }

    return true;
}

function validateStep2() {
    // Validate guest information
    return validateBookingForm();
}

function validateStep3() {
    // Validate payment details
    return validatePaymentForm();
}

// ========== SESSION STORAGE FOR FORM PERSISTENCE ==========

function saveBookingProgress() {
    saveToSessionStorage('bookingData', bookingData);
    saveToSessionStorage('currentStep', currentStep);
}

function loadBookingProgress() {
    const savedBookingData = getFromSessionStorage('bookingData');
    const savedStep = getFromSessionStorage('currentStep');

    if (savedBookingData) {
        bookingData = savedBookingData;
        // Restore form values
        restoreFormValues();
    }

    if (savedStep) {
        currentStep = savedStep;
        showStep(currentStep);
    }
}

function restoreFormValues() {
    // Restore check-in
    const checkInInput = document.getElementById('check-in');
    if (checkInInput && bookingData.checkIn) {
        checkInInput.value = bookingData.checkIn;
    }

    // Restore check-out
    const checkOutInput = document.getElementById('check-out');
    if (checkOutInput && bookingData.checkOut) {
        checkOutInput.value = bookingData.checkOut;
    }

    // Restore guests
    const guestCount = document.getElementById('guest-count');
    if (guestCount && bookingData.guests) {
        guestCount.textContent = bookingData.guests;
    }

    // Recalculate totals
    calculateBookingTotal();
}

// ========== PAYMENT FORM VALIDATION ==========

function validatePaymentForm() {
    let isValid = true;

    // Validate card number
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        if (!validateRequired(cardNumber)) {
            showError(cardNumberInput, 'Please enter card number');
            isValid = false;
        } else if (!validateCreditCard(cardNumber)) {
            showError(cardNumberInput, 'Please enter a valid card number');
            isValid = false;
        } else {
            showSuccess(cardNumberInput);
        }
    }

    // Validate card holder
    const cardHolderInput = document.getElementById('card-holder');
    if (cardHolderInput) {
        if (!validateRequired(cardHolderInput.value)) {
            showError(cardHolderInput, 'Please enter cardholder name');
            isValid = false;
        } else {
            showSuccess(cardHolderInput);
        }
    }

    // Validate expiry date
    const expiryInput = document.getElementById('expiry-date');
    if (expiryInput) {
        if (!validateRequired(expiryInput.value)) {
            showError(expiryInput, 'Please enter expiry date');
            isValid = false;
        } else if (!validateExpiryDate(expiryInput.value)) {
            showError(expiryInput, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            showSuccess(expiryInput);
        }
    }

    // Validate CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        if (!validateRequired(cvvInput.value)) {
            showError(cvvInput, 'Please enter CVV');
            isValid = false;
        } else if (!/^\d{3,4}$/.test(cvvInput.value)) {
            showError(cvvInput, 'Please enter a valid CVV');
            isValid = false;
        } else {
            showSuccess(cvvInput);
        }
    }

    return isValid;
}

// ========== CARD NUMBER FORMATTING ==========

document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('card-number');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;

            // Detect card brand
            detectCardBrand(value);
        });
    }
});

// ========== CARD BRAND DETECTION ==========

function detectCardBrand(cardNumber) {
    const cardBrandDisplay = document.getElementById('card-brand');
    if (!cardBrandDisplay) return;

    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.substring(0, 2);

    let brand = '';
    let icon = '';

    if (firstDigit === '4') {
        brand = 'Visa';
        icon = 'fa-cc-visa';
    } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55') {
        brand = 'Mastercard';
        icon = 'fa-cc-mastercard';
    } else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
        brand = 'American Express';
        icon = 'fa-cc-amex';
    } else if (firstTwoDigits === '60' || firstTwoDigits === '65') {
        brand = 'Discover';
        icon = 'fa-cc-discover';
    }

    if (brand) {
        cardBrandDisplay.innerHTML = `<i class="fab ${icon}"></i> ${brand}`;
    } else {
        cardBrandDisplay.innerHTML = '';
    }
}

// ========== EXPIRY DATE FORMATTING ==========

document.addEventListener('DOMContentLoaded', function() {
    const expiryInput = document.getElementById('expiry-date');

    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
});

// ========== EXPIRY DATE VALIDATION ==========

function validateExpiryDate(expiry) {
    const parts = expiry.split('/');
    if (parts.length !== 2) return false;

    const month = parseInt(parts[0]);
    const year = parseInt('20' + parts[1]);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
}

// ========== LUHN ALGORITHM FOR CARD VALIDATION ==========

function validateCreditCard(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, '');

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

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

// ========== BOOKING SUBMISSION ==========

async function submitBooking(formData) {
    // TODO: Replace with actual API call when backend is ready
    // POST to /api/bookings
    // Expected response: { success: true, booking_id: 12345, confirmation: "LX-2025-0123456" }

    showLoading('Processing your booking...');

    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            hideLoading();
            resolve({
                success: true,
                booking_id: Math.floor(Math.random() * 100000),
                confirmation: `LX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`
            });
        }, 2000);
    });
}

// ========== INITIALIZE BOOKING PAGE ==========

document.addEventListener('DOMContentLoaded', function() {
    // Load saved booking progress if exists
    if (document.querySelector('.booking-flow')) {
        loadBookingProgress();
    }

    // Initialize first step
    if (document.getElementById('step-1')) {
        showStep(1);
    }

    // Add event listeners to navigation buttons
    const prevBtn = document.getElementById('prev-step-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }

    const nextBtn = document.getElementById('next-step-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
});

// ========== EXPORT UTILITIES ==========

window.nextStep = nextStep;
window.prevStep = prevStep;
window.setRoomRate = setRoomRate;
window.calculateBookingTotal = calculateBookingTotal;
window.validateBookingForm = validateBookingForm;
window.validatePaymentForm = validatePaymentForm;
window.submitBooking = submitBooking;
