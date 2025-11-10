import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../MyContext/AppContext";
import {assets} from "../assets/assets";
import '../CSS_Folders/DocInfo.css';
import RelatedDoctor from "../Components/RelatedDoctor";
function Appointment(){
   const naviagte=useNavigate();
    let {id}=useParams();
    // console.log(id);
    const {doctors,doctor_list,token,backend_url}=useContext(AppContext);
    const[docinfo,setdocinfo]=useState([]);
    const[docSlots,setdocSlots]=useState([]);
    const[slotindex,setslotindex]=useState(0);
   
    const[slotTime,setslotTime]=useState(0);
//  console.log("Doctor Slots:",docSlots[slotindex]?.[0]?.datetime);
  //   // console.log(docinfo);
  //  function clickhandler(){
  //       naviagte(`/myappointment`)
  //  }
   
   const day=docSlots[slotindex]?.[0]?.datetime;
   console.log("day:",day);
   const date= new Date();
   console.log("date:",date);

  const all_info= doctor_list.filter((doc)=>doc._id === id)
    const filterdocinfo=()=>{
       setdocinfo(all_info);
    }

    const week=['SUN','MON','TUE','WED','THRU','FRI','SAT','SUN'];
   
    const doctorSlots=async()=>{
      setdocSlots([]);
      let today= new Date();
      for(let i=0;i<7;i++){
        
        let currentDate= new Date(today);
        currentDate.setDate(today.getDate()+i);

        let Endtime= new Date();
        Endtime.setDate(today.getDate()+i);
        Endtime.setHours(21,0,0,0);

        if(today.getDate() === currentDate.getDate()){
          currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1 : 10);
          currentDate.setMinutes(currentDate.getMinutes()>30 ? 30: 0);
        }
        else 
        {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots=[];
        while(currentDate < Endtime){
          let formattedTime= currentDate.toLocaleTimeString([],{hour:'2-digit',
            minute:'2-digit',
            hour12:true
            })
          
          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          })
          currentDate.setMinutes(currentDate.getMinutes()+30);
        }
        setdocSlots((prev)=>([...prev,timeSlots]));

      }

    }
    useEffect(()=>{
      filterdocinfo();
    },[id,doctor_list])

    useEffect(()=>{
     doctorSlots();
    },[docinfo])

    useEffect(()=>{
      console.log(docSlots);
    },[docinfo]);

    const bookappointment=async()=>{
       if(!token){
        console.log("Token is not present");
        return naviagte('/login');
       }
       try{
          // const day=docSlots[slotindex][0]?.daytime;
          // console.log("day:",day);
          // const date= 
       }
       catch(error){
        console.log("problem in book Appointment:",error);
       }
    }

    return(
        <div className="doctor_wrapper">
        <div className="doctor_container">
          {
            docinfo.map((all_data)=>(
            <div className="single_doctor_info">
               <img src={`http://localhost:4000${all_data.myimage}`} alt="doc_info_img" className="doc_info_img"/> 
               <div className="doc_info">

                <h2 className="doc_name">{all_data.fullname} <img src={assets.verified_icon} alt="verified_icons" className="verified_icon"/></h2>
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
              docSlots.length && docSlots.map((slots, index)=>(
                 <div key={index} onClick={()=> setslotTime(index)}>
                  <span className="day">{slots[0] && week[slots[0].datetime.getDay()]}</span>
                  <span className="date">{slots[0] && slots[0].datetime.getDate()}</span>
                 </div>
              ))
            }
          </div>
          <div className="slottime">
             {
              docSlots.length && docSlots[slotTime].slice(0,8).map((only_time,index)=>(
                <div key={index} className="timming_container">
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

          <RelatedDoctor id={id}  speciality={docinfo[0]?.speciality}/>
        </div>
            
        </div>
    )
};
export default Appointment;