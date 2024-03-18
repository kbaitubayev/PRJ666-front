//pages/password.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const Password = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
  }, []);

 // Make a request to change the password
const onSubmit = async (data) => {
  try {
    // Fetch the user's email from local storage
    const userEmail = JSON.parse(localStorage.getItem('userLoggedIn')).email;

    // Include the user's email in the request data
    const requestData = {
      ...data,
      email: userEmail,
    };

    // Make a POST request to the change password endpoint
    const response = await api.post('/password', requestData);

    // Assuming the response includes a success message
    console.log('Password change successful:', response.data.message);
  } catch (error) {
    // Handle error
    console.error('Password change failed:', error);
  }
};

  return (
    <>
      <h1 className='my-3'>Change Password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formGridNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" {...register('newPassword', { required: true, minLength: 8 })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" {...register('confirmPassword', { required: true, minLength: 8 })} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </Button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </Form>
    </>
  );
}

export default Password;
