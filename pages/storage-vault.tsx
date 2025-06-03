import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function StorageVault() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: user?.email || '',
    address: '',
    dob: '',
    social: '',
    pan: '',
    aadhaar: '',
  });
  const [token, setToken] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const {
      fullName,
      phone,
      email,
      address,
      dob,
      social,
      pan,
      aadhaar
    } = formData;

    if (!/^[a-zA-Z\s]+$/.test(fullName)) return "Full Name must contain only letters";
    if (!/^\d{10}$/.test(phone)) return "Phone number must be exactly 10 digits";
    if (!/^[a-zA-Z0-9@\/\-"'<>\s]+$/.test(address)) return "Home address contains invalid characters";
    if (social && !/^[a-zA-Z0-9]+$/.test(social)) return "Social Media Handle must be alphanumeric";
    if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(pan)) return "PAN must follow format: 5 uppercase letters, 4 digits, 1 uppercase letter";
    if (!/^\d{12}$/.test(aadhaar)) return "Aadhaar must be exactly 12 digits";

    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          data: formData
        })
      });

      const result = await res.json();
      if (result.token) {
        setToken(result.token);
        setSubmitted(true);
        setError('');
      } else {
        setError("Server Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Storage Vault</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-5">
        {[
          ['Full Name', 'fullName'],
          ['Phone Number', 'phone'],
          ['Email Address', 'email'],
          ['Home Address', 'address'],
          ['Date of Birth', 'dob', 'date'],
          ['Social Media Handles', 'social'],
          ['PAN Card Number', 'pan'],
          ['Aadhaar Card', 'aadhaar']
        ].map(([label, name, type = 'text']) => (
          <div key={name}>
            <label className="block text-gray-800 font-semibold">{label}{name !== 'social' ? ' *' : ' (optional)'}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={name !== 'social'}
            />
          </div>
        ))}

        {error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition duration-300 transform hover:scale-105"
        >
          Generate Token & Submit
        </button>
      </div>

      {submitted && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-green-100 border border-green-400 text-green-900 rounded-lg shadow">
          <p className="font-semibold">🎉 Your Access Token:</p>
          <pre className="break-words mt-2 bg-white p-3 rounded border border-gray-300 font-mono">{token}</pre>
          <p className="text-sm text-gray-600 mt-1">Copy and store this token safely to retrieve your data later.</p>
        </div>
      )}
    </div>
  );
}
