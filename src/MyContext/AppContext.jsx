import { createContext } from "react";
import { doctors } from '../assets/assets';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [doctor_list, setdoctor_list] = useState([]);
  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setuserData] = useState(false);

  const doctorList = async () => {

    const { data } = await axios.get(backend_url + '/api/v1/doctor/list');

    console.log("doctor list", data);
    if (data.success) {
      console.log(data);
      setdoctor_list(data.doctorlist);
    } else {
      console.log(data.message);
    }
  }

  const userprofile = async () => {

    const { data } = await axios.get(backend_url + '/api/v1/user/profile',{
      headers:
      {
        token: token
      }
    })
    console.log("user_details:",data);
    if(data.success){
      console.log(data);
      setuserData(true);
    }
    else{
      console.log("error message userdetails:",data.message);
    }

  }

  useEffect(() => {
    doctorList();
  }, [])

  useEffect(()=>{
    userprofile();
  },[token])


  const value = {
    doctors,
    backend_url,
    setdoctor_list,
    doctorList,
    doctor_list,
    userprofile,
    token,
    settoken,
  }

  return <AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>
};
export default ContextProvider;


