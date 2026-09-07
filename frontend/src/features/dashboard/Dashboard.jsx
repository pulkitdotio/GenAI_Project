import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import WelcomeHeader from './components/WelcomeHeader';
import DashboardStats from './components/DashboardStats';
import RecentInterviews from './components/RecentInterviews';
import CreateInterviewBanner from './components/CreateInterviewBanner';

import PageLoader from '../../components/common/PageLoader';
import ErrorMessage from '../../components/common/ErrorMessage';

import { getInterviews } from './dashboard.api';

function Dashboard() {
  const [interviews, setInterviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const response =
          await getInterviews();

        if (mounted) {
          setInterviews(
            response.interviewReports || []
          );
        }
      } catch (error) {
        if (mounted) {
          setError(
            error?.response?.data?.message ||
              'Unable to load dashboard data.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="dashboard-page">
      <WelcomeHeader />

      <div className="dashboard-content">
        <section className="dashboard-intro">
          <div>
            <div className="dashboard-greeting">
              <span>Good to see you</span>
              <Sparkles size={16} />
            </div>

            <h1>
              Stay prepared.
              <br />
              <span>
                Great opportunities are ahead.
              </span>
            </h1>
          </div>

          <p className="dashboard-motivation">
            “Preparation today.
            <br />
            Confidence tomorrow.”
          </p>
        </section>

        {error && (
          <ErrorMessage message={error} />
        )}

        <CreateInterviewBanner />

        <DashboardStats
          interviews={interviews}
        />

        <RecentInterviews
          interviews={interviews}
        />
      </div>
    </div>
  );
}

export default Dashboard;