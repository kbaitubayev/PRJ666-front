import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const Payment = () => {
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Payment</h1>
            <Row>
                {/* Pricing Breakdown */}
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h4>Pricing Breakdown</h4>
                        </Card.Header>
                        <Card.Body>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Service:</h5>
                                <h5>Dog Grooming</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Subtotal:</h5>
                                <h5>$50</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Tax:</h5>
                                <h5>$5</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Total:</h5>
                                <h5>$55</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Appointment Details */}
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h4>Appointment Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Date:</h5>
                                <h5>2022-01-01</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Time:</h5>
                                <h5>10:00 AM</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I agree to the General Terms of Service" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Payment;