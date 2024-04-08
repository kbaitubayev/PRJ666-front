import React, { useState, useEffect } from 'react';
import { deleteAppointment, getService, getCustomer } from '../services/api'; // Import getService and getCustomer functions

const AppointmentListingAdmin = ({ appointments, fetchAppointments }) => {
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState([]);

  useEffect(() => {
    fetchDetails(); // Fetch details of services and customers when appointments change
  }, [appointments]);

  const fetchDetails = async () => {
    const details = await Promise.all(appointments.map(async appointment => {
      const service = await getService(appointment.serviceType);
      //const customer = await getCustomer(appointment.customer);
      return { ...appointment, service };
    }));
    setAppointmentDetails(details);
  };

  
  return (
    <div>
      <h2>Existing Appointments</h2>
      <ul>
        {appointmentDetails.map(appointment => (
          <li key={appointment._id}>
            <div>
              <strong>Date:</strong> {appointment.date}
            </div>
            <div>
              <strong>Time:</strong> {appointment.time}
            </div>
            <div>
              <strong>Service:</strong> {appointment.service.title} {/* Display service title */}
            </div>
            <div>
              <strong>Customer:</strong> {appointment.customer} {/* Display customer email */}
            </div>
           
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentListingAdmin;
