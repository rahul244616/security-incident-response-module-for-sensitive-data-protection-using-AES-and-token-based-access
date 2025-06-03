import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <p className="text-center mt-10 text-blue-600">Loading...</p>;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <a
          href="/api/auth/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10">
        Welcome, {user.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => router.push('/storage-vault')}
          className="bg-white text-blue-600 border border-blue-500 px-8 py-4 rounded-xl font-medium shadow-md hover:bg-blue-100 transition duration-300 transform hover:scale-105"
        >
          Storage Vault
        </button>

        <button
          onClick={() => router.push('/access-vault')}
          className="bg-white text-purple-600 border border-purple-500 px-8 py-4 rounded-xl font-medium shadow-md hover:bg-purple-100 transition duration-300 transform hover:scale-105"
        >
          Access Vault
        </button>
        <button
          onClick={() => router.push('/admin-login')}
          className="bg-white text-red-600 border border-red-500 px-8 py-4 rounded-xl font-medium shadow-md hover:bg-red-100 transition duration-300 transform hover:scale-105"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}
