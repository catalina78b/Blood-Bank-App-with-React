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

  const handleDeleteAppointment = (appointmentId) => {
    axios
      .delete(APPOINTMENTS_BASE_REST_API_URL + "/" + appointmentId)
      .then(response => {
        const valid = response.data;
        if (valid) {
        // Remove the deleted appointment from the list
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment.id !== appointmentId)
        );
      }
      else
      {
        setError('Error occurred while deleting the appointment.');

      }})
      .catch(error => {
       console.log(error);
      });
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.donationCenter.centerName}</td>
                <td>{appointment.doctor ? appointment.doctor.firstName + ' ' + appointment.doctor.lastName : 'Unknown'}</td>
                <td>{new Date(appointment.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{appointment.status ? 'Confirmed' : 'Pending'}</td>
                <td>
                  {!appointment.status && (
                    <button onClick={() => handleDeleteAppointment(appointment.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsPage;
