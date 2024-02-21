// middleware/authMiddleware.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import api from '../services/api';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/check'); // Replace with your check endpoint
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return {};
};

export default useAuth;
