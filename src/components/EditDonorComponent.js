import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import "../App.css"
import axios from 'axios'

const DONOR_BASE_REST_API_URL = 'http://localhost:8080/api/donors';


const EditDonorComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [county, setCounty] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(id)
        {axios
          .get(DONOR_BASE_REST_API_URL + "/" + id)
          .then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setBloodType(response.data.bloodType);
            setCounty(response.data.county);
            setPhoneNumber(response.data.phoneNumber);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });}
    
    }, [id]);
  
    const updateDonor = (e) => {
      e.preventDefault();
  
      const donor = { firstName, lastName, email, password, bloodType,county,phoneNumber };
  
      if (id) {
        axios
          .put(DONOR_BASE_REST_API_URL + "/" + id, donor)
          .then((response) => {
            console.log(response.data);
            navigate("/donor/"+id);
          })
          .catch((error) => {
            console.log(error);
          });
      } 
    };
  
    return (
        <div>
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                     <h2 className="text-center">Update Donor</h2>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email Id"
                                        name = "email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Enter Password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>


                                <div className = "form-group mb-2">
                                    <label className = "form-label"> County :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter County"
                                        name = "county"
                                        className = "form-control"
                                        value = {county}
                                        onChange = {(e) => setCounty(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Phone Number :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Phone Number"
                                        name = "phoneNumber"
                                        className = "form-control"
                                        value = {phoneNumber}
                                        onChange = {(e) => setPhoneNumber(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => updateDonor(e)} >Submit </button>
                                <Link to={"/donor/"+id} className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
};

export default EditDonorComponent;