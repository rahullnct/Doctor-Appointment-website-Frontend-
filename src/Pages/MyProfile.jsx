import { useState } from "react";
import { assets } from "../assets/assets";
import "./Myprofile.css";

function MyProfile() {
    const [user, setuser] = useState({
        fullname: "Rahul Kumar Yadav",
        image: assets.upload_area,
        email: "rahulyadavkv01@gmail.com",
        phone: "9931523546",
        address: {
            line1: "area no.-5",
            line2: "maithon Dam, Dhanbad"
        },
        gender: "male",
        Dob: "10-25-2001"
    })
    const [edit, setedit] = useState(true);

    return (
        <div className="myprofile_wrapper">
            <div className="myprofile_container">
                <img src={assets.doc1} alt="profile_image" className="profile_image"/>
                {
                    edit ? (<input
                        type="text"
                        value={user.fullname}
                        onChange={(event) => setuser(prev => ({
                            ...prev,
                            fullname: event.target.value
                        }))
                        }
                    className="edit_value"/>) : (<p className="default_value">{user.fullname}</p>)
                }
                <div className="contact_info">
                    <h1>CONTACT INFORMATION</h1>
                    <p>Email-Id:<span>{user.email}</span></p>
                    <p className="phone">Phone:{edit ? (<input type="text" className="edit_value" value={user.phone} onChange={(event) => setuser(prev => ({ ...prev, phone: event.target.value }))} />) : (<span className="default_value">{user.phone}</span>)}</p>
                    <p className="address">Address:{edit ?
                        (
                            <div>
                                <input
                                    type="text"
                                    value={user.address.line1}
                                    onChange={(event) => setuser(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line1: event.target.value }
                                    }))}
                                
                                className="edit_value"
                                />
                                <br />
                                <input
                                    type="text"
                                    value={user.address.line2}
                                    onChange={(event) => setuser(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line2: event.target.value }
                                    }))}
                                className="edit_value"
                                />
                            </div>
                        ) : (<div className="adddress">
                            <p className="first_address">{user.address.line1}</p>
                            <p className="first_address">{user.address.line2}</p>
                        </div>)
                    }
                    
                    </p>
                
                </div>
                <div className="basic_info">
                  <h1 className="basic_info_heading">BASIC INFORMATION</h1>
                  <p>Gender:{edit ? (<select value={user.gender} onChange={(event)=> setuser(prev=>({...prev,
                    gender:event.target.value
                  }))} className="edit_value">
                    <option value="male" className="edit_option_values">Male</option>
                    <option value="female" className="edit_option_values">Female</option>
                  </select>)
                  :
                  (<p className="default_value">{user.gender}</p>)}</p>
                
                <p className="dob">DOB:{edit ? (<input type="date" value={user.Dob} onChange={(event)=> setuser(prev=>({...prev, Dob:event.target.value}))}/>):(<p className="default value">{user.Dob}</p>)}</p>
               </div>
               {edit ?  <button className="save_info" onClick={()=>setedit(!edit)}>Save</button> : (<button  className='edit_btn' onClick={()=>setedit(!edit)}>Edit</button>)}
            </div>
        </div>
    )
};
export default MyProfile;