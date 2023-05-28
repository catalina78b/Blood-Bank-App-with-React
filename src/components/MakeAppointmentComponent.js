import React, { useState, useEffect } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function MakeAppointmentComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(null);
  const location = useLocation();
  const { donorId, donationCenter } = location.state;
  const [created, setCreated] = useState(false);
  const [maxDonationReached, setMaxDonationReached] = useState(false);
  const [reminderType, setReminderType] = useState('');
  const [participateLottery, setParticipateLottery] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      checkMaxDonationLimit();
    }
  }, [selectedDate]);

  const handleDateChange = (moment) => {
    const utcMoment = moment.utc(); // Convert to UTC
    setSelectedDate(utcMoment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert selectedDate to the desired format
    const formattedDate = selectedDate.toISOString();
    const appointment = {
      donorId,
      donationCenter,
      date: formattedDate,
      notification: reminderType ? reminderType : '' 
    };

    try {
      console.log(reminderType);
      const response = await axios.post('http://localhost:8080/api/appointments/check-availability', appointment);
      console.log(response.data);
      if (response.data) {
        // Appointment is available
        const createResponse = await axios.post('http://localhost:8080/api/appointments/add-appointment', appointment);
        console.log(createResponse.data);
        if (createResponse.data.created) {
          setCreated(true);
          setMaxDonationReached(false);
          setParticipateLottery(true);
        }
      } else {
        // Appointment not available, maximum donation limit reached
        setMaxDonationReached(true);
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const isValidDate = (currentDate, selectedDate) => {
    return currentDate.isSameOrAfter(selectedDate, 'day');
  };

  const inputProps = {
    placeholder: 'Select date and time',
    minDate: new Date()
  };

  const checkMaxDonationLimit = async () => {
    const formattedDate = selectedDate.toISOString();
    const appointment = {
      donorId,
      donationCenter,
      date: formattedDate,
      notification: reminderType ? reminderType : '' 
    };

    try {
      const response = await axios.post('http://localhost:8080/api/appointments/check-availability', appointment);
      console.log(response.data);
      if (!response.data) {
        // Maximum donation limit reached
        setMaxDonationReached(true);
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handleReminderChange = (event) => {
    setReminderType(event.target.checked ? event.target.value : '');
  };
  
  return (
    <div>
      <h2>Make an Appointment</h2>
      {participateLottery && (
        <div className="alert alert-info" role="alert">
          Congratulations! You will be automatically entered into the anual lottery where you can win a free package of consultations and many other prizes!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="datetimepicker">Select Date and Time</label>
          <DateTime
            id="datetimepicker"
            onChange={handleDateChange}
            value={selectedDate}
            inputProps={inputProps}
            isValidDate={(currentDate) => isValidDate(currentDate, new Date())}
          />
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Set a Reminder</h5>
            <p className="card-text">You can set a reminder for your appointment through SMS or Email.</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="reminderCheckboxSMS"
                value="sms"
                checked={reminderType === 'sms'}
                onChange={handleReminderChange}
              />
              <label className="form-check-label" htmlFor="reminderCheckboxSMS">
                SMS
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="reminderCheckboxEmail"
                value="email"
                checked={reminderType === 'email'}
                onChange={handleReminderChange}
              />
              <label className="form-check-label" htmlFor="reminderCheckboxEmail">
                Email
              </label>
            </div>
          </div>
        </div>
        <p></p>
        <div>
          
            By making an appointment, you agree to our{' '}
            <Link to="/terms-and-conditions">terms and conditions</Link>.
          
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
        
      </form>
      {created && !maxDonationReached && (
        <div className="alert alert-success" role="alert">
          Appointment created successfully!
        </div>
      )}
      {maxDonationReached && (
        <div className="alert alert-danger" role="alert">
          Maximum donation limit reached for the selected date. Please choose another date and time.
        </div>
      )}
    </div>
  );
}

export default MakeAppointmentComponent;

