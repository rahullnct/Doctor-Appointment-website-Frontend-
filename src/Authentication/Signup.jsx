import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import axios from "axios";
import { AppContext } from "../MyContext/AppContext";
function Signup(){
  const{backend_url,token,settoken}=useContext(AppContext);
    const[signupdata,setsignupdata]=useState({
        fullname:"",email:"", password:""
    })

      function changehandler(event){
        setsignupdata((prev)=>({
            ...prev,
         [event.target.name]:event.target.value
        }))
    }
     async function signuphandler(event){
        event.preventDefault(); 
        try{
          const{fullname,email,password}=signupdata;
           const {data}= await axios.post(backend_url+'/api/v1/user/signin',{fullname,email,password});
            if(data.success){
              localStorage.setItem('token',data.token);
            settoken(data.token)
            setsignupdata({
            email:"",
            password:"",
            fullname:""
            })
           }
           else{
            console.log("some error in signin");
           }
        }catch(error){
          console.log(error);
        }
    };

    
    return(
        <div className="signup_wrapper">
          <div className="signup_container">
            <h1 className="signup_heading">Create Account</h1>
            <p className="signup_subheading">Please Signup for the Appointments</p>
              <form className="formhandler" onSubmit={signuphandler}>
                 <label htmlFor="Fullname">Full Name</label>
                 <input 
                 className="allinputs"
                 type="text"
                 placeholder="Enter Full Name"
                 name="fullname"
                 value={signupdata.fullname}
                 onChange={changehandler}
                 />
                 <label htmlFor="email">Email</label>
                 <input 
                 className="allinputs"
                 type="email"
                 placeholder="Enter your Email"
                 name="email"
                 value={signupdata.email}
                 onChange={changehandler}
                 />
                 <label htmlFor="password">Password</label>
                 <input 
                 className="allinputs"
                 type="password"
                 placeholder="Enter Password"
                 name="password"
                  value={signupdata.password}
                  onChange={changehandler}
                 />
                 <button className="Signup_btn">Submit</button>
                 <p className="have_login">Already have an account <Link to='/login'>login</Link></p>
              </form>
          </div>            
        </div>
    )
};
export default Signup;