import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { profileAtom, customerNoLoginAtom } from '../../store';



const CustomerProfile = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [profile, setProfile] = useAtom(profileAtom);
    const [user, setUser] = useState(); // Get the logged-in user
    const [customer, setCustomer] = useAtom(customerNoLoginAtom);

    const onSubmit = (data) => {
        if (!user) {
            setCustomer(data);
            router.push('/booking/petProfile');
        } else {
            router.push('/booking/petProfile');
        }

    }

    useEffect(() => {
        // Fetch user data from local storage
        setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Personal Info</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={profile.name} {...register('name')} required={!user}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' defaultValue={profile.user && profile.user.email ? profile.user.email : ''} readOnly={!!user} {...register('email')} required={!user}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control defaultValue={profile.phone} {...register('phone')} required={!user} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={profile.address} {...register('address')} required={!user}/>
                </Form.Group>


                <Button variant="primary" type="submit"> Next </Button>
            </Form>

        </>
    );
}

export default CustomerProfile;