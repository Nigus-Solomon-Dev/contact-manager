'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import Login from '../login/page';
export default function Dashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await api.get('/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchContacts();
  }, [router, fetchContacts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      await api.post('/contacts', formData);
      setFormData({ name: '', email: '', phone: '', address: '' });
      setShowForm(false);
      fetchContacts();
    } catch (error) {
      setFormError(error.response?.data?.error || 'Failed to add contact');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
        <div className="mb-10">
          <div className="text-2xl font-bold text-indigo-400">Contacts</div>
          <div className="text-slate-400 text-sm mt-1">Manager</div>
        </div>

        <div className="flex-1">
          <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Signed in as</div>
            <div className="font-semibold text-white truncate">{user?.name || 'User'}</div>
            <div className="text-slate-400 text-sm truncate">{user?.email || ''}</div>
          </div>

          <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-4">
            <div className="text-xs text-indigo-300 uppercase tracking-widest mb-1">Total Contacts</div>
            <div className="text-3xl font-bold text-indigo-400">{contacts.length}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto w-full bg-red-500/10 border border-red-500/30 text-red-400 py-2 px-4 rounded-xl hover:bg-red-500/20 transition text-sm"
        >
          Logout
        </button>
      </div>

      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Contacts</h1>
            <p className="text-slate-400 mt-1">Manage your personal contact list</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Contact'}
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">New Contact</h3>
            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                {formError}
              </div>
            )}
            <form onSubmit={handleAddContact}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'name', type: 'text', placeholder: 'John Doe', label: 'Full Name', required: true },
                  { name: 'email', type: 'email', placeholder: 'john@example.com', label: 'Email', required: true },
                  { name: 'phone', type: 'tel', placeholder: '123-456-7890', label: 'Phone', required: true },
                  { name: 'address', type: 'text', placeholder: '123 Main St', label: 'Address', required: false },
                ].map(({ name, type, placeholder, label, required }) => (
                  <div key={name}>
                    <label className="block text-slate-400 text-sm mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      required={required}
                      className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={formLoading}
                className="mt-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl transition font-medium"
              >
                {formLoading ? 'Saving...' : 'Save Contact'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-slate-400 text-center py-20">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No contacts yet</p>
            <p className="text-sm mt-1">Click &quot;Add Contact&quot; to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-indigo-600/20 text-indigo-400 font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-slate-600 hover:text-red-400 transition text-sm opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1">{contact.name}</h3>
                <p className="text-slate-400 text-sm">{contact.email}</p>
                <p className="text-slate-400 text-sm">{contact.phone}</p>
                {contact.address && (
                  <p className="text-slate-500 text-xs mt-1">{contact.address}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
