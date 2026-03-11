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
import { PrivateRoute, AdminRoute, OrganizationRoute, ResearcherRoute } from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import SustainabilityAnalytics from "../pages/SustainabilityAnalytics";
import Users from "../pages/Users";
import api from "../services/api";

const safeLoader = (endpoint) => async () => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (error) {
    console.error(`Loader error for ${endpoint}:`, error);
    return endpoint === '/issues/recent-issues' || endpoint === '/issues' ? [] : {};
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: safeLoader('/issues/recent-issues')
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
      {
        path: "/analytics",
        element: <ResearcherRoute><SustainabilityAnalytics /></ResearcherRoute>,
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
        loader: safeLoader('/issues')
      },
      {
        path: 'all-issues',
        element: <PrivateRoute><AllIssues /></PrivateRoute>,
        loader: safeLoader('/issues')
      },
      {
        path: '/add-issue',
        element: <OrganizationRoute><AddIssues /></OrganizationRoute>,
      },
      {
        path: '/issue-details/:id',
        element: <PrivateRoute><IssueDetails /></PrivateRoute>,
      },
      {
        path: '/my-issues',
        element: <PrivateRoute><MyIssues /></PrivateRoute>,
        loader: () => null 
      },
      {
        path: '/my-contribution',
        element: <PrivateRoute><MyContribution /></PrivateRoute>,
      },
      {
        path: '/users',
        element: <AdminRoute><Users /></AdminRoute>,
      }
    ]
  }
]);
