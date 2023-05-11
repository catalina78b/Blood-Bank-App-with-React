import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

 
  async function properLogin(event) {
    event.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });
  
      localStorage.setItem('token', res.data.token);
      if (res.data.role === 'ADMIN') {
        navigate(`/admin/${res.data.id}`);
      } else if (res.data.role === 'DOCTOR') {
        navigate(`/doctor/${res.data.id}`);
      } else if (res.data.role === 'DONOR') {
        navigate(`/donor/${res.data.id}`);
      }
      else
        setError(res.data.message);
    
    } catch (error) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1> Login </h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" onClick={properLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
