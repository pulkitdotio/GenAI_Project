import { Navigate, createBrowserRouter } from 'react-router';

import App from './App';

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

import ProtectedRoute from './features/auth/components/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './features/dashboard/Dashboard';

import ComingSoon from './components/common/ComingSoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // -------------------------
      // Public routes
      // -------------------------

      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
      },

      // -------------------------
      // Protected application
      // -------------------------

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />,
              },

              {
                path: 'interviews/new',
                element: (
                  <ComingSoon
                    title="Create New Interview"
                  />
                ),
              },

              {
                path: 'interviews',
                element: (
                  <ComingSoon
                    title="My Interviews"
                  />
                ),
              },
            ],
          },
        ],
      },

      // -------------------------
      // Unknown routes
      // -------------------------

      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);