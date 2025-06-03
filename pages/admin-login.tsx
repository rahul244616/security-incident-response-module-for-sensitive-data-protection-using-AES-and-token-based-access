import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'vault@123') {
      router.push('/admin-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-red-700">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
