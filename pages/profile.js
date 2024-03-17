/* eslint-disable react/no-unescaped-entities */
// profile.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [customer, setCustomer] = useState({
        user: {
            email: '',
            password: ''
        },
        name: '',
        phone: '',
        address: '',
        dogs: [] // Array to hold dog profiles
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

    const handleAddDogProfile = async (dogData) => {
        try {
            const token = localStorage.getItem('authToken');
            const updatedCustomer = { ...customer };
            updatedCustomer.dogs.push(dogData);
            const response = await api.put('/customers/profile', updatedCustomer, {
                headers: {
                    'x-auth-token': token
                }
            });
            setCustomer(updatedCustomer);
            console.log(response);
            toast.success('Dog profile added successfully', {
                autoClose: 1000,
                position: "bottom-center"
            });
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

            {/* Add Dog Profile Form */}
            <h2 className='mt-5'>Dog Information</h2>
            <Form onSubmit={handleAddDogProfile}>
                <Form.Group className="mb-3" controlId="formGridDogName">
                    <Form.Label>Dog's Name</Form.Label>
                    <Form.Control {...register('dogName')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridBreed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control {...register('breed')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" {...register('age')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="number" {...register('weight')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAggressionStatus">
                    <Form.Label>Aggression Status</Form.Label>
                    <Form.Control as="select" {...register('aggressionStatus')}>
                        <option value="friendly">Friendly</option>
                        <option value="aggressive">Aggressive</option>
                        <option value="neutral">Neutral</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridLastVisitDate">
                    <Form.Label>Last Visit Date</Form.Label>
                    <Form.Control type="date" {...register('lastVisitDate')} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Dog Profile
                </Button>
            </Form>

            {/* Display Dog Profiles */}
            <h2 className='mt-5'>Your Dog Profiles</h2>
            {customer.dogs && customer.dogs.map((dog, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{dog.name}</Card.Title>
                        <Card.Text>
                            Breed: {dog.breed}<br />
                            Age: {dog.age}<br />
                            Weight: {dog.weight}<br />
                            Aggression Status: {dog.aggressionStatus}<br />
                            Last Visit Date: {dog.lastVisitDate}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default Profile;
