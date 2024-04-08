import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Modal } from 'react-bootstrap';
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
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderLabel = () => (
        <>
            By making a payment, you agree to our{' '}
            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={openModal}>
                General Terms of Service
            </span>
            .
        </>
    );

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
                        <Form.Check type="checkbox" label={renderLabel()} onChange={e => setIsChecked(e.target.checked)} />
                    </Form.Group>

                    <div className='text-center'>
                        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={!isChecked}>
                            Book Appointment
                        </Button>
                    </div>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>General Terms of Service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>General Terms of Service for Dog Grooming Service</strong></p>
                            <p><strong>1. Introduction</strong><br />
                                Welcome to Dog Grooming Service! We offer professional dog grooming services, including [list services such as washing, trimming, nail clipping, etc.], designed to keep your pet healthy, clean, and happy.</p>

                            <p><strong>2. Acceptance of Terms</strong><br />
                                By booking an appointment with us, you agree to be bound by these General Terms of Service (the "Terms"), which govern our relationship with you in relation to this website and our services. If you disagree with any part of these terms, please do not use our services.</p>

                            <p><strong>3. Booking Appointments</strong><br />
                                Appointments can be made via our website, phone, or in person.<br />
                                A valid email address and contact number must be provided for booking confirmation and any communication related to your appointment.</p>

                            <p><strong>4. Cancellation and Rescheduling</strong><br />
                                We require a minimum of [24/48] hours notice to cancel or reschedule an appointment without charge.<br />
                                Cancellations or rescheduling within [24/48] hours of your appointment may incur a [percentage] cancellation fee.</p>

                            <p><strong>5. Prices and Payment</strong><br />
                                Prices for our grooming services are listed on our website and are subject to change without notice.<br />
                                Payment is due at the time of service. We accept [list accepted payment methods].</p>

                            <p><strong>6. Health and Safety</strong><br />
                                For the safety of all pets and staff, we require that all dogs be up to date with their vaccinations.<br />
                                Owners must inform us of any health issues or special needs their dog may have prior to the grooming session.</p>

                            <p><strong>7. Liability</strong><br />
                                While we strive to provide the highest level of care, grooming may expose pre-existing health or skin conditions. We are not liable for any conditions revealed during grooming.<br />
                                Owners are liable for any damages or injuries caused by their pet to our groomers or property.</p>

                            <p><strong>8. Data Protection</strong><br />
                                We commit to protecting your personal data. Information collected during booking and service provision will be used in accordance with our Privacy Policy.</p>

                            <p><strong>9. Changes to These Terms</strong><br />
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>

                            <p><strong>10. Governing Law</strong><br />
                                These Terms are governed by and construed in accordance with the laws of [Your Country/State].</p>

                            <p><strong>11. Contact Us</strong><br />
                                For any questions or concerns regarding our services or these Terms, please contact us at [contact information].</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

export default Payment;