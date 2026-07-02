'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';

export default function Dashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📱 Contact Manager</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name || 'User'}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Your Contacts</h2>

        {loading ? (
          <p className="text-gray-500">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 text-lg">📭 No contacts yet</p>
            <p className="text-gray-400">Add your first contact!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-lg font-bold">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
                {contact.address && (
                  <p className="text-gray-500 text-sm">{contact.address}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}