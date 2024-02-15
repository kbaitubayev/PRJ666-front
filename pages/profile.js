import React, { useState, useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap'
import api from '../services/api';
import {toast} from 'react-toastify';

const Profile = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [customer, setCustomer] = useState({
        user: {
            email: '',
            password: ''
        },
        name: '',
        phone: '',
        address: ''
    });
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Set form values with customer data whenever the customer object changes
    useEffect(() => {
        setValue('name', customer.name);
        setValue('phone', customer.phone);
        setValue('address', customer.address);
    }, [customer]);
    //Get user data from local storage
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
    }, []);

    // Fetch customer profile data from the server
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        api.get('/customers/profile', {
            headers: {
                'x-auth-token': token
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                // handle success
                setCustomer(response.data);
                localStorage.setItem('userName', response.data.name);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }, [user]);



    const onSubmit = (data) => {
        const token = localStorage.getItem('authToken');
        api.put('/customers/profile', data, {
            headers: {
                'x-auth-token': token
            }
        })
            .then(response => {
                // handle success
                console.log(response);
                toast.success('Profile updated successfully', {
                    autoClose:1000,
                    position: "bottom-center"
                });
                router.push('/');
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={customer.name}
                        {...register('name')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={customer.user.email} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control defaultValue={customer.phone}
                        {...register('phone')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={customer.address}
                        {...register('address')} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </>
    )
}

export default Profile