import React from 'react';
import '../styling/AppointmentPage.css'

const Appointment = ({ appointment, onConfirmAppointment }) => {
  const { id, donationCenter, donor, doctor, date, status } = appointment;

  const handleConfirmClick = () => {
    onConfirmAppointment(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{donationCenter.centerName}</td>
      <td>{donor.firstName} {donor.lastName}</td>
      <td>{new Date(date).toLocaleString()}</td>
      <td>{status ? 'Confirmed' : 'Pending'}</td>
      <td>
        {!status && (
          <button onClick={handleConfirmClick} className="confirm-button">
          Confirm
        </button>        
        )}
      </td>
    </tr>
  );
};

export default Appointment;