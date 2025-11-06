import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import "./Myprofile.css";
import { AppContext } from "../MyContext/AppContext";

function MyProfile() {
    const{userData,setuserData}=useContext(AppContext);
    console.log("user datas:",userData);
   
    const[image,setimage]=useState(false);
    const [edit, setedit] = useState(false);

    return userData && (
        <div className="myprofile_wrapper">
            <div className="myprofile_container">
                {/* <img src={assets.doc1} alt="profile_image" className="profile_image"/>*/}
                  {
                    edit ? 
                    <label htmlFor="images">
                    <div className="profile_image_container">
                        <img src={image ? URL.createObjectURL(image) : `http://localhost:4000${userData.image}`} alt="profile_image"/>
                        <img src={image ? '' : assets.upload_area} alt="profile_image_not_shown"/>
                    </div>
                    <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="images" hidden/>
                    </label>
                    : 
                    (<img 
                    src={`http://localhost:4000${userData.myimage}`} alt="upload_areas"/>
                    )
                  }
                {
                    edit ? (<input
                        type="text"
                        value={userData.fullname}
                        onChange={(event) => setuserData(prev => ({
                            ...prev,
                            fullname: event.target.value
                        }))
                        }
                    className="edit_value"/>) : (<p className="default_value">{userData.fullname}</p>)
                }
                <div className="contact_info">
                    <h1>CONTACT INFORMATION</h1>
                    <p>Email-Id:<span>{userData?.email}</span></p>
                    <p className="phone">Phone:{edit ? (<input type="text" className="edit_value" value={userData.phone} onChange={(event) => setuserData(prev => ({ ...prev, phone: event.target.value }))} />) : (<span className="default_value">{userData.phone}</span>)}</p>
                    <p className="address">Address:{edit ?
                        (
                            <div>
                                <input
                                    type="text"
                                    value={userData?.address?.line1 || ""}
                                    onChange={(event) => setuserData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line1: event.target.value }
                                    }))}
                                
                                className="edit_value"
                                />
                                <br />
                                <input
                                    type="text"
                                    value={userData?.address?.line2 || ""}
                                    onChange={(event) => setuserData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line2: event.target.value }
                                    }))}
                                className="edit_value"
                                />
                            </div>
                        ) : (<div className="adddress">
                            <p className="first_address">{userData?.address?.line1 || ""}</p>
                            <p className="first_address">{userData?.address?.line2 || ""}</p>
                        </div>)
                    }
                    
                    </p>
                
                </div>
                <div className="basic_info">
                  <h1 className="basic_info_heading">BASIC INFORMATION</h1>
                  <p>Gender:{edit ? (<select value={userData.gender} onChange={(event)=> setuserData(prev=>({...prev,
                    gender:event.target.value
                  }))} className="edit_value">
                    <option value="male" className="edit_option_values">Male</option>
                    <option value="female" className="edit_option_values">Female</option>
                  </select>)
                  :
                  (<p className="default_value">{userData.gender}</p>)}</p>
                
                <p className="dob">DOB:{edit ? (<input type="date" value={userData.Dob} onChange={(event)=> setuserData(prev=>({...prev, Dob:event.target.value}))}/>):(<p className="default value">{userData.Dob}</p>)}</p>
               </div>
               {edit ?  <button className="save_info" onClick={()=>setedit(!edit)}>Save</button> : (<button  className='edit_btn' onClick={()=>setedit(!edit)}>Edit</button>)}
            </div>
        </div>
    )
};
export default MyProfile;