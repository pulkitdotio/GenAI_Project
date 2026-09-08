import InterviewCard from './InterviewCard';

function InterviewList({
  interviews = [],
}) {
  if (!interviews.length) {
    return (
      <div className="history-empty">
        <h3>
          No interview reports yet
        </h3>

        <p>
          Your generated interview reports
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {interviews.map(
        (interview) => (
          <InterviewCard
            key={interview._id}
            interview={interview}
          />
        )
      )}
    </div>
  );
}

export default InterviewList;