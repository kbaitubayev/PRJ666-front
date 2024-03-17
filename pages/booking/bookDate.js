import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Booking.module.css'

const BookDate = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Container>
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
                    <Form.Select style={{ width: '200px' }}>
                        <option value="1">10:00 AM</option>
                        <option value="2">11:00 AM</option>
                        <option value="3">12:00 PM</option>
                        <option value="4">1:00 PM</option>
                        <option value="5">2:00 PM</option>
                        <option value="6">3:00 PM</option>
                        <option value="7">4:00 PM</option>
                        <option value="8">5:00 PM</option>
                    </Form.Select>
                </div>

                {/* SELECTED SERVICE */}
                <div className='mx-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ marginRight: '10px' }}>Selected Service:</h4>
                    <Form.Select style={{ width: '200px' }} aria-label="Select services">
                        <option value="1">Haircut</option>
                        <option value="2">Shave</option>
                        <option value="3">Haircut & Shave</option>
                        <option value="4">Beard Trim</option>
                    </Form.Select>
                </div>

                {/* BUTTON */}
                <div className='text-center my-5'>
                    <button className='btn btn-primary'>Book Appointment</button>
                </div>
            </Container>
        </div>
    );
}

export default BookDate;