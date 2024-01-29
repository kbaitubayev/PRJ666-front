// pages/auth/login.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';
import UserDisplay from '../../components/UserDisplay';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      setUserEmail(user.email);

      router.push('/services');
    } catch (error) {
      setError('apiError', {
        type: 'manual',
        message: 'Login failed. Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem('authToken');
    setUserEmail(null);
    // Redirect to the login page or any other desired location after logout
    router.push('/login');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields go here, e.g., email, password, etc. */}
        <input {...register('email', { required: 'Email is required' })} />
        <input type="password" {...register('password', { required: 'Password is required' })} />

        <button type="submit" disabled={isLoading}>Login</button>

        {/* Display login error, if any */}
        {errors.apiError && <p>{errors.apiError.message}</p>}

        {/* Display user email if available */}
        <UserDisplay userEmail={userEmail} />

        {/* Add Logout button */}
        {userEmail && <button onClick={handleLogout}>Logout</button>}
      </form>
    </div>
  );
};

export default Login;
