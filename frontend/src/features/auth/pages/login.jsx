import { LockKeyhole } from 'lucide-react';

import AuthLayout from '../../../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <AuthLayout mode="login">
      <div className="auth-card__header">
        <div className="auth-card__icon">
          <LockKeyhole size={20} />
        </div>

        <div>
          <h2>Welcome Back</h2>
          <p>
            Sign in to continue your
            preparation journey.
          </p>
        </div>
      </div>

      <LoginForm />

      <div className="auth-divider">
        <span>or continue with</span>
      </div>

      <div className="social-buttons">
        <button
          type="button"
          className="social-button"
          disabled
        >
          <span className="google-mark">
            G
          </span>
          Continue with Google
        </button>

        <button
          type="button"
          className="social-button"
          disabled
        >
          <span className="github-mark">
            ◉
          </span>
          Continue with GitHub
        </button>
      </div>
    </AuthLayout>
  );
}

export default Login;