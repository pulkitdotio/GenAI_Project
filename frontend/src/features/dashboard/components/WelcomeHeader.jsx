import { useAuth } from '../../../context/useAuth';

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

      <div className="dashboard-topbar__context">
        <span>Workspace</span>
        <strong>Interview preparation</strong>
      </div>

      {/* Right side */}
      <div className="dashboard-topbar__actions">

        <div className="user-menu" aria-label={`Signed in as ${displayName}`}>
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

        </div>

      </div>
    </header>
  );
}

export default WelcomeHeader;
