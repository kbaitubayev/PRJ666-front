import React, { useState, useEffect, use } from 'react';
import { Container, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import api from '../../services/api';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Booking.module.css'
import { useAtom } from 'jotai';
import { userAtom, profileAtom, dateTimeAtom, serviceAtom, customerAtom } from '../../store';

const BookDate = () => {
    const router = useRouter();
    const mode = router.query.appointment ? 'update' : 'create';
    const [existingAppointment, setExistingAppointment] = useState(router.query.appointment ? JSON.parse(router.query.appointment) : null);

    const [customerId, setCustomerId] = useAtom(customerAtom);
    const [services, setServices] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(existingAppointment ? existingAppointment.time : '10:00 AM');

    const [user, setUser] = useAtom(userAtom);
    const [profile, setProfile] = useAtom(profileAtom);
    const [dateTime, setDateTime] = useAtom(dateTimeAtom);
    const [selectedService, setSelectedService] = useAtom(serviceAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'update') {
            try {
                setDateTime([date, time]);
                const updatedAppointment = await api.put(`/appointments/${existingAppointment._id}`, {
                    date: dayjs(date).format('YYYY-MM-DD').toString(),
                    time: time,
                    serviceType: selectedService._id,
                    customer: customerId

                });

                console.log('Updated appointment:', updatedAppointment.data);
                console.log(date, time);

                router.push('../appointment')
            } catch (error) {
                console.error(error);
            }
        } else {
            router.push('/booking/customerProfile');
            setDateTime([date, time]);
        }
    };

    // Fetch services data from the server
    useEffect(() => {
        // Fetch user data from local storage
        setUser(JSON.parse(localStorage.getItem('userLoggedIn')));

        //Fetch services data from the server
        const fetchService = async () => {
            try {
                const response = await api.get('/services');
                setServices(response.data);
                setSelectedService(response.data[0])
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };

        const fetchAppointment = async () => {
            try {
                const response = await api.get('/appointments');
                console.log('Appointments:', dayjs(response.data[4].date).format('YYYY-MM-DD'));
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        

        fetchAppointment();
        fetchService();
    }, []);

    // Fetch customer profile data from the server
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await api.get('/customers/profile', {
                    headers: {
                        'x-auth-token': token
                    },
                    body: JSON.stringify(user)
                });
                // Update customer state with fetched data
                setCustomerId(response.data._id);
                setProfile(response.data);
            } catch (error) {
                setProfile('');
                console.log(error);
            }
        };

        // Fetch customer profile when user state changes
        if (user) {
            fetchCustomerProfile();
        }
    }, [user]);


    // HANDLE SERVICE CHANGE
    const handleServiceChange = (e) => {
        setSelectedService(services.find(service => service._id === e.target.value));
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    {/* HEADER */}
                    <h1 style={{ textAlign: 'center' }} className='my-5'>Book a Date</h1>

                    {/* CALENDAR */}
                    <div className="react-calendar mx-auto">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            minDate={new Date()}
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
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:00 PM">4:00 PM</option>
                            <option value="5:00 PM">5:00 PM</option>
                        </Form.Select>
                    </div>

                    {/* SELECTED SERVICE */}
                    <div className='mx-3' style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ marginRight: '10px' }}>Selected Service:</h4>
                        <Form.Select style={{ width: '230px' }} aria-label="Select services" onChange={handleServiceChange}>
                            {services.map(service => (
                                <option key={service._id} value={service._id}>{service.title}</option>
                            ))}
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