import {
  Download,
  RefreshCw,
} from 'lucide-react';

function ResumeActions({
  pdfUrl,
  loading,
  onGenerate,
}) {
  const handleDownload = () => {
    if (!pdfUrl) {
      return;
    }

    const link =
      document.createElement('a');

    link.href = pdfUrl;

    link.download =
      'PrepAI-Tailored-Resume.pdf';

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  };

  return (
    <div className="resume-actions">

      <button
        type="button"
        className="button button--secondary"
        onClick={onGenerate}
        disabled={loading}
      >
        <RefreshCw
          size={15}
          className={
            loading
              ? 'spin'
              : ''
          }
        />

        {loading
          ? 'Generating...'
          : 'Edit & Regenerate'}
      </button>

      <button
        type="button"
        className="button button--primary"
        onClick={handleDownload}
        disabled={
          loading || !pdfUrl
        }
      >
        <Download size={15} />
        Download PDF
      </button>

    </div>
  );
}

export default ResumeActions;