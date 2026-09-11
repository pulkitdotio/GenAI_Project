import { Link } from 'react-router';
import PublicHeader from '../components/PublicHeader';

function NotFound() {
  return <div className="public-page"><PublicHeader /><main className="public-container not-found"><p className="home-eyebrow">404 · Page not found</p><h1>Let’s get you back on track.</h1><p>This page doesn’t exist or may have moved.</p><Link to="/" className="button button--primary button--large">Back to PrepAI home</Link></main></div>;
}

export default NotFound;
