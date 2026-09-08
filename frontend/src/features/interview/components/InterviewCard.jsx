import {
  ArrowRight,
  CalendarDays,
} from 'lucide-react';

import { Link } from 'react-router';

import Badge from '../../../components/ui/Badge';

function formatDate(date) {
  if (!date) {
    return 'Recently';
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return 'Recently';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  ).format(parsed);
}

function InterviewCard({
  interview,
}) {
  const score =
    typeof interview?.matchScore ===
    'number'
      ? interview.matchScore
      : 0;

  return (
    <Link
      to={`/interviews/report/${interview._id}`}
      className="history-card"
    >
      <div className="history-card__avatar">
        {interview?.title
          ?.charAt(0)
          ?.toUpperCase() || 'I'}
      </div>

      <div className="history-card__main">
        <h3>
          {interview?.title ||
            'Interview Preparation'}
        </h3>

        <div className="history-card__meta">
          <span>
            <CalendarDays size={13} />
            {formatDate(
              interview?.createdAt
            )}
          </span>

          <Badge variant="success">
            Completed
          </Badge>
        </div>
      </div>

      <div className="history-card__score">
        <strong>
          {score}%
        </strong>

        <span>
          Match Score
        </span>
      </div>

      <div className="history-card__arrow">
        <ArrowRight size={17} />
      </div>
    </Link>
  );
}

export default InterviewCard;