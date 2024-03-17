import React from 'react';
import { Card, Container, ListGroup, Button } from 'react-bootstrap';


function History() {
    const appointments = [
        { id: 1, status: 'Booked', date: '2022-01-01', service: 'Haircut' },
        { id: 2, status: 'Booked',date: '2022-01-15', service: 'Shave' },
        { id: 3, status: 'Done',date: '2022-02-01', service: 'Haircut & Shave' },
    ];

    return (
        <Container>
            <Card style={{ width: '100%' }}>
                <Card.Header>Appointment History</Card.Header>
                <ListGroup variant="flush">
                    {appointments.map(appointment => (
                        <ListGroup.Item key={appointment.id}>
                            {appointment.date ? <p><strong>Date: </strong>{appointment.date}</p> : <p><strong>Date: </strong>N/A</p>}
                            {appointment.service ? <p><strong>Service: </strong>{appointment.service}</p> : <p><strong>Classification: </strong>N/A</p>}
                        {appointment.status === 'Booked' ? <Button variant="primary">Update</Button> : ''} {" "}
                        {appointment.status === 'Booked' ? <Button variant="danger">Cancel</Button> : ''}
                        
                        


                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>N/A</Card.Title>
                    <Card.Text>
                        {appointments.date ? <p><strong>Date: </strong>{data.objectDate}</p> : <p><strong>Date: </strong>N/A</p>}
                        {appointments.service ? <p><strong>Service: </strong>{data.classification}</p> : <p><strong>Classification: </strong>N/A</p>}

                        {/* // Button to add to favorites */}
                        <Button variant="outline-primary">Update</Button>
                        <Button variant="outline-primary">Cancel X</Button>

                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default History;