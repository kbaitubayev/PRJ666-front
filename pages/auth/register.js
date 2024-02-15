// pages/auth/register.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Login.module.css';
import { toast } from 'react-toastify';


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
      toast.success('Registration successful',
        {
          position: 'bottom-center',
          autoClose: 500,
        });
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
    <div className={styles['login-container']}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
      </Head>
      <h1 style={{ fontFamily: 'Permanent Marker, cursive', fontWeight: 'bold', fontSize: '4em', textAlign: "center", margin: "20px 0" }}>
        REGISTER
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" className={styles['form-control']}
            {...register('email', { required: 'Email is required' })} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" className={styles['form-control']}
            {...register('password', { required: 'Password is required' })} />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Control type="password" placeholder="Confirmed Password" className={styles['form-control']}
            {...register('password', { required: 'Password is required' })} />
        </Form.Group>

        <div className={styles['button-container']}>
          <Button variant="primary" type="submit" className={styles['button']} disabled={isLoading}>
            SIGN UP
          </Button>
        </div>
        {errors.apiError && <p>{errors.apiError.message}</p>}
        {/* Display registration error, if any */}
      </Form>
    </div>
  );
};

export default Register;
