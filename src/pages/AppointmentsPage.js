import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const APPOINTMENTS_BASE_REST_API_URL = 'http://localhost:8080/api/appointments';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(APPOINTMENTS_BASE_REST_API_URL + "/" + id)
      .then(response => {
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          setError('Unexpected response from server.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="appointment-page-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Donation Center</th>
              <th>Doctor</th>
              <th>Appointment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.donationCenter.centerName}</td>
                <td>{appointment.doctor.firstName + ' ' + appointment.doctor.lastName}</td>
                <td>{new Date(appointment.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{appointment.status ? 'Confirmed' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsPage;
