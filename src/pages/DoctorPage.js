import { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from '../components/Appointment';
import { useParams } from 'react-router-dom';

const DOCTOR_APPOINTMENTS_REST_API_URL = 'http://localhost:8080/api/doctors';

const DoctorPage = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${DOCTOR_APPOINTMENTS_REST_API_URL}/${id}/appointments?page=${currentPage}&size=5`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setAllAppointments(response.data.content);
        } else {
          setError('Unexpected response from server.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id, currentPage]);

  useEffect(() => {
    axios
      .get(`${DOCTOR_APPOINTMENTS_REST_API_URL}/${id}/appointments/today`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setTodayAppointments(response.data);
        } else {
          setError('Unexpected response from server.');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  const handleConfirmAppointment = (id, appointmentId) => {
    axios
      .put(`${DOCTOR_APPOINTMENTS_REST_API_URL}/${id}/appointments/${appointmentId}/confirm`)
      .then(response => {
        const confirmed = response.data.confirmed;
        if (confirmed) {
          setAllAppointments(prevAppointments =>
            prevAppointments.map(appointment => {
              if (appointment.id === appointmentId) {
                appointment.status = true;
              }
              return appointment;
            })
          );
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div className="doctor-page-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>All Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Donation Center</th>
                <th>Donor Name</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.map(appointment => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  onConfirmAppointment={() =>
                    handleConfirmAppointment(id, appointment.id)
                  }
                />
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous Page
            </button>
            <button
              disabled={allAppointments.length < 5}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next Page
            </button>
          </div>
          <hr /> {/* Add a separator */}
          <h2>Today's Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Donation Center</th>
                <th>Donor Name</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map(appointment => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  onConfirmAppointment={() =>
                    handleConfirmAppointment(id, appointment.id)
                  }
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DoctorPage;
