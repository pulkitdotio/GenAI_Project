import { BrainCircuit, FileSearch, Sparkles, Target, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { getAuthState } from '../features/auth/authRedirect';

import Logo from '../components/common/Logo';

function AuthLayout({ children, mode = 'login' }) {
  const isLogin = mode === 'login';
  const location = useLocation();

  return (
    <main className="auth-page">
      <section className="auth-hero" aria-label="PrepAI overview">
        <div className="auth-hero__content">
          <Link to="/" aria-label="PrepAI home"><Logo /></Link>
          <div className="auth-hero__copy">
            <div className="hero-kicker"><Sparkles size={15} />AI-powered interview preparation</div>
            <h1>Prepare smarter.<br />Get hired faster.</h1>
            <p>Turn your experience and a job description into a focused, practical interview plan.</p>
            <div className="hero-features">
              <div><span><BrainCircuit size={17} /></span>AI-powered analysis</div>
              <div><span><Target size={17} /></span>Role-specific questions</div>
              <div><span><Zap size={17} /></span>Skill gap identification</div>
              <div><span><FileSearch size={17} /></span>Tailored resume support</div>
            </div>
          </div>
          <p className="auth-hero__quote">“Better preparation. Brighter opportunities.”</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__top">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <Link to={isLogin ? '/register' : '/login'} state={getAuthState(location.state?.from)}>{isLogin ? 'Sign up' : 'Sign in'}</Link>
        </div>
        <Link to="/" className="auth-home-link">Back to PrepAI home</Link>
        <div className="auth-card">{children}</div>
      </section>
    </main>
  );
}

export default AuthLayout;
