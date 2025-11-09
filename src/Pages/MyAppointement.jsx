import { useContext } from "react";
import { AppContext } from "../MyContext/AppContext";
import "./MyAppointment.css";
function MyAppointment(){
    const{doctors}=useContext(AppContext);
    return(
        <div className="myappointment_container">
           <h1 className="myappointment_heading">My Appointemnt </h1>
           <div className="appointed_doctors">
             {
                doctors.slice(0,3).map((doc_data)=>(
                <div className="all_doctor_details">
                 <img 
                 src={doc_data.image}
                 alt="doctor_image"   
                 />     
                 <div className="doc_details">
                 <h3 className="doctor_name">{doc_data.name}</h3>
                 <span className="doc_speaciality">{doc_data.speciality}</span>
                 <p className="all_address">Address:
                <span className="adddress_line1">{doc_data.address.line1}</span>
                <br/>
                <span className="address_line2">{doc_data.address.line2}</span>
                 </p>
                <p className="d&t">Date & Time:25th July 2024 | 8:30PM </p>
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