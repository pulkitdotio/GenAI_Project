import {
  useEffect,
  useState,
} from 'react';

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

  const [error, setError] =
    useState('');

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setError('');

        const response =
          await getInterviews();

        if (!mounted) {
          return;
        }

        setInterviews(
          response?.interviewReports || []
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        setError(
          error?.response?.data?.message ||
            'Unable to load dashboard data.'
        );
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

      {/* Top navigation */}
      <WelcomeHeader />

      <div className="dashboard-content">

        {/* Introduction */}
        <section className="dashboard-intro">

          <div>
            <div className="dashboard-greeting">
              <span>
                Your AI interview assistant
              </span>

              <Sparkles size={15} />
            </div>

            <h1>
              Prepare smarter.
              <br />

              <span>
                Get hired faster.
              </span>
            </h1>
          </div>

          <p className="dashboard-motivation">
            “Preparation today.
            <br />
            Confidence tomorrow.”
          </p>

        </section>

        {/* API error */}
        {error && (
          <ErrorMessage
            message={error}
          />
        )}

        {/* Create interview */}
        <CreateInterviewBanner />

        {/* Statistics */}
        <DashboardStats
          interviews={interviews}
        />

        {/* Recent interviews */}
        <RecentInterviews
          interviews={interviews}
        />

      </div>
    </div>
  );
}

export default Dashboard;