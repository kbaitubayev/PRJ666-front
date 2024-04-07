import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import dayjs from 'dayjs';
import { dateTimeAtom, serviceAtom, customerAtom, customerNoLoginAtom } from '@/store';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {
    const [dateTime] = useAtom(dateTimeAtom);
    const [selectedService] = useAtom(serviceAtom);
    const [customerId] = useAtom(customerAtom);
    const [customerNoLogin] = useAtom(customerNoLoginAtom);

    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (customerNoLogin && customerNoLogin.email !== '') {
                const response = await api.post('/appointment-no-loggin', {
                    date: dayjs(dateTime[0]).format('YYYY-MM-DD').toString(),
                    time: dateTime[1],
                    serviceType: selectedService._id,
                    customer: customerNoLogin,
                });;
            } else {
                const response = await api.post('/appointments', {
                    date: dayjs(dateTime[0]).format('YYYY-MM-DD').toString(),
                    time: dateTime[1],
                    serviceType: selectedService._id,
                    customer: customerId,
                });
            }

            toast.success('Appointment created successfully!');
            router.push("/")

        } catch (error) {
            console.error('Error creating appointment:', error);
            if (error.response.status === 400) {
                toast.error(<div>You already have an appointment at this time.<br />Please select another time.</div>);
            }
        }

    };

    const handleCashOut = async () => {
        const stripe = await loadStripe("pk_test_51P1h1i04ouqJ3TcDfYAkpxqIknUbpf5IXPZwJdQle6CRPf7Vif3pMe216hv0kxNj8UgnJocmNNKr6k7nuyIM2tmO00TzGIqGcm");

        const body = {
            amount: Math.round(selectedService.price * 1.13 * 100),
            currency: 'cad',
            productName: selectedService.title,
        };


        try {
            const response = await api.post('/payments', body);
            const session = response.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error creating payment:', error);
        }

    }

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
                                <h5>{selectedService.title}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Subtotal:</h5>
                                <h5>${selectedService.price}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Tax:</h5>
                                <h5>${(selectedService.price * 0.13).toFixed(2)}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Total:</h5>
                                <h5>${(selectedService.price * 1.13).toFixed(2)}</h5>
                            </div>

                            <Button variant="primary" onClick={handleCashOut}>
                                Cash Out
                            </Button>
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
                                <h5>{dayjs(dateTime[0]).format('dddd, MMMM D YYYY')}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h5>Time:</h5>
                                <h5>{dateTime[1]}</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Form.Group controlId="formBasicCheckbox" className='my-3'>
                        <Form.Check type="checkbox" label="I agree to the General Terms of Service" onChange={e => setIsChecked(e.target.checked)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit} disabled={!isChecked}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Payment;