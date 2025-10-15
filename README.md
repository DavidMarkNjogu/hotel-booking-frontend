# LuxeStay Hotel - Booking Frontend

A comprehensive hotel booking frontend system with green theme design, responsive layouts, and complete CRUD functionality.

## 📁 Project Structure

```
hotel-booking-frontend/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main green theme (2,252 lines)
│   │   ├── components.css     # Reusable components (950 lines)
│   │   └── admin.css          # Admin dashboard styles (800 lines)
│   ├── js/
│   │   ├── main.js            # Core utilities & validation
│   │   ├── booking.js         # Booking flow & payment
│   │   └── admin.js           # Admin CRUD & charts
│   └── images/                # Place your images here
├── includes/
│   ├── header.php             # Public navbar
│   ├── footer.php             # Public footer
│   ├── admin-sidebar.php      # Admin sidebar navigation
│   └── admin-footer.php       # Admin layout closer
├── public/
│   └── login.html             # ✅ Complete reference implementation
└── admin/                     # Admin pages go here
```

## 🎨 Design Features

- **Color Scheme**: Green theme (HSL 87, 100%) with 9 lightness variants
- **Responsive**: Mobile-first design (320px - 1440px+)
- **Animations**: Scroll-based animations (fadeUp, fadeInLeft, imageReveal)
- **Components**: 30+ reusable components (cards, forms, modals, tables)
- **Admin**: Complete dashboard with charts and CRUD interface

## 🚀 Quick Start

### 1. **View Locally**

**Option A: Python Server**
```bash
cd hotel-booking-frontend
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Option B: PHP Server**
```bash
cd hotel-booking-frontend
php -S localhost:8000
# Visit: http://localhost:8000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 2. **Test the Login Page**

```bash
# Visit in browser:
http://localhost:8000/public/login.html
```

This page demonstrates:
- ✅ Tab navigation (Login/Register)
- ✅ Form validation
- ✅ Password visibility toggle
- ✅ Forgot password modal
- ✅ Responsive design

## 📝 Creating Remaining Pages

All templates are in `IMPLEMENTATION-GUIDE.md`. To create a page:

### Example: Create rooms.html

1. Open `IMPLEMENTATION-GUIDE.md`
2. Find "public/rooms.html" template
3. Copy the template code
4. Save as `public/rooms.html`
5. Replace placeholders with your content
6. Test in browser

**Pages to Create** (templates provided):
- [ ] public/rooms.html - Room listing with filters
- [ ] public/room-detail.html - Single room details
- [ ] public/booking-flow.html - Multi-step booking wizard
- [ ] public/booking.html - Simple booking form
- [ ] public/payment.html - Payment processing
- [ ] public/confirmation.html - Booking success
- [ ] public/profile.html - Customer dashboard
- [ ] admin/dashboard.html - Admin overview with charts
- [ ] admin/employee-dashboard.html - CRUD interface
- [ ] admin/profile-dashboard.html - Admin profile
- [ ] index.html - Landing page

## 💻 Key Components & Usage

### Using Room Cards
```html
<div class="room-card fadeInFromLeft">
    <div class="room-card-image">
        <img src="/assets/images/room-1.jpg" alt="Deluxe Suite">
        <span class="room-card-badge">Available</span>
    </div>
    <div class="room-card-content">
        <h3 class="room-card-title">Deluxe Suite</h3>
        <div class="room-card-details">
            <span><i class="fas fa-bed"></i> King Bed</span>
            <span><i class="fas fa-users"></i> 2 Guests</span>
        </div>
        <div class="room-card-price">$299 <span>/ night</span></div>
        <a href="#" class="button button-primary">View Details</a>
    </div>
</div>
```

### Using Forms
```html
<form onsubmit="handleSubmit(event)">
    <div class="form-group">
        <label class="form-label required">Email</label>
        <input type="email" class="form-input" required>
    </div>
    <button class="button button-primary">Submit</button>
</form>
```

### Using Modals
```html
<!-- Button to open -->
<button onclick="openModal('my-modal')">Open Modal</button>

<!-- Modal -->
<div id="my-modal" class="modal-overlay">
    <div class="modal">
        <div class="modal-header">
            <h3 class="modal-title">Title</h3>
            <button class="modal-close" onclick="closeModal('my-modal')">×</button>
        </div>
        <div class="modal-body">Content here</div>
    </div>
</div>
```

### JavaScript Functions Available

```javascript
// Validation
validateEmail(email)
validatePhone(phone)
validatePassword(password)
validateCreditCard(cardNumber)

// UI
showToast(message, type, duration)
openModal(modalId)
closeModal(modalId)
showLoading(message)
hideLoading()

// Formatting
formatCurrency(amount)
formatDate(date)
formatDateTime(date)

// Booking
setRoomRate(rate)
calculateBookingTotal()
nextStep() / prevStep()  // For booking wizard

// Admin
initDataTable(tableId, data, columns)
openCrudModal(type, action, data)
saveCrudForm(type)
```

## 🎯 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend Ready**: Procedural PHP + MySQL
- **Icons**: Font Awesome 6.4.0
- **Charts**: Chart.js 4.4.0
- **Design**: Mobile-first, responsive, green theme

## 📦 What's Included

### CSS (4,000+ lines)
- ✅ Complete green color system with CSS variables
- ✅ Responsive navbar with hamburger menu
- ✅ Hero sections with overlays
- ✅ Property/room cards with animations
- ✅ Forms with validation states
- ✅ Modals, tooltips, dropdowns
- ✅ Data tables with sorting/filtering
- ✅ Admin sidebar and topbar
- ✅ Charts containers
- ✅ FAQ accordion
- ✅ Footer layouts

### JavaScript (1,300+ lines)
- ✅ Navbar scroll behavior
- ✅ Hamburger menu toggle
- ✅ Form validation (email, phone, password, credit card)
- ✅ Toast notifications
- ✅ Modal management
- ✅ Date picker initialization
- ✅ Price calculator
- ✅ Multi-step wizard
- ✅ Payment validation (Luhn algorithm)
- ✅ Card brand detection
- ✅ Data table with CRUD
- ✅ Chart.js initialization
- ✅ Image upload with drag & drop

### PHP Includes
- ✅ Public navbar with responsive menu
- ✅ Footer with navigation
- ✅ Admin sidebar with collapsible nav
- ✅ Ready for PHP backend integration

## 🌐 Deployment Options

### GitHub
```bash
cd hotel-booking-frontend
git init
git add .
git commit -m "Initial commit: Hotel booking frontend"
git branch -M main
git remote add origin https://github.com/yourusername/hotel-booking-frontend.git
git push -u origin main
```

### Netlify (Free Static Hosting)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your GitHub repo
4. Deploy automatically

### Vercel (Free Static Hosting)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy automatically

### Traditional Hosting (with PHP)
1. Upload files via FTP/SFTP
2. Place in public_html or www folder
3. Ensure PHP 7.4+ is installed
4. Configure database connection (when backend is ready)

## 🔧 Backend Integration

When ready to add backend:

1. **API Endpoints Needed** (see `IMPLEMENTATION-GUIDE.md`):
   - POST /api/auth/login
   - POST /api/auth/register
   - GET /api/rooms
   - POST /api/bookings
   - GET /api/admin/dashboard-stats
   - CRUD endpoints for rooms, bookings, customers

2. **Database Schema** (see `planning.md`):
   - rooms, bookings, customers, payments, admin_users tables

3. **Replace API Placeholders**:
   - Search for `// TODO: Replace with actual API call`
   - Update with your PHP endpoints

## 📸 Screenshots

> Add screenshots of your completed pages here

## 🐛 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project was created for LuxeStay Hotel booking system.

## 🤝 Contributing

1. Create remaining pages using templates in `IMPLEMENTATION-GUIDE.md`
2. Add your hotel images to `assets/images/`
3. Test all forms and interactions
4. Connect to your PHP backend

## 📞 Support

For questions or issues:
- Review `IMPLEMENTATION-GUIDE.md` for page templates
- Check `planning.md` for complete specifications
- All CSS classes are documented in the stylesheets

---

**Status**: Foundation complete ✅ | Pages to create: 10 | Backend: Not yet integrated

Built with ❤️ using vanilla HTML, CSS, and JavaScript with green theme design.
