'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata.full_name || 'User');
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to the Dashboard, {userName}</h1>
        <p className="mt-4 text-gray-600">This is your dashboard page.</p>
      </div>
    </div>
  );
} 