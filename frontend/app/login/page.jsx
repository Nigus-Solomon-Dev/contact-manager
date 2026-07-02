'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/axios';

export default function Login(){
  const router =useRouter();
   const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
    const response=await api.post('/auth/login', formData);
    const {token,user}=response.data;
         

    // Save token and user to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
     
      console.log('Login successful:', user);
     
      router.push('/dashboard');
    
    }catch(err){
       setError(err.response?.data?.error || 'Login failed');
    }finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6"> Login</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : 'email'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder={field === 'email' ? 'john@example.com' : 'Enter your password'}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}