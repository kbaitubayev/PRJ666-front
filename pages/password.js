import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const newPassword = watch('newPassword', '');
  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
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
            <Form.Control type={showPassword ? "text" : "password"} {...register('newPassword', { required: true, minLength: 8 })} isInvalid={errors.newPassword} />
            {errors.newPassword && <Form.Control.Feedback type="invalid">This field is required and should be at least 8 characters long.</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register('confirmPassword', {
                required: true,
                minLength: 8,
                validate: value => value === newPassword || 'The passwords do not match'
              })}
              isInvalid={errors.confirmPassword}
            />
            {errors.confirmPassword && <Form.Control.Feedback type="invalid">{errors.confirmPassword.message} </Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Show password" onChange={handleCheckboxChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default Password;