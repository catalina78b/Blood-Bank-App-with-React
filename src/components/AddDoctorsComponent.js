import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import "../App.css"
import axios from 'axios'

const DOCTOR_BASE_REST_API_URL = 'http://localhost:8080/api/doctors';


const AddDoctorComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    //const [donationCenter, setDonationCenter] = useState("");
    const [cnp, setCnp] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [donationCenters, setDonationCenters] = useState([]);
    const [selectedDonationCenterId, setSelectedDonationCenterId] = useState(null);
    const [donationCenterId, setDonationCenterId] = useState(null);
    const [donationCenter, setDonationCenter] = useState(null);

    useEffect(() => {
      async function fetchDonationCenters() {
        try {
          const response = await axios.get('http://localhost:8080/api/donation-centers');
          setDonationCenters(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDonationCenters();
    }, []);

function handleDonationCenterChange(event) {
  const selectedName = event.target.value;
  const selectedCenter = donationCenters.find(center => center.centerName === selectedName);

  if (selectedCenter) {
    setDonationCenterId(selectedCenter.id);
    setSelectedDonationCenterId(selectedCenter.id);
    console.log(selectedDonationCenterId);
  } else {
    console.error(`Could not find donation center with name ${selectedName}`);
  }
}

  
    useEffect(() => {
        if(id)
        {axios
          .get(DOCTOR_BASE_REST_API_URL + "/" + id)
          .then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setCnp(response.data.cnp);
            setDonationCenterId(response.data.donationCenterId);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });}
    
    }, [id]);
  
    const saveOrUpdateDoctor = (e) => {
      e.preventDefault();
  
      const doctor = { firstName, lastName, email, password, cnp, donationCenterId};
  
      if (id) {
        axios
          .put(DOCTOR_BASE_REST_API_URL + "/" + id, doctor)
          .then((response) => {
            console.log(response.data);
            navigate("/admin/:id");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(DOCTOR_BASE_REST_API_URL, doctor)
          .then((response) => {
            console.log(response.data);
            navigate("/admin/:id");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  
    const title = () => {
      if (id) {
        return <h2 className="text-center">Update Doctor</h2>;
      } else {
        return <h2 className="text-center">Add Doctor</h2>;
      }
    };
  
    return (
        <div>
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
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
                                    <label className = "form-label"> CNP :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter CNP"
                                        name = "cnp"
                                        className = "form-control"
                                        value = {cnp}
                                        onChange = {(e) => setCnp(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div>
                                <label htmlFor="donation-center-dropdown">Choose a donation center:</label>
                                <select id="donation-center-dropdown" onChange={handleDonationCenterChange}>
                                <option value="">--Select a center--</option>
                                    {donationCenters && donationCenters.map(center => (
                                          <option key={center.id} value={center.centerName}>{center.centerName}</option>
                                    ))}
                               </select>
                               </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateDoctor(e)} >Submit </button>
                                <Link to="/admin/:id" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddDoctorComponent;