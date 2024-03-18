import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 className='my-3'>Change Password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            {...register('currentPassword', { required: true })}
            isInvalid={errors.currentPassword}
          />
          {errors.currentPassword && <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            {...register('newPassword', { required: true, minLength: 8 })}
            isInvalid={errors.newPassword}
          />
          {errors.newPassword && <Form.Control.Feedback type="invalid">This field is required and should be at least 8 characters long.</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            {...register('confirmPassword', {
              required: true,
              minLength: 8,
              validate: value => value === watch('newPassword') || 'The passwords do not match'
            })}
            isInvalid={errors.confirmPassword}
          />
          {errors.confirmPassword && <Form.Control.Feedback type="invalid">{errors.confirmPassword.message}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Show password" onChange={handleCheckboxChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Password;
