import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:3001/api/admin-view');
      const result = await res.json();
      setData(result.users || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow rounded p-4">
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-red-100">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Token</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{entry.email}</td>
                <td className="border px-4 py-2 font-mono">{entry.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
