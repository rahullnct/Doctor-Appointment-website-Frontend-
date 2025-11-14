import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import "./Myprofile.css";
import { AppContext } from "../MyContext/AppContext";
import axios from "axios";
function MyProfile() {
    const { userData, setuserData, userprofile, backend_url, token } = useContext(AppContext);
    console.log("user datas:", userData);

   
    const [edit, setedit] = useState(false);
    const updateUserProfile = async() => {
        try {

            const formData = new FormData();
            formData.append('fullname', userData.fullname)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify({
                line1: userData?.address?.line1 || "",
                line2: userData?.address?.line2 || ""
            }));
            // formData.append('line2',userData.address.line2)
            formData.append('Dob', userData.Dob)

    
            const { data } = await axios.post(backend_url + '/api/v1/user/update-profile', formData, {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (data.success) {
                console.log("update_Data:", data);
                await userprofile();
                setedit(false);
                // setimage(null);
            }
            else {
                console.log("error in update_profile:", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return userData && (
        <div className="myprofile_wrapper">
            <div className="myprofile_container">
                <img src={`http://localhost:4000${userData.myimage}`} alt="profile_image" />
                {
                    edit ? (<input
                        type="text"
                        value={userData.fullname}
                        onChange={(event) => setuserData(prev => ({
                            ...prev,
                            fullname: event.target.value
                        }))
                        }
                        className="edit_value" />) : (<p className="default_value">{userData.fullname}</p>)
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
                    <p>Gender:{
                        (<p className="default_value">{userData.gender}</p>)}</p>

                    <p className="dob">DOB:{edit ? (<input type="date" value={userData.Dob} onChange={(event) => setuserData(prev => ({ ...prev, Dob: event.target.value }))} />) : (<p className="default value">{userData.Dob}</p>)}</p>
                </div>
                {edit ? <button className="save_info" onClick={updateUserProfile}>Save</button> : (<button className='edit_btn' onClick={() => setedit(!edit)}>Edit</button>)}
            </div>
        </div>
    )
};
export default MyProfile;