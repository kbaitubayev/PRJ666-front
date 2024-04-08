import React, { useState } from "react";
import { Row, Col, Card, Button, Alert, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { appointmentAtom, servicesListAtom, customerAtom } from "@/store";
import api from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Appointment = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [services] = useAtom(servicesListAtom);
    const [customer] = useAtom(customerAtom);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    console.log(appointments);
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get(`/appointments/${customer._id}`);
                if (response.data) {
                    setAppointments(response.data);
                }
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async () => {
        if (selectedAppointment) {
            try {
                await api.delete(`/appointments/${selectedAppointment}`);
                setAppointments(appointments.filter(appointment => appointment._id !== selectedAppointment));
                setShowModal(false);
            } catch (error) {
                console.error(error);
            }
        }

    };

    const handleUpdate = (appointment) => {
        router.push({
            pathname: '/booking',
            query: { appointment: JSON.stringify(appointment) }
        });
    };

    const openModal = (appointmentId) => {
        setSelectedAppointment(appointmentId);
        setShowModal(true);
    };

    const CancelAppointmentModal = ({ showModal, setShowModal, handleCancel }) => (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to cancel this appointment? Please be aware of our cancellation policy.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCancel}>
                    Confirm Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div>
            {appointments.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No appointments found.
                </Alert>
            ) : (
                appointments.map((appointment, index) => (
                    <Row key={index}>
                        <Col>
                            <Card className="mb-4">
                                <Card.Header className="bg-primary text-white">
                                    <h4>{dayjs(appointment.date).format('dddd, MMMM D YYYY')}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h5>Time:</h5>
                                        <h5>{appointment.time}</h5>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h5>Service: </h5>
                                        <h5>{services.find(service => service._id === appointment.serviceType).title}</h5>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div></div>
                                        <div>
                                            <Button variant="outline-primary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(appointment)}>Update</Button>
                                            <Button variant="danger" onClick={() => openModal(appointment._id)}>Cancel</Button>

                                            <CancelAppointmentModal
                                                showModal={showModal}
                                                setShowModal={setShowModal}
                                                handleCancel={handleCancel}
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )))}

        </div>
    );
};

export default Appointment;