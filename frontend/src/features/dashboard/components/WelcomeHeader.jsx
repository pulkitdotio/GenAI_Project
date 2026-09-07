import {
  Bell,
  ChevronDown,
  Search,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';

function WelcomeHeader() {
  const { user } = useAuth();

  const displayName =
    user?.username ||
    user?.name ||
    'Candidate';

  const initial =
    displayName
      .charAt(0)
      .toUpperCase();

  return (
    <header className="dashboard-topbar">

      {/* Search */}
      <div className="dashboard-search">
        <Search size={17} />

        <input
          type="search"
          placeholder="Search interviews..."
          aria-label="Search interviews"
        />
      </div>

      {/* Right side */}
      <div className="dashboard-topbar__actions">

        {/* Notifications */}
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="notification-dot" />
        </button>

        {/* User */}
        <button
          type="button"
          className="user-menu"
          aria-label="Open user menu"
        >
          <div className="user-avatar">
            {initial}
          </div>

          <div className="user-menu__info">
            <strong>
              {displayName}
            </strong>

            <span>
              Candidate
            </span>
          </div>

          <ChevronDown size={15} />
        </button>

      </div>
    </header>
  );
}

export default WelcomeHeader;