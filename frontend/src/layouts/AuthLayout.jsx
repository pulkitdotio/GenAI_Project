import {
  BrainCircuit,
  FileSearch,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

import Logo from '../components/common/Logo';

function AuthLayout({
  children,
  mode = 'login',
}) {
  const isLogin = mode === 'login';

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="auth-hero__glow auth-hero__glow--one" />
        <div className="auth-hero__glow auth-hero__glow--two" />

        <div className="auth-hero__content">
          <Logo />

          <div className="auth-hero__copy">
            <div className="hero-kicker">
              <Sparkles size={15} />
              AI-powered interview preparation
            </div>

            <h1>
              Prepare
              <br />
              <span>Smarter.</span>
              <br />
              Get Hired
              <br />
              <strong>Faster.</strong>
            </h1>

            <p>
              Personalized interview preparation
              powered by AI. Turn your experience
              into opportunities.
            </p>

            <div className="hero-features">
              <div>
                <span>
                  <BrainCircuit size={17} />
                </span>
                AI-powered analysis
              </div>

              <div>
                <span>
                  <Target size={17} />
                </span>
                Role-specific questions
              </div>

              <div>
                <span>
                  <Zap size={17} />
                </span>
                Skill gap identification
              </div>

              <div>
                <span>
                  <FileSearch size={17} />
                </span>
                Personalized study plan
              </div>
            </div>
          </div>

          <p className="auth-hero__quote">
            “Better preparation.
            <br />
            Brighter opportunities.”
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__top">
          <span>
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>

          <a
            href={
              isLogin
                ? '/register'
                : '/login'
            }
          >
            {isLogin
              ? 'Sign up'
              : 'Sign in'}
          </a>
        </div>

        <div className="auth-card">
          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;