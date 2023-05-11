import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import '../App.css'


const DOCTOR_BASE_REST_API_URL = 'http://localhost:8080/api/doctors';

export default function AdminPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    getAllDoctors();
}, []);


  const getAllDoctors = () => {
    axios.get(DOCTOR_BASE_REST_API_URL)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDoctor = (doctorId) => {
     axios.delete(DOCTOR_BASE_REST_API_URL + '/' + doctorId)
      .then(() => {
        getAllDoctors();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="container d-flex justify-content-center">
    <div className="w-75">
      <h2 className="text-center mb-4">List of Doctors</h2>
      <Link to="/add-doctor" className="btn btn-primary mb-2">
        Add Doctor
      </Link>
      <table className="table table-bordered table-striped">
        <thead className="black-text">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">CNP</th>
            <th scope="col">Donation Center</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.firstName}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.email}</td>
              <td>{doctor.cnp}</td>
              <td>{doctor.donationCenter ? doctor.donationCenter.centerName : ""}</td>
              <td className="d-flex">
                <Link
                  className="btn btn-info mr-3 d-inline"
                  to={`/edit-doctor/${doctor.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger d-inline"
                  onClick={() => deleteDoctor(doctor.id)}
                  style={{marginLeft: "10px"}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
