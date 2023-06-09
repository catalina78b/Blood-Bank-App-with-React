import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/DonorPage.css';
import { useNavigate, useParams} from 'react-router-dom';

const DONOR_BASE_REST_API_URL = 'http://localhost:8080/api/donors';


const DonorPage = () => {
  const [donationCenters, setDonationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8080/api/donation-centers')
      .then(response => {
        setDonationCenters(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);


  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
  };
  const updateAccount = () => {
    navigate('/edit-donor/'+id);
  };

  const makeAppointment = () => {
    if (selectedCenter) {
      navigate('/add-appointment', { 
        state: { 
          donorId: id, 
          donationCenter: selectedCenter
        } 
      });
    } else {
      // Show an error message if no center is selected
      setError('Please select a donation center.');
    }
  };
  
  const deleteAccount = async () => {
    try {
      await axios.delete(DONOR_BASE_REST_API_URL + "/" + id)
      navigate('/');
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  return (
    <div className="doctor-page-container">
      <div className="button-container">
        <button className="doctor-page-button" onClick={updateAccount}>Update Account</button>
        <button className="doctor-page-button" onClick={deleteAccount}>Delete Account</button>
        <button className="doctor-page-button" onClick={() => navigate('/appointments/' + id)}>View Appointments</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Center Name</th>
              <th>County</th>
              <th>Address Details</th>
              <th>Functional</th>
              <th>Max Donations</th>
              <th>Schedule</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donationCenters.map((center) => (
              <tr key={center.id} onClick={() => handleSelectCenter(center)}>
                <td>{center.id}</td>
                <td>{center.centerName}</td>
                <td>{center.county}</td>
                <td>{center.addressDetails}</td>
                <td>{center.functional ? 'Yes' : 'No'}</td>
                <td>{center.maxDonations}</td>
                <td>{center.schedule}</td>
                <td>
                  <button className="make-appointment-button" onClick={() => makeAppointment()}>Make an Appointment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="selected-center-container">
        {selectedCenter ? (
          <div>
            <h3>{selectedCenter.centerName}</h3>
            <p>Address: {selectedCenter.addressDetails}</p>
            <p>County: {selectedCenter.county}</p>
            <p>Schedule: L-V {selectedCenter.schedule}</p>
            <p>Maximum nb of donations: {selectedCenter.maxDonations}</p>
            <p>Functional: {selectedCenter.functional ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Select a donation center from the table to view more details.</p>
        )}
      </div>
    </div>
  );
};

export default DonorPage;
