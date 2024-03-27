import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { profileAtom } from '../../store';


const CustomerProfile = () => {
    const [profile, setProfile] = useAtom(profileAtom);
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push('/booking/petProfile');
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Personal Info</h1>

            <Form>

                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={profile.name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={profile.user && profile.user.email ? profile.user.email : ''} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control defaultValue={profile.phone} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={profile.address} />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={handleClick}> Next </Button>
            </Form>

        </>
    );
}

export default CustomerProfile;