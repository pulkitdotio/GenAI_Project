import {
  ArrowRight,
  FileText,
  Sparkles,
} from 'lucide-react';

import { Link } from 'react-router';

function CreateInterviewBanner() {
  return (
    <section className="create-banner">

      {/* Decorative elements */}
      <div
        className="
          create-banner__orb
          create-banner__orb--one
        "
      />

      <div
        className="
          create-banner__orb
          create-banner__orb--two
        "
      />

      {/* Content */}
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
            preparation report for you.
          </p>
        </div>

      </div>

      {/* CTA */}
      <Link
        to="/interviews/new"
        className="button button--light"
      >
        <FileText size={17} />

        <span>
          Create New Interview
        </span>

        <ArrowRight size={16} />
      </Link>

    </section>
  );
}

export default CreateInterviewBanner;