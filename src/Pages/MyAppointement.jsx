import { useContext, useEffect, useState } from "react";
import { AppContext } from "../MyContext/AppContext";
import "./MyAppointment.css";
import axios from "axios";
function MyAppointment(){
    const{doctors,backend_url,token}=useContext(AppContext);
    const[appointment,setappointment]=useState([]);
    console.log("appointment data:",appointment);
  
//  appointment.forEach((a, i) => {
//    console.log(i, a.docData.myimage);
// });
 console.log("Image URL:", `http://localhost:4000${appointment?.[1]?.docData?.myimage}`);
// console.log("doc_data:", doc_data);

function ChangeDates(slot_date){
    const Months=["","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"];
    const newslotdate=slot_date.split("_");
    return newslotdate[0]+" "+Months[Number(newslotdate[1])]+" "+newslotdate[2];
}

    const appointment_details=async()=>{
        try{
            const {data}= await axios.get(backend_url+'/api/v1/user/appointment',{headers:{
                token:token
            }})
            console.log("appointment details:",data);
            if(data.success){
                console.log("yes appointment data is fetching")
                setappointment(data.data.reverse())
            }

        }catch(error){

            console.log("error in appointment data fetching",error);
        }

    }
    useEffect(()=>{
      if(token){
        appointment_details();
      }
    },[token])




    return(
        <div className="myappointment_container">
           <h1 className="myappointment_heading">My Appointemnt </h1>
           
           <div className="appointed_doctors">
             {
                appointment.map((doc_data,ind)=>(
                <div className="all_doctor_details" key={doc_data._id || ind}>
                    
                 <img 
                 src={`http://localhost:4000${doc_data?.docData?.myimage}`}
                 alt="doctor_image"   
                 />     
                 <div className="doc_details">
                 <h3 className="doctor_name">{doc_data.docData.fullname}</h3>
                 <span className="doc_speaciality">{doc_data.docData.speciality}</span>
                 <p className="all_address">Address:
                <span className="adddress_line1">{doc_data.docData.address.line1}</span>
                <br/>
                <span className="address_line2">{doc_data.docData.address.line2}</span>
                 </p>
                <p className="d&t">Date & Time:{ChangeDates(doc_data?.slotDate)} | {doc_data.slotTime} </p>
                </div> 
                <div className="payment_cancel_appointment">
                   <button className="payment">Pay here</button>
                   <button className="cancel_appointment">Cancel Appointment</button>    
                </div>
                </div>
                ))
             }
            </div>
        </div>
    )
};
export default MyAppointment;