// RequireAdmin.jsx
// Client-side guard that verifies admin status (calls /api/admin/check).
// UX-level protection only: backend must still protect update endpoints.
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || '') === '1';

export default function RequireAdmin({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      setChecking(true);
      if (USE_MOCK) {
        const m = localStorage.getItem('mock_admin') === '1';
        if (mounted) { setIsAdmin(m); setChecking(false); }
        return;
      }
      try {
        const res = await fetch(`${API}/api/admin/check`, { method: 'GET', credentials: 'include' });
        const json = await res.json();
        if (mounted) setIsAdmin(Boolean(json.isAdmin));
      } catch {
        if (mounted) setIsAdmin(false);
      } finally {
        if (mounted) setChecking(false);
      }
    }
    check();
    return () => mounted = false;
  }, []);

  if (checking) return <div style={{padding:20}}>Checking admin status…</div>;
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}
