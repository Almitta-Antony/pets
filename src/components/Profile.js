import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfileApi, updateProfile } from '../service/allApi';
import { BASE_URL } from '../service/baseUrl';
import { Link } from 'react-router-dom';



function Profile() {

    const [update, setUpdate] = useState("")
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingImage, setExistingImage] = useState("")

    const [profile, setProfile] = useState({
        user: "", image: "", address: "", phone: ""
    })

    useEffect(() => {
        const userData = (JSON.parse(localStorage.getItem("currentUser")))

       if(userData) {setProfile({ ...profile, user: userData?.userName, image: "", address: userData.address, phone: userData.phone })
        setExistingImage(userData.profile)}
    }, [update])


    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image))
        }
        else {
            setPreview("")
        }
    }, [profile.image])
    // console.log(preview);


    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => setShow(true);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])
    console.log(token);

    const setData = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }

    console.log(profile);



    const handleUpdate = async (e) => {
        e.preventDefault()
        const { user, image, address, phone } = profile


        if (localStorage.getItem("currentUserID")) {
            const id = localStorage.getItem("currentUserID")
            console.log(id);


            //header
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "access_token": `Bearer ${token}`
            }
            console.log(reqHeader);

            //body
            const reqBody = new FormData()
            reqBody.append("userName", user)
            reqBody.append("profile", image ? image : existingImage)
            reqBody.append("address", address)
            reqBody.append("phone", phone)

            console.log(reqBody);

            const response = await updateProfile(reqBody, reqHeader, id)

            console.log(response);

            if (response.status == 200) {
                alert('updated successfully')
                //update username in the localstorage
                localStorage.setItem("currentUser", JSON.stringify(response.data))
                setUpdate(response.data)

                handleClose()

            }
            else {
                alert("profile update failed")
            }
        }
    }





    console.log(profile);

    return (
        <div className=' '>
            <div className='profile w-75 container'>
                <h3 className='text-center mt-5'>MY ACCOUNT</h3>
                <Container className='w-50 mt-5'>
                    <div className='text-center'>
                        {existingImage != "" ?
                            <img className='w-50 mt-3 mb-3' src={`${BASE_URL}/uploads/${existingImage}`} alt="" />
                            :
                            <img className='w-50 mt-3 mb-3'  src=" https://i.postimg.cc/50CtWCf8/5034901-200.png" alt="" />
    
                        }
                    </div>
                    <hr />
                    <p><i class="fa-solid fa-user me-3"></i>USERNAME :{profile?.user}</p>
                    <hr />
                    <p><i class="fa-solid fa-location-dot me-3"></i>Address:{profile?.address}</p>
                    <hr />
                    <p><i class="fa-solid fa-phone me-3"></i>Phone Number:{profile?.phone}</p>
    
                    <Row>
                        <Col className='text-center'>
                            <Button className='bg-dark  border-0 ' onClick={handleShow}><i class="fa-solid fa-user-pen me-3"></i>EDIT PROFILE</Button>
                        </Col>
    
                    </Row>
      <Row>
        <Col className='text-center mt-5' >
                            <Link to={'/dashboard'}>
                                <Button className='btn bg-white border-dark text-dark mb-5'>GO BACK HOME</Button>
                
            </Link>
        </Col>
      </Row>
                </Container>
    
    
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton className='border-0'>
                        <Modal.Title><i class="fa-solid fa-square-check me-3"></i>Complete Your Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <label htmlFor="img1" className='text-center'>
    {existingImage != "" ?
       <img className='w-50 mt-3 ms-5 mb-3 rounded-end-pill'
       src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`}
        />
       :
                            <img className='w-50 mt-3 ms-5 mb-3 rounded-end-pill'
                                src={preview ? preview : "https://i.postimg.cc/50CtWCf8/5034901-200.png"}
                                 />
                            
                            }
    
                        </label>
                        <input onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })} placeholder='choose file'
                            id='img1' style={{ display: 'none' }} type="file" />
    
    
    
                        <div>
                            <div className='mt-5'>
                                <input value={profile?.user} onChange={(e) => setData(e)} name="user" id='u1' type="text" placeholder='UserName' className='form-control' />
                            </div>
                            <div className='mt-3'>
                                <input type="text" value={profile?.address} onChange={(e) => setData(e)} name="address" className='form-control' placeholder='Address' />
                            </div>
                            <div className='mt-3 mb-5'>
                                <input type="text" value={profile?.phone} onChange={(e) => setData(e)} name="phone" className='form-control' placeholder='Phone Number' />
                            </div>
    
                        </div>
    
                    </Modal.Body>
                    <Modal.Footer className='border-0'>
    
                        <Button id="b" className='bg-dark text-white border-0 w-100 text-center' variant="primary" onClick={(e) => handleUpdate(e)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
    
    
                <ToastContainer />
            </div>
        </div>
    );
}

export default Profile;