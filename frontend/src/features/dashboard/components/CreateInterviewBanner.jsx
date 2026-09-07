import {
  ArrowRight,
  FileText,
  Sparkles,
} from 'lucide-react';

import { Link } from 'react-router';

function CreateInterviewBanner() {
  return (
    <section className="create-banner">
      <div className="create-banner__orb create-banner__orb--one" />
      <div className="create-banner__orb create-banner__orb--two" />

      <div className="create-banner__content">
        <div className="create-banner__icon">
          <Sparkles size={21} />
        </div>

        <div>
          <span className="create-banner__eyebrow">
            AI-powered preparation
          </span>

          <h2>
            Turn your experience into
            your next opportunity
          </h2>

          <p>
            Upload your resume, add a job
            description, and let AI generate
            a personalized interview
            preparation report.
          </p>
        </div>
      </div>

      <Link
        to="/interviews/new"
        className="button button--light"
      >
        <FileText size={17} />
        Create New Interview
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}

export default CreateInterviewBanner;