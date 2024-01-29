// pages/auth/login.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Make a POST request to your login endpoint
      const response = await api.post('/login', data);

      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      // Handle login error
      setError('apiError', {
        type: 'manual',
        message: 'Login failed. Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields go here, e.g., username, password, etc. */}
        <input {...register('username', { required: 'Username is required' })} />
        <input type="password" {...register('password', { required: 'Password is required' })} />

        <button type="submit" disabled={isLoading}>Login</button>

        {/* Display login error, if any */}
        {errors.apiError && <p>{errors.apiError.message}</p>}
      </form>
    </div>
  );
};

export default Login;
