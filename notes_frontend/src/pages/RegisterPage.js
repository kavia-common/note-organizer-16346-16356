import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function RegisterPage() {
  /** User registration form that calls /auth/register then navigates to login. */
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await registerUser(form);
      // Optional: auto-login
      await login(form.username, form.password);
      nav('/app');
    } catch (e) {
      setErr('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginTop: 0 }}>Create your account</h2>
      <p className="section-title" style={{ marginTop: 4 }}>Sign up to start organizing</p>
      <form onSubmit={onSubmit}>
        <div className="form-field">
          <label>Username</label>
          <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        {err && <div className="badge" style={{ background: '#fee2e2', borderColor: '#fecaca', color: '#991b1b' }}>{err}</div>}
        <div className="actions" style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Create account</button>
          <Link className="btn ghost" to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
