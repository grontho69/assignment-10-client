# 🌿 EcoReport - Frontend (Client)

This is the React-based client application for the EcoReport platform.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   Create a `.env` file with `VITE_API_URL=http://localhost:3000`.
3. Start development server:
   ```bash
   npm run dev
   ```

## 🏗 Modular Architecture
The frontend is built using a feature-based structure to ensure scalability:
- `src/features/dashboard`: Real-time statistics and UI components.
- `src/features/analytics`: Sustainability charts using Recharts.
- `src/services`: Abstracted API communication using credentials-enabled fetch.

## 🎨 UI & UX
- **Responsive**: Mobile-first design using Tailwind CSS.
- **Dynamic**: Smooth animations via Framer Motion.
- **Interactive**: Real-time updates with Socket.IO.

For full project documentation, including backend setup and API details, please refer to the [Main Project README](../README.md).