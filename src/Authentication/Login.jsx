import { useContext, useState } from "react"; 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import '../Authentication/Login.css';
import axios from "axios";
import { AppContext } from "../MyContext/AppContext";
function Login()
{
    const [loginsetup, setloginsetup] = useState({ email: "", password: "" }) 
    const [showpassword, setshowpassword] = useState(false);
    const{token,settoken,backend_url}=useContext(AppContext);
    const navigate=useNavigate();
    function changehandler(event) 
    {
     setloginsetup((prev) =>
         ({ ...prev,
             [event.target.name]: event.target.value })) 
    } 
    async function submithandler(event)
    { 
       event.preventDefault();
       try{
         const{email,password}=loginsetup;
         const{data}= await axios.post(backend_url+'/api/v1/user/login',{email,password})
    // console.log(data);
       if(data.success){
        localStorage.setItem('token',data.loginToken);
        settoken(data.loginToken);
        setloginsetup({
            email:"",
            password:""
        })
        navigate('/');
       }
       else{
        console.log("problem in login page");
       }
       }catch(error){
        console.log(error);
       }
        // setloginsetup({ username: "", password: "" }) 
    }
    return (
    <div className="login_wrapper">
        <div className="login_container">
            <div className="login_left">
                <h1 className="login_heading">Welcome Back</h1> 
                <p className="login_subheading">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat ea libero a magnam! Porro officia ratione quia autem quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, deserunt.</p>
                </div>
                <form onSubmit={submithandler} className="login_form">
                <label htmlFor="email" className="for_username">Email</label>
                <input className="inp_username" 
                type="email"
                name="email" 
                value={loginsetup.email}
                onChange={changehandler}
                required />
                <label htmlFor="password" className="for_password">Password</label> 
                <input className="inp_password"
                type={showpassword ? "text" : "password"} 
                name="password" 
                value={loginsetup.password} 
                onChange={changehandler}
                required />
                {
                 showpassword ? (<FaEye onClick={() => setshowpassword(!showpassword)} className="show_icon" />) :
                  (<FaEyeSlash onClick={() => setshowpassword(!showpassword)} className="show_icon" />)
                }
                <Link to='/forgot_password' className="forgot_password">Forgotten password</Link> 
                <button className="login_btn">Login</button> 
                 <p className="new_user">Don't have an account <Link to='/signup' className="signup_link">Signup</Link></p>
                </form> 
                </div> 
                </div>);
} 
                export default Login;