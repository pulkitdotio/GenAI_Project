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
          <h2>Welcome back</h2>
          <p>Sign in to continue your interview preparation.</p>
        </div>
      </div>

      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
