# 🏢 AssetVerse | Corporate Asset Management System

**AssetVerse** is a robust B2B digital platform designed to help companies efficiently manage physical assets (laptops, keyboards, chairs, etc.) and track equipment assignments. It bridges the gap between HR Managers and Employees with a seamless, role-based workflow.

---

## 🌐 Live URL
[Live Site Link](https://asset-verse-clients.netlify.app)

---

## 🔐 Test Credentials

To explore the platform's functionalities, you can use the following test accounts:

### **HR Manager Panel (Admin)**
- **Email:** `Hr@assetverse.com`
- **Password:** `Hr@assetverse.com`

### **Employee Panel**
- **Email:** `em@asssetverse.com`
- **Password:** `emp12345678`

---

## 🚀 Recent Updates & Enhancements

### ✨ Optimized User Experience
- **Skeleton Loaders:** Integrated custom Skeleton Loaders across the Home Page and Dashboard to ensure a smooth perceived loading experience during data fetching.
- **Home Page Interactivity:** Fully optimized landing page with a modern hero section, package cards, and testimonial sliders.
- **Improved Data Fetching:** Optimized TanStack Query (React Query) implementations to handle background synchronization and cache management.

### 🛡️ Enhanced Security & Routing
- **Role-Based Protected Routes:** Implemented high-level route protection where users are automatically redirected based on their `HR` or `Employee` status.
- **JWT Authentication:** Secure API communication with private route access, preventing unauthorized data manipulation.
- **Authentication Persistence:** Reliable session management using Firebase and custom `useAuth` hooks.

---

## 🛠️ Core Features

* **Dual-Role Dashboard:** Distinct, personalized interfaces for HR Managers and Employees.
* **Asset Inventory Management:** HR can manage (Add/Edit/Delete) assets, distinguishing between **Returnable** and **Non-returnable** items.
* **Real-time Request System:** Employees can request equipment; HR can Approve or Reject requests with a single click.
* **Automatic Affiliation:** Seamlessly connects employees to their respective companies upon the first approved request.
* **Payment Integration:** Stripe-powered subscription model for HR Managers to increase employee capacity limits.
* **Responsive Sidebar:** Improved sidebar with adaptive font sizes and compact spacing for better usability on mobile and desktop.

---

## 💻 Technology Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS & DaisyUI
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form
- **Animations:** Framer Motion

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Security:** JWT (JSON Web Token) & Role-based Middleware
- **Payments:** Stripe API

---

## 📦 Key NPM Packages
- `firebase`: Authentication and hosting.
- `axios`: Secure API requests with interceptors for JWT.
- `react-to-print`: Generating PDF views for asset lists.
- `sweetalert2`: Interactive and beautiful user notifications.
- `dotenv`: Secure environment variable management.

---

## 🔮 Roadmap (Upcoming)
- **Data Visualization:** HR analytics using Recharts (Asset trends and distribution).
- **Company Notice Board:** System for HR to post official company-wide announcements.
- **Real-time Image Upload:** Enhanced profile management with instant image previews.

---

### ⚙️ Local Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up `.env` with Firebase, Stripe, and Backend keys.
4. Run the app: `npm run dev`