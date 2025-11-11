import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../MyContext/AppContext";
import { assets } from "../assets/assets";
import '../CSS_Folders/DocInfo.css';
import RelatedDoctor from "../Components/RelatedDoctor";
import axios from "axios";
function Appointment() {
  const naviagte = useNavigate();
  let { id } = useParams();
  // console.log(id);
  const { doctors, doctor_list, token, backend_url, doctorList, userData } = useContext(AppContext);
  const [docinfo, setdocinfo] = useState([]);
  const [docSlots, setdocSlots] = useState([]);
  const [slottime, setslottime] = useState('');

  const [slotTime, setslotTime] = useState(0);
  //  console.log("Doctor Slots:",docSlots[slotindex]?.[0]?.datetime);
  //   // console.log(docinfo);
  //  function clickhandler(){
  //       naviagte(`/myappointment`)
  //  }

  //  const day=docSlots[slotTime]?.[0]?.datetime;
  //  console.log("day:",day);
  //  const date= new Date();
  //  console.log("date:",date);

  const all_info = doctor_list.filter((doc) => doc._id === id)
  const filterdocinfo = () => {
    setdocinfo(all_info);
  }

  const week = ['SUN', 'MON', 'TUE', 'WED', 'THRU', 'FRI', 'SAT', 'SUN'];

  const doctorSlots = async () => {
    setdocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let Endtime = new Date();
      Endtime.setDate(today.getDate() + i);
      Endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < Endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })


        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const doctorSlot = day + '_' + month + '_' + year;
        const bookedTimes = docinfo?.[0]?.slot_booked?.[doctorSlot] || [];
        const isBooked = bookedTimes.includes(formattedTime);
        

        if(!isBooked){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
            booked:isBooked,
          })
        }
        
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setdocSlots((prev) => ([...prev, timeSlots]));

    }

  }
  useEffect(() => {
    filterdocinfo();
  }, [id, doctor_list])

  useEffect(() => {
    doctorSlots();
  }, [docinfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docinfo]);

  const bookappointment = async () => {
    if (!token) {
      console.log("Token is not present");
      return naviagte('/login');
    }
    try {
      const docId = id;
      const date = docSlots[slotTime]?.[0]?.datetime;
      // console.log("date:",date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const book_date = day + '_' + month + '_' + year;
      // console.log("todays_date:",day+'_'+month+'_'+year);

      const { data } = await axios.post(backend_url + '/api/v1/user/myappointment', { slotDate: book_date, docId, slotTime: slottime, userId: userData._id }, { headers: { token: token } })
      if (data.success) {
        console.log("yes it is working");
        doctorList();
        naviagte('/myappointment');
      }
      else {
        console.log(data.message);
      }

    }
    catch (error) {
      console.log("problem in book Appointment:", error);
    }
  }

  return (
    <div className="doctor_wrapper">
      <div className="doctor_container">
        {
          docinfo.map((all_data) => (
            <div className="single_doctor_info">
              <img src={`http://localhost:4000${all_data.myimage}`} alt="doc_info_img" className="doc_info_img" />
              <div className="doc_info">

                <h2 className="doc_name">{all_data.fullname} <img src={assets.verified_icon} alt="verified_icons" className="verified_icon" /></h2>
                <span className="doc_academic">
                  <span className="doc_degree">{all_data.degree}</span>
                  <span className="doc_speciality">{all_data.speciality}</span>
                  <span className="doc_experience">{all_data.experience}</span>
                </span>
                <span className="about_doc">About</span>
                <p className="doc_about">{all_data.about}</p>
                <p className="doc_fees">Appointment Fees: ${all_data.fees}</p>

                <div className="all_slots">
                  {
                    docSlots.length && docSlots.map((slots, index) => (
                      <div key={index} onClick={() => setslotTime(index)}>
                        <span className="day">{slots[0] && week[slots[0].datetime.getDay()]}</span>
                        <span className="date">{slots[0] && slots[0].datetime.getDate()}</span>
                      </div>
                    ))
                  }
                </div>
                <div className="slottime">
                  {
                    docSlots.length && docSlots[slotTime]?.map((only_time, index) => (
                      <div key={index} className={`timming_container ${slotTime==only_time.time ? "active":""}`} onClick={() => setslottime(only_time.time)}>
                        <span className="timming">{only_time.time.toLowerCase()}</span>
                      </div>
                    ))
                  }
                </div>
                <button className="btn" onClick={bookappointment}>Book an appointment</button>
              </div>
            </div>
          ))
        }

        <RelatedDoctor id={id} speciality={docinfo[0]?.speciality} />
      </div>

    </div>
  )
};
export default Appointment;