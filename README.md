# Mount Meru Soyco Website & Order System

## Project Overview
Mount Meru Soyco is a brand dedicated to providing pure, healthy, and sustainable cooking oils. This project is a modern web application designed to showcase Mount Meru Soyco's products, facilitate customer orders, and provide an efficient internal order management system.

The website offers a user-friendly interface for customers to browse products, place orders, and receive automated order confirmations via WhatsApp integration. The admin dashboard enables Mount Meru Soyco staff to manage orders, track delivery status, and analyze sales data.

## Features

### 1. Homepage
- Brand introduction with logo and navigation menu.
- Hero section with engaging banner and call-to-action buttons.
- Featured products section with images, descriptions, and order buttons.
- Footer with contact details and social media links.

### 2. Product Page
- Clean, organized product listing with filters:
  - Sort by price, best selling, etc.
  - Product categories.
  - Price range slider.
- Product cards showing name, price, description, size options, and quantity selector.
- "Add to Cart" and "Order Now" buttons.

### 3. Order Form Page
- Collects customer information (name, phone, email).
- Product selection with size and quantity options.
- Delivery information including address and region.
- Payment method selection (Cash on Delivery, Online Payment).
- Optional order notes.
- Simple, user-friendly layout.

### 4. Order Confirmation
- Displays thank you message after order submission.
- Sends automated WhatsApp confirmation via Twilio.
- Provides order tracking number.

### 5. Admin Dashboard
- View and manage all incoming orders.
- Filter orders by date, status, and region.
- Update delivery status (Pending, Shipped, Delivered).
- Sales analytics with charts for sales over time, best-selling products, and sales by region.
- Export order data in CSV or Excel formats.

### 6. WhatsApp Integration
- Receive orders via WhatsApp Business account.
- Automatically extract order details from messages.
- Real-time data sync to admin dashboard and Google Sheets.
- Automated order confirmation messages.

### 7. Data Collection & Tracking
- Store order data in Google Sheets or a database (Firebase, PostgreSQL).
- Automate data entry from WhatsApp using Python scripts or Twilio API.
- Track order status updates in the admin dashboard.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd meru
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

- Navigate through the homepage, products, and contact pages.
- Use the "Order Now" buttons to go to the order form.
- Fill in the order form and submit your order.
- Admins can access the dashboard to manage orders and view analytics.

## Technologies Used

- React with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Lucide React (icons)
- Twilio API (WhatsApp integration)
- Google Sheets / Firebase / PostgreSQL (data storage options)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Contact

For questions or support, please contact Mount Meru Soyco at:

- Email: support@mountmerusoyco.com
- Phone: +250 123 456 789
- WhatsApp: +250 123 456 789

---

Thank you for choosing Mount Meru Soyco — Pure, Healthy, and Sustainable Oils.
