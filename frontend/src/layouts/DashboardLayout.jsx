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
    try {
      await logout();
    } finally {
      navigate('/login', {
        replace: true,
      });
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getNavClass = ({ isActive }) =>
    [
      'sidebar-link',
      isActive
        ? 'sidebar-link--active'
        : '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className="app-shell">

      {/* Mobile menu button */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() =>
          setSidebarOpen(
            (current) => !current
          )
        }
        aria-label={
          sidebarOpen
            ? 'Close navigation'
            : 'Open navigation'
        }
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? (
          <X size={21} />
        ) : (
          <Menu size={21} />
        )}
      </button>

      {/* Sidebar */}
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

        {/* Logo */}
        <div className="sidebar__header">
          <Logo />
        </div>

        {/* Navigation */}
        <nav
          className="sidebar__nav"
          aria-label="Main navigation"
        >
          <span className="sidebar__label">
            Workspace
          </span>

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={getNavClass}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/interviews/new"
            onClick={closeSidebar}
            className={getNavClass}
          >
            <FileText size={17} />
            <span>New Interview</span>
          </NavLink>

          <NavLink
            to="/interviews"
            onClick={closeSidebar}
            className={getNavClass}
          >
            <BarChart3 size={17} />
            <span>My Interviews</span>
          </NavLink>

          <span className="sidebar__label sidebar__label--spaced">
            Account
          </span>

          {/* Phase 3 */}
          <button
            type="button"
            className="sidebar-link sidebar-link--disabled"
            disabled
          >
            <User size={17} />
            <span>Profile</span>
          </button>

          {/* Phase 3 */}
          <button
            type="button"
            className="sidebar-link sidebar-link--disabled"
            disabled
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Logout */}
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

      {/* Main application area */}
      <main className="app-main">
        <Outlet />
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close navigation"
        />
      )}
    </div>
  );
}

export default DashboardLayout;