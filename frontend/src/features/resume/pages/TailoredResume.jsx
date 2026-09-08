import {
  ArrowLeft,
  FileText,
  Sparkles,
} from 'lucide-react';

import {
  Link,
  useParams,
} from 'react-router';

import {
  useEffect,
  useState,
} from 'react';

import ResumePreview from '../components/ResumePreview';
import ResumeActions from '../components/ResumeActions';

import {
  getInterviewReport,
} from '../../interview/interview.api';

import {
  generateResumePDF,
} from '../resume.api';

import ErrorMessage from '../../../components/common/ErrorMessage';
import PageLoader from '../../../components/common/PageLoader';

function TailoredResume() {
  const {
    interviewId,
  } = useParams();

  const [report, setReport] =
    useState(null);

  const [pdfUrl, setPdfUrl] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [generating, setGenerating] =
    useState(false);

  const [error, setError] =
    useState('');

  const generate = async () => {
    if (!interviewId) {
      return;
    }

    try {
      setGenerating(true);
      setError('');

      const pdfBlob =
        await generateResumePDF(
          interviewId
        );

      const nextUrl =
        URL.createObjectURL(
          pdfBlob
        );

      setPdfUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(
            oldUrl
          );
        }

        return nextUrl;
      });
    } catch (error) {
      setError(
        error?.response?.data
          ?.message ||
          'Unable to generate the tailored resume.'
      );
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadReport() {
      try {
        const response =
          await getInterviewReport(
            interviewId
          );

        if (mounted) {
          setReport(
            response?.interviewReport
          );
        }
      } catch (error) {
        if (mounted) {
          setError(
            error?.response?.data
              ?.message ||
              'Unable to load interview report.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReport();

    return () => {
      mounted = false;
    };
  }, [interviewId]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(
          pdfUrl
        );
      }
    };
  }, [pdfUrl]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="resume-page">

      <header className="resume-page__header">

        <Link
          to={`/interviews/report/${interviewId}`}
          className="back-link"
        >
          <ArrowLeft size={15} />
          Back to Report
        </Link>

        <div className="resume-title">

          <div className="resume-title__icon">
            <FileText size={20} />
          </div>

          <div>
            <span className="page-eyebrow">
              AI Resume Builder
            </span>

            <h1>
              Tailored Resume
            </h1>

            <p>
              A resume optimized for{' '}
              <strong>
                {report?.title ||
                  'your target role'}
              </strong>
              .
            </p>
          </div>

        </div>

      </header>

      {error && (
        <div className="resume-error">
          <ErrorMessage
            message={error}
          />
        </div>
      )}

      <section className="resume-layout">

        <div className="resume-info-panel">

          <div className="resume-info-card">

            <div className="resume-info-card__icon">
              <Sparkles size={19} />
            </div>

            <h2>
              Make your resume
              job-ready
            </h2>

            <p>
              PrepAI uses your original
              resume, self-description, and
              target job description to create
              an ATS-friendly tailored resume.
            </p>

            <ul>
              <li>
                <span>✓</span>
                No invented experience
              </li>

              <li>
                <span>✓</span>
                Tailored to the target role
              </li>

              <li>
                <span>✓</span>
                ATS-friendly formatting
              </li>
            </ul>

          </div>

          <ResumeActions
            pdfUrl={pdfUrl}
            loading={generating}
            onGenerate={generate}
          />

        </div>

        <div className="resume-preview-wrapper">

          <ResumePreview
            pdfUrl={pdfUrl}
            loading={generating}
          />

          {!pdfUrl &&
            !generating && (
              <button
                type="button"
                className="button button--primary resume-generate-button"
                onClick={generate}
              >
                <Sparkles size={16} />
                Generate Tailored Resume
              </button>
            )}

        </div>

      </section>
    </div>
  );
}

export default TailoredResume;