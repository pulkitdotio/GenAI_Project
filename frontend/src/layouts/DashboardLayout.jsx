import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from 'lucide-react';

import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router';

import { useState } from 'react';

import Logo from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';

function DashboardLayout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleLogout = async () => {
    await logout();

    navigate('/login', {
      replace: true,
    });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <button
        className="mobile-menu-button"
        onClick={() =>
          setSidebarOpen(
            (current) => !current
          )
        }
        aria-label="Toggle navigation"
      >
        {sidebarOpen ? (
          <X size={21} />
        ) : (
          <Menu size={21} />
        )}
      </button>

      <aside
        className={[
          'sidebar',
          sidebarOpen
            ? 'sidebar--open'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="sidebar__header">
          <Logo />
        </div>

        <nav className="sidebar__nav">
          <span className="sidebar__label">
            Workspace
          </span>

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive
                  ? 'sidebar-link--active'
                  : ''
              }`
            }
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/interviews/new"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive
                  ? 'sidebar-link--active'
                  : ''
              }`
            }
          >
            <FileText size={17} />
            <span>New Interview</span>
          </NavLink>

          <NavLink
            to="/interviews"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive
                  ? 'sidebar-link--active'
                  : ''
              }`
            }
          >
            <BarChart3 size={17} />
            <span>My Interviews</span>
          </NavLink>

          <span className="sidebar__label sidebar__label--spaced">
            Account
          </span>

          <button
            type="button"
            className="sidebar-link sidebar-link--disabled"
            disabled
          >
            <User size={17} />
            <span>Profile</span>
          </button>

          <button
            type="button"
            className="sidebar-link sidebar-link--disabled"
            disabled
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar__footer">
          <button
            type="button"
            className="sidebar-link logout-link"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <Outlet />
      </div>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close navigation"
        />
      )}
    </div>
  );
}

export default DashboardLayout;