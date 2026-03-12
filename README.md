# 🌿 EcoReport Frontend: Community Engagement Portal

This is the client-side repository for **EcoReport**, a modern environmental issue tracking and community engagement platform.

[**Launch Live Site**](https://eco-report-mmg.netlify.app)

## 🚀 Key Features

*   **Premium Interactive UI**: A stunning, modern interface built with the latest design principles, featuring glassmorphism, dark mode, and smooth Framer Motion animations.
*   **Secure Authentication**: Seamless login and registration flows via Firebase, supporting both traditional Email/Password and Google Social Auth.
*   **Dynamic Role-Based Access**: The UI adapts in real-time based on your database role (Admin vs. User), hiding or showing management tools accordingly.
*   **Incident Reporting & Tracking**: Interactive forms for reporting local environmental concerns with real-time status updates through an integrated notification hub.
*   **Real-Time Notifications**: Integrated Socket.IO client that provides instant feedback without page refreshes when administrators act on your reports.
*   **Advanced Data Visualization**: Beautifully rendered charts and analytics Hub for monitoring community impact and environmental trends.

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: React Context API
- **Routing**: React Router 7
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Notifications**: React-Toastify

## 📦 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` in the root:
    ```env
    VITE_apiKey=your_key
    VITE_authDomain=your_domain
    VITE_projectId=your_project
    VITE_storageBucket=your_bucket
    VITE_messagingSenderId=your_id
    VITE_appId=your_app_id
    VITE_API_URL=http://localhost:3000
    ```

3.  **Run Locally**:
    ```bash
    npm run dev
    ```

## 🛠 Implementation Details

- **Modular Architecture**: Feature-based separation for Dashboard, Analytics, and Auth.
- **Form Handling**: Structured form processing for issue reporting and profile settings.
- **Interceptors**: Axios request interceptors to automatically attach Firebase ID tokens to every request.
- **Accessibility**: Screen-reader friendly semantic HTML and full keyboard navigation support.

---
**EcoReport: Cleaning our communities, one report at a time.**