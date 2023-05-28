import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainPage from "./pages/MainPage"
import AdminPage from "./pages/AdminPage"
import DoctorPage from "./pages/DoctorPage"
import DonorPage from "./pages/DonorPage"
import AddDoctorComponent from "./components/AddDoctorsComponent"
import EditDonorComponent from "./components/EditDonorComponent"
import MakeAppointmentComponent from "./components/MakeAppointmentComponent"
import AppointmentsPage from "./pages/AppointmentsPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/:id" element={<AdminPage/>} />
        <Route path="/add-doctor" element={<AddDoctorComponent />} />
        <Route path="/edit-doctor/:id" element={<AddDoctorComponent />} />
        <Route path="/doctor/:id" element = {<DoctorPage />} />
        <Route path="/donor/:id" element={<DonorPage />} />
        <Route path="/edit-donor/:id" element={<EditDonorComponent />} />
        <Route path="/add-appointment" element={<MakeAppointmentComponent />}/>
        <Route path="/appointments/:id" element={<AppointmentsPage />} />AppointmentsPage
      </Routes>
    </BrowserRouter>
  )
}

export default App;