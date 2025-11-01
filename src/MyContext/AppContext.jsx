import { createContext } from "react";
import {doctors} from '../assets/assets';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext= createContext();

const ContextProvider=(props)=>{
     const backend_url= import.meta.env.VITE_BACKEND_URL;
     const[doctor_list,setdoctor_list]=useState([]);
     const[token,settoken]=useState(localStorage.getItem('token') ? localStorage.getItem('token'): false);
 
     const doctorList=async()=>{

      const {data}= await axios.get(backend_url + '/api/v1/doctor/list');

      console.log("doctor list",data);
      if(data.success){
        console.log(data);
        setdoctor_list(data.doctorlist);
      }else{
        console.log(data.message);
      }
     }

     useEffect(()=>{
      doctorList();
     },[])


     const value={
       doctors,
       backend_url,
       setdoctor_list,
       doctorList,
       doctor_list,
       token,
       settoken,
     }

     return <AppContext.Provider value={value}>
        {props.children}
     </AppContext.Provider>
};
export default ContextProvider;


