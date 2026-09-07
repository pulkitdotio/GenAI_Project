import {
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
} from 'lucide-react';

import Badge from '../../../components/ui/Badge';

function formatDate(date) {
  if (!date) {
    return 'Recently';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  ).format(new Date(date));
}

function getCompanyInitials(title) {
  return (
    title
      ?.split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase() || 'AI'
  );
}

function RecentInterviews({
  interviews,
}) {
  const recent = interviews.slice(0, 5);

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            Your preparation activity
          </span>

          <h2>Recent Interviews</h2>
        </div>

        <button
          type="button"
          className="section-link"
        >
          View All
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="interview-list">
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">
              <FileText size={23} />
            </div>

            <h3>No interviews yet</h3>

            <p>
              Create your first interview
              preparation report to see it
              here.
            </p>
          </div>
        ) : (
          recent.map((interview) => (
            <div
              className="interview-row"
              key={interview._id}
            >
              <div className="company-avatar">
                {getCompanyInitials(
                  interview.title
                )}
              </div>

              <div className="interview-row__main">
                <strong>
                  {interview.title ||
                    'Interview Preparation'}
                </strong>

                <div className="interview-meta">
                  <span>
                    <Building2 size={13} />
                    AI Generated Report
                  </span>

                  <span>
                    <CalendarDays size={13} />
                    {formatDate(
                      interview.createdAt
                    )}
                  </span>
                </div>
              </div>

              <Badge variant="success">
                Completed
              </Badge>

              <div className="match-score">
                <strong>
                  {interview.matchScore ?? 0}%
                </strong>

                <span>Match Score</span>
              </div>

              <button
                type="button"
                className="row-arrow"
                aria-label="Open interview"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentInterviews;