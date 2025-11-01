import { Link } from "react-router-dom";
import './Header.css';
import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { FaChevronDown } from "react-icons/fa";
import { AppContext } from "../MyContext/AppContext.jsx";
function Header() {
    const [showdropdown, setshowdropdown] = useState(false);
    const { token, settoken } = useContext(AppContext);
    // const[token,settoken]=useState(true);

    const logouthandler = () => {
        settoken('');
        localStorage.removeItem('token');
    }

    function clickhandler() {
        setshowdropdown(!showdropdown);
    }

    return (
        <div className="navbar_start">
            <nav className="navbar">
                <h2 className="logo"><Link to='/'>Logo</Link></h2>
                <ul className="navbar_links">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>AboutUs</Link></li>
                    <li><Link to='/alldoctors'>Doctors</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
                <div className="all_dropdowns">
                    {
                        token ?
                            (<div className='login_pages'>
                                <img src={assets.doc1} className='navbar_profileimage' alt="login_page_image" />
                                <FaChevronDown onClick={clickhandler} className="navbar_icon" />
                                {
                                    showdropdown && (<div>
                                        <div className="page_links">
                                            <ul className="page_link_wrapper">
                                                <li><Link to='/myprofile'>My Profile</Link></li>
                                                <li><Link to='/appointment'> My Appoitment</Link></li>
                                                <li onClick={logouthandler}>Logout</li>
                                            </ul>
                                        </div>
                                    </div>
                                    )}
                            </div>) : (
                                <button className="btn" ><Link to='/signup'>Create Account</Link></button>
                            )
                    }
                </div>


            </nav>
        </div>
    )
}
export default Header; 