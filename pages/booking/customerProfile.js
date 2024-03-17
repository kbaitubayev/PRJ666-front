import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';


const CustomerProfile = () => {

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Personal Info</h1>

            <Form>
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>Client name</Form.Label>
                        <Form.Control placeholder="Enter your first name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastAge">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your last name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter your last email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter your phone number" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} xs={7} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridProvince">
                        <Form.Label>Province</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit"> Next </Button>
            </Form>

        </>
    );
}

export default CustomerProfile;