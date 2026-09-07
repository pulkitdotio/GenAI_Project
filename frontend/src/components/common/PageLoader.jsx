import Spinner from '../ui/Spinner';

function PageLoader() {
  return (
    <div className="page-loader">
      <Spinner size="large" />
      <p>Loading PrepAI...</p>
    </div>
  );
}

export default PageLoader;