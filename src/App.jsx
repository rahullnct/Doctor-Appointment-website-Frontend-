import viteLogo from '/vite.svg'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
// import Doctor from './Pages/Appointment';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import NewComponent from './Components/NewComponent';
import Appointment from './Pages/Appointment';
import AllDoctor from './Pages/AllDoctor';
import SpecilityDoctor from './Components/SpecilityDoctor';
import { ScrollTop } from './Components/ScrollTop';
import MyProfile from './Pages/MyProfile';
import MyAppointment from './Pages/MyAppointement';

function App() {
  return (
  <div className='main_wrapper'>
  <ScrollTop/>
  <Routes>
  <Route path="/" element={<NewComponent />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />}/>
  <Route path="contact" element={<Contact/>}/>
  <Route path="doctor/:id" element={<Appointment/>} />
  <Route path="alldoctors" element={<AllDoctor/>} />
  <Route path="signup" element={<Signup />} />
  <Route path='/myprofile' element={<MyProfile/>}/>
  <Route path="/myappointment" element={<MyAppointment />} />
  {/* <Route path="appointment/:id" element={<Appointment/>} /> */}
  <Route path="alldoctors/:speciality" element={<AllDoctor/>} />
   {/* <Route path="specilist_doctor/:specility" element={<SpecilityDoctor/>} /> */}
  <Route path="login" element={<Login />} />
  </Route>
  </Routes>
    </div>
  )
}

export default App;