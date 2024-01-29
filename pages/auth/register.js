// pages/auth/register.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';

const Register = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Make a POST request to your registration endpoint
      const response = await api.post('/auth/register', data); // Update the endpoint

      // Redirect to login page after successful registration
      router.push('/auth/login');
    } catch (error) {
      // Handle registration error
      setError('apiError', {
        type: 'manual',
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields go here, e.g., email, password, etc. */}
        <input {...register('email', { required: 'Email is required' })} />
        <input type="password" {...register('password', { required: 'Password is required' })} />

        <button type="submit" disabled={isLoading}>Register</button>

        {/* Display registration error, if any */}
        {errors.apiError && <p>{errors.apiError.message}</p>}
      </form>
    </div>
  );
};

export default Register;
