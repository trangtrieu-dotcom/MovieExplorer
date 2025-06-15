import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login: updateAuthContext } = useAuth();

  // If already logged in, go to home
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await authService.accountLogin(credentials.username, credentials.password);
      await updateAuthContext();
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="hero-content flex-col">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="card-title text-3xl font-bold justify-center mb-2">MovieExplorer</h1>
              <p className="text-base-content/70">Sign in with your TMDB account</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="TMDB Username"
                  className="input input-bordered w-full"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  disabled={loading}
                />
              </div>
              
              <div className="form-control">
                <input
                  type="password"
                  placeholder="TMDB Password"
                  className="input input-bordered w-full"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {!loading && 'Sign In'}
              </button>
            </form>

            {/* Continue without signing in */}
            <div className="divider">OR</div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Continue without signing in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 