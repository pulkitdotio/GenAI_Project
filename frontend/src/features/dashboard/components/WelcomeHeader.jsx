import {
  Bell,
  ChevronDown,
  Search,
  Sparkles,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';

function WelcomeHeader() {
  const { user } = useAuth();

  const displayName =
    user?.username || 'there';

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-search">
        <Search size={17} />

        <input
          type="search"
          placeholder="Search interviews..."
        />
      </div>

      <div className="dashboard-topbar__actions">
        <button
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="notification-dot" />
        </button>

        <div className="user-menu">
          <div className="user-avatar">
            {displayName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-menu__info">
            <strong>{displayName}</strong>
            <span>Candidate</span>
          </div>

          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

export default WelcomeHeader;