import {
  CheckCircle2,
  FileText,
  Gauge,
  Trophy,
} from 'lucide-react';

function DashboardStats({
  interviews = [],
}) {
  const total = interviews.length;

  /*
   * Every record returned by GET /interview/
   * is an already-generated interview report.
   */
  const completed = interviews.length;

  const scores = interviews
    .map(
      (interview) =>
        interview?.matchScore
    )
    .filter(
      (score) =>
        typeof score === 'number' &&
        !Number.isNaN(score)
    );

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (sum, score) =>
              sum + score,
            0
          ) / scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

  const stats = [
    {
      label: 'Total Interviews',
      value: total,
      icon: FileText,
      tone: 'purple',
    },

    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      tone: 'green',
    },

    {
      label: 'Average Match Score',
      value: `${averageScore}%`,
      icon: Gauge,
      tone: 'blue',
    },

    {
      label: 'Best Match Score',
      value: `${bestScore}%`,
      icon: Trophy,
      tone: 'amber',
    },
  ];

  return (
    <section
      className="stats-grid"
      aria-label="Interview statistics"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            className="stat-card"
            key={stat.label}
          >
            <div
              className={[
                'stat-card__icon',
                `stat-card__icon--${stat.tone}`,
              ].join(' ')}
            >
              <Icon size={19} />
            </div>

            <div className="stat-card__content">
              <span>
                {stat.label}
              </span>

              <strong>
                {stat.value}
              </strong>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default DashboardStats;