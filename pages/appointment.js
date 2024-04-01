import React, { useState } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { appointmentAtom, servicesListAtom } from "@/store";
import api from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [services] = useAtom(servicesListAtom);
    const router = useRouter();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get("/appointments");
                setAppointments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async (appointmentId) => {
        try {
            await api.delete(`/appointments/${appointmentId}`);
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (appointment) => {
        router.push({
          pathname: '/booking',
          query: { appointment: JSON.stringify(appointment) }
        });
      };

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
                                            <Button variant="outline-primary" onClick={() => handleUpdate(appointment)}>Update</Button>
                                            <Button variant="danger" onClick={() => handleCancel(appointment._id)}>Cancel X</Button>
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