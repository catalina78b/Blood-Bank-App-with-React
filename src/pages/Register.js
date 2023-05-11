import React, { useState } from 'react';
import axios from 'axios';
import '../styling/Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [county, setCounty] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.post('http://localhost:8080/api/register', { 
      firstName, 
      lastName, 
      email, 
      password, 
      county, 
      bloodType 
    }).then(response => {
      if (response.data.accountCreated) 
        {setError('');
        setMessage('Account created!');}
      else
        { setMessage('');
          setError('An account with this email already exists!');

        }
        
      }).catch(error => {
        setMessage('');
        setError('An error occurred while registering');
      
    });
  };
  

  return (
    <div className="register-container">
      <div className="card-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
            <label>County:</label>
            <input type="text" value={county} onChange={(event) => setCounty(event.target.value)} />
            <label>Blood Type:</label>
            <select value={bloodType} onChange={(event) => setBloodType(event.target.value)}>
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="0+">0+</option>
              <option value="0-">0-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            {error && message==='' && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message} Please <a href="/login">log in</a>!</div>}
            <div className="button-container">
              <button type="submit" className="register-button">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
