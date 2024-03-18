// dogprofile.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

const DogProfile = () => {
    const { register, handleSubmit } = useForm();
    const [dogProfile, setDogProfile] = useState({
        name: '',
        breed: '',
        age: '',
        weight: '',
        aggressionStatus: '',
        lastVisitDate: ''
    });
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
    }, []);

    const fetchDogProfile = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.get('/dogprofile', {
                headers: {
                    'x-auth-token': token
                }
            });
            setDogProfile(response.data); // Update dogProfile state with fetched data
        } catch (error) {
            console.error('Error fetching dog profile:', error);
            toast.error('Failed to fetch dog profile');
        }
    };

    

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.put('/dog-profile/dogprofile', data, {
                headers: {
                    'x-auth-token': token
                }
            });
            console.log(response);
            toast.success('Dog profile updated successfully', {
                autoClose: 1000,
                position: "bottom-center"
            });
            router.push('/');
        } catch (error) {
            console.error('Error updating dog profile:', error);
            toast.error('Failed to update dog profile');
        }
    };

    return (
        <>
            <h1 className='my-3'>Dog Profile</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={dogProfile.name} {...register('name')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="breed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control defaultValue={dogProfile.breed} {...register('breed')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control defaultValue={dogProfile.age} {...register('age')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control defaultValue={dogProfile.weight} {...register('weight')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="aggressionStatus">
                    <Form.Label>Aggression Status</Form.Label>
                    <Form.Control defaultValue={dogProfile.aggressionStatus} {...register('aggressionStatus')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastVisitDate">
                    <Form.Label>Last Visit Date</Form.Label>
                    <Form.Control type="date" defaultValue={dogProfile.lastVisitDate} {...register('lastVisitDate')} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </>
    );
};

export default DogProfile;
