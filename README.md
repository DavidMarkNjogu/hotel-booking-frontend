# LuxeStay Hotel Booking Frontend

A comprehensive hotel booking system frontend built with HTML, CSS, JavaScript, and PHP includes. Features a modern green theme (HSL 87, 100%) and responsive design.

## Project Structure

```
hotel-booking-frontend/
├── assets/
│   ├── css/
│   │   ├── style.css           # Main theme styles (from real-estate-ui)
│   │   └── components.css      # Reusable UI components
│   ├── js/
│   │   ├── main.js             # Core functionality
│   │   └── booking.js          # Booking-specific features
│   └── images/                 # Image assets
├── includes/
│   ├── header.php              # Public navbar
│   └── footer.php              # Public footer
└── public/
    ├── login.html              # Authentication (login/register)
    ├── rooms.html              # Room listing with filters
    ├── room-detail.html        # Single room details
    ├── booking-flow.html       # Multi-step booking wizard
    ├── booking.html            # Simple single-page booking
    ├── payment.html            # Standalone payment processing
    ├── confirmation.html       # Booking confirmation
    └── profile.html            # Customer dashboard
```

## Completed Features

### ✅ Core Components
- **Responsive CSS Framework** - Green theme with HSL(87, 100%)
- **Reusable UI Components** - Cards, forms, modals, badges, tables, pagination, loaders, toasts
- **JavaScript Utilities** - Form validation, date handling, currency formatting, API requests
- **Booking Engine** - Price calculator, payment validation, Luhn algorithm, promo codes

### ✅ Common Includes
- **header.php** - Responsive navbar with transparent/solid variants, mobile hamburger menu
- **footer.php** - Footer with social links, navigation, copyright

### ✅ Public Pages (8/8 Complete)

#### 1. login.html
- Tab switching (Login/Register)
- Password strength indicator
- Password visibility toggle
- Social login (Google, Facebook)
- Forgot password modal
- Complete form validation

#### 2. rooms.html
- Hero section with full-screen background
- Filter modal (location, dates, guests, price range)
- Amenity filter pills
- Responsive 3-column room cards grid
- Pagination
- Mock data integration

#### 3. room-detail.html
- Breadcrumb navigation
- Image gallery with lightbox
- Room information and specs
- Sticky booking card with price calculator
- Amenities grid
- Policies section
- Responsive design with mobile sticky footer

#### 4. booking-flow.html
- 4-step progress indicator
- Step 1: Room confirmation
- Step 2: Guest information form
- Step 3: Payment details with card validation
- Step 4: Review and confirm
- Sticky booking summary
- Session storage for form persistence

#### 5. booking.html
- Single-page booking alternative
- All-in-one form (room, guest, payment)
- Payment method selector (card/PayPal/hotel)
- Terms and policies
- Responsive design

#### 6. payment.html
- Standalone payment processing
- Payment method selection (Credit Card, PayPal, Apple Pay)
- Card number formatting and Luhn validation
- Card brand detection (Visa, Mastercard, Amex, Discover)
- Expiry date and CVV validation
- Billing address form
- Order summary with promo code
- Security badges

#### 7. confirmation.html
- Success section with animated checkmark
- Booking details display
- Copy confirmation number
- Download PDF receipt (jsPDF)
- Add to calendar (.ics file)
- Print confirmation
- What's Next timeline
- Hotel information with directions

#### 8. profile.html
- Customer dashboard with 5 views
- **Dashboard**: Stats cards, upcoming/past bookings
- **My Bookings**: Filter tabs, booking cards, pagination
- **Personal Info**: Profile photo upload, editable form, address, preferences
- **Payment Methods**: Saved cards list, add/remove cards
- **Security**: Change password, 2FA toggle, active sessions, delete account
- View switching with URL parameters
- Complete modal system

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript ES6+** - Modern vanilla JS, no frameworks
- **PHP** - Server-side includes for common layouts
- **Font Awesome 6.4.0** - Icon library
- **jsPDF 2.5.1** - PDF generation for receipts

## Key Features

### Form Validation
- Real-time validation
- Email format checking
- Phone number validation
- Password strength meter
- Luhn algorithm for credit cards
- Custom error messages

### Booking System
- Date range picker
- Dynamic price calculation
- Service fees and taxes
- Promo code support
- Session storage persistence
- Multi-step wizard

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 480px, 768px, 1024px, 1280px
- Touch-friendly interfaces
- Adaptive layouts

### Animations
- Scroll-based animations
- Fade transitions
- Hover effects
- Loading states
- Toast notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Integration Points

The frontend is ready for backend integration with the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/verify-email` - Verify email address

### Rooms
- `GET /api/rooms` - List rooms with filters
- `GET /api/rooms/{id}` - Get room details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/{id}` - Get booking details
- `POST /api/bookings/{id}/cancel` - Cancel booking

### Payments
- `POST /api/payments` - Process payment
- `POST /api/promo/validate` - Validate promo code

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/profile/photo` - Upload profile photo
- `DELETE /api/profile` - Delete account
- `GET /api/payment-methods` - Get saved cards
- `POST /api/payment-methods` - Add payment method
- `POST /api/payment-methods/{id}/set-default` - Set default card
- `DELETE /api/payment-methods/{id}` - Remove payment method

## Development Setup

1. Clone the repository
2. Place files in web server document root
3. Ensure PHP is installed (for includes)
4. Access via `http://localhost/hotel-booking-frontend`

## Implementation Status

✅ **Project Complete** - All 8 public pages implemented according to specifications in planning.md
- Infrastructure: CSS framework, JavaScript utilities, PHP includes
- Public Pages: Login, Rooms, Room Detail, Booking Flow, Booking, Payment, Confirmation, Profile
- Features: Form validation, booking engine, payment processing, user dashboard
- Ready for backend integration

## Design System

### Colors
- Primary: `hsl(87, 100%, 50%)` - `#06D818`
- Variants: `--5`, `--10`, `--20`, `--36`, `--50`, `--65`, `--81`, `--95`, `--97`
- Dark greens: `--dark-green-1` to `--dark-green-4`

### Typography
- Font: 'Mona Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif
- Headings: 56px, 48px, 24px
- Body: 16px

### Layout
- Max-width: 1440px
- Container: 96% width, centered
- Border radius: 10px-40px
- Shadows: light, medium, heavy

## Backend Integration Notes

1. **Authentication**: Uses JWT tokens stored in localStorage
2. **Session Management**: Form data persisted in sessionStorage during booking flow
3. **Payment Security**: Uses Stripe.js for tokenization (never sends full card numbers)
4. **API Requests**: All API calls use `LuxeStay.apiRequest()` utility with automatic token handling

## File Paths

All absolute paths assume the site is served from root:
- Stylesheets: `/assets/css/`
- Scripts: `/assets/js/`
- Images: `/assets/images/`
- Public pages: `/public/`

## Contributing

This project follows the specifications in `planning.md`. All implementations should adhere to:
- Existing design patterns
- Component structure in `components.css`
- Utility functions in `main.js` and `booking.js`
- Responsive breakpoints
- Color scheme and typography

## License

© 2025 LuxeStay. All rights reserved.

## Contact

For questions or support:
- Email: support@luxestay.com
- Phone: +1 (800) 555-0199
