import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import api from '../../services/api';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Booking.module.css'

const BookDate = () => {
    const [value, onChange] = useState(new Date());
    const [time, setTime] = useState('10:00 AM');
    const [service, setService] = useState('Haircut');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/appointments', {
                date: value,
                time: time,
                service: service
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    useEffect(() => {
        // Fetch data from the server when the component mounts
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('authToken');
            const response = await api.get('/appointments');
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error fetching about data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                {/* HEADER */}
                <h1 style={{ textAlign: 'center' }} className='my-5'>Book a Date</h1>

                {/* CALENDAR */}
                <div className="react-calendar mx-auto">
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />
                </div>

                {/* SELECTED DATE & SERVICE*/}
                <div className='mx-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 className='my-3' style={{ marginRight: '10px' }}>Selected Time: </h4>
                    <Form.Select style={{ width: '200px' }} value={time} onChange={e => setTime(e.target.value)}>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM6">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                    </Form.Select>
                </div>

                {/* SELECTED SERVICE */}
                <div className='mx-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ marginRight: '10px' }}>Selected Service:</h4>
                    <Form.Select style={{ width: '200px' }} aria-label="Select services" value={service} onChange={e => setService(e.target.value)}>
                        <option value="Haircut">Haircut</option>
                        <option value="Shave">Shave</option>
                        <option value="Haircut & Shave">Haircut & Shave</option>
                        <option value="Beard Trim">Beard Trim</option>
                    </Form.Select>
                </div>

                {/* BUTTON */}
                <div className='text-center my-5'>
                    <button className='btn btn-primary'>Book Appointment</button>
                </div>
                </Form>
            </Container>
        </div>
    );
}

export default BookDate;