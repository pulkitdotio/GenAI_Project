import {
  Navigate,
  createBrowserRouter,
} from 'react-router';

import App from './App';

import Login from './features/auth/pages/login';
import Register from './features/auth/pages/register';

import ProtectedRoute from './features/auth/components/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './features/dashboard/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },

      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <DashboardLayout />
            ),
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />,
              },

              /*
               * Phase 2 routes.
               *
               * We intentionally leave the
               * implementation for later.
               */
            ],
          },
        ],
      },

      {
        path: '*',
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },
    ],
  },
]);