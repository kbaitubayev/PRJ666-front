/* eslint-disable react/no-unescaped-entities */
// profile.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
    const { register, handleSubmit } = useForm();
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

    useEffect(() => {
        // Fetch user data from local storage
        setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
    }, []);

    useEffect(() => {
        // Fetch customer profile data from the server
        const fetchCustomerProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await api.get('/customers/profile', {
                    headers: {
                        'x-auth-token': token
                    },
                    body: JSON.stringify(user)
                });
                // Update customer state with fetched data
                setCustomer(response.data);
                localStorage.setItem('userName', response.data.name);
            } catch (error) {
                console.log(error);
            }
        };
        // Fetch customer profile when user state changes
        if (user) {
            fetchCustomerProfile();
        }
    }, [user]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.put('/customers/profile', data, {
                headers: {
                    'x-auth-token': token
                }
            });
            console.log(response);
            toast.success('Profile updated successfully', {
                autoClose: 1000,
                position: "bottom-center"
            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className='my-3'>Profile</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={customer.name} {...register('name')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={customer.user.email} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control defaultValue={customer.phone} {...register('phone')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={customer.address} {...register('address')} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </>
    );
}

export default Profile;
