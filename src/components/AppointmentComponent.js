import React, { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios'
import { useLocation } from 'react-router-dom';


function AppointmentComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date,setDate]=useState(null);
  const location = useLocation();
  const { donorId, donationCenter } = location.state;
  const [created,setCreated]=useState(false);

  const handleDateChange = (moment) => {
    setSelectedDate(moment);
    console.log(donationCenter);
    console.log(donorId);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDate(selectedDate);

    // convert selectedDate to a string in the desired format
    const formattedDate = selectedDate.format('yyyy-MM-DDTHH:mm:ss');
    const appointment={donorId,donationCenter,date: formattedDate};
    console.log(appointment);
    try {
      const response = await axios.post('http://localhost:8080/api/appointments/add-appointment', appointment);
      console.log(response.data);
      if(response.data.created)
      {
        
        setCreated(true);
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

  return (
    <div>
      <h2>Make an Appointment</h2>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {created &&
        <div className="alert alert-success" role="alert">
          Appointment created successfully!
        </div>
      }
    </div>
  );
}

export default AppointmentComponent;
