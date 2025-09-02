import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Simple login form using AuthContext.login */
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(username, password);
      nav('/app');
    } catch (e) {
      setErr('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginTop: 0 }}>Welcome back</h2>
      <p className="section-title" style={{ marginTop: 4 }}>Login to your account</p>
      <form onSubmit={onSubmit}>
        <div className="form-field">
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {err && <div className="badge" style={{ background: '#fee2e2', borderColor: '#fecaca', color: '#991b1b' }}>{err}</div>}
        <div className="actions" style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Login</button>
          <Link className="btn ghost" to="/register">Create account</Link>
        </div>
      </form>
    </div>
  );
}
