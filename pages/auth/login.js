// pages/auth/login.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';
import UserDisplay from '../../components/UserDisplay';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Make a POST request to your login endpoint
      const response = await api.post('/auth/login', data);

      // Assuming the response includes a token and user details
      const { token, user } = response.data;

      // Store the token in a secure manner (localStorage, sessionStorage)
      localStorage.setItem('authToken', token);
      localStorage.setItem('userLoggedIn', JSON.stringify(user));

      // Log a message for successful login
      console.log('Login successful:', user.email);

      // Redirect to home page after successful login
      window.location.href = '/';
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
    <div className={styles['login-container']}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1
        style={{
          fontFamily: 'Permanent Marker, cursive',
          fontWeight: 'bold',
          fontSize: '4em',
          textAlign: 'center',
          margin: '20px 0',
        }}
      >
        LOG IN
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            className={styles['form-control']}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            className={styles['form-control']}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </Form.Group>

        <div className={styles['button-container']}>
          <Button variant="primary" type="submit" className={styles['button']}>
            LOGIN
          </Button>
        </div>
        <p className={styles['signup-text']}>
          Not a member?{' '}
          <Link href="/auth/register" passHref legacyBehavior>
            <a>Sign up</a>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
