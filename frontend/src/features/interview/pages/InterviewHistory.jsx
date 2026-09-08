import {
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import {
  Link,
} from 'react-router';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import InterviewList from '../components/InterviewList';

import PageLoader from '../../../components/common/PageLoader';
import ErrorMessage from '../../../components/common/ErrorMessage';

import {
  getInterviewReports,
} from '../interview.api';

function InterviewHistory() {
  const [interviews, setInterviews] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let mounted = true;

    async function loadReports() {
      try {
        const response =
          await getInterviewReports();

        if (mounted) {
          setInterviews(
            response?.interviewReports ||
              []
          );
        }
      } catch (error) {
        if (mounted) {
          setError(
            error?.response?.data
              ?.message ||
              'Unable to load interview history.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredInterviews =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return interviews;
      }

      return interviews.filter(
        (interview) =>
          interview?.title
            ?.toLowerCase()
            .includes(query)
      );
    }, [interviews, search]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="history-page">

      <header className="page-header">

        <div>
          <span className="page-eyebrow">
            Preparation history
          </span>

          <h1>
            My Interviews
          </h1>

          <p>
            View and manage all your
            interview preparation reports.
          </p>
        </div>

        <Link
          to="/interviews/new"
          className="button button--primary"
        >
          <Plus size={16} />
          New Interview
        </Link>

      </header>

      {error && (
        <ErrorMessage
          message={error}
        />
      )}

      <div className="history-toolbar">

        <div className="history-search">
          <Search size={16} />

          <input
            type="search"
            placeholder="Search interviews..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        <button
          type="button"
          className="history-filter"
        >
          <SlidersHorizontal
            size={15}
          />

          All Status
        </button>

      </div>

      <InterviewList
        interviews={
          filteredInterviews
        }
      />

    </div>
  );
}

export default InterviewHistory;