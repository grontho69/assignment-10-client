import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllIssues from "../pages/AllIssues";
import AddIssues from "../pages/AddIssues";
import IssueDetails from "../pages/IssueDetails";
import MyIssues from "../pages/MyIssues";
import MyContribution from "../pages/MyContribution";
import PrivateRouts from "../private/PrivateRouts";
import AdminRoute from "../private/AdminRoute";
import Dashboard from "../pages/Dashboard";
import SustainabilityAnalytics from "../pages/SustainabilityAnalytics";
import Users from "../pages/Users";

const API_URL = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch(`${API_URL}/issues/recent-issues`)
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouts>
            <Dashboard />
          </PrivateRouts>
        ),
      },
      {
        path: "/analytics",
        element: (
          <PrivateRouts>
            <SustainabilityAnalytics />
          </PrivateRouts>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/issues',
        element: <AllIssues />,
        loader: () => fetch(`${API_URL}/issues`)
      },
      {
        path: 'all-issues',
        element: (
          <PrivateRouts>
            <AllIssues />
          </PrivateRouts>
        ),
        loader: () => fetch(`${API_URL}/issues`)
      },
      {
        path: '/add-issue',
        element: (
          <PrivateRouts>
            <AddIssues />
          </PrivateRouts>
        ),
      },
      {
        path: '/issue-details/:id',
        element: (
          <PrivateRouts>
            <IssueDetails />
          </PrivateRouts>
        ),
      },
      {
        path: '/my-issues',
        element: (
          <PrivateRouts>
            <MyIssues />
          </PrivateRouts>
        ),
        loader: () => fetch(`${API_URL}/issues`)
      },
      {
        path: '/my-contribution',
        element: (
          <PrivateRouts>
            <MyContribution />
          </PrivateRouts>
        ),
      },
      {
        path: '/users',
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      }
    ]
  }
]);
