import React, { useContext, useEffect } from 'react'
import {  editResponseContext } from '../service/ContextShare'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import { BASE_URL } from '../service/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePetApi } from '../service/allApi';


function EditAddedcard({ pet }) {

    const {setEditUpdate} = useContext(editResponseContext)

    const [show, setShow] = useState(false);
    const handleClose = () => {    setShow(false);
        setPetInputs({...petInputs,breed:"",age:"",category:"",price:"",description:"",petaimge:""})
        
}    

const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")

    const [petInputs, setPetInputs] = useState({
        breed: pet.breed, age: pet.age, category: pet.category, price: pet.price, description: pet.description, petImage: ""
    })

    console.log(petInputs);

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { breed, age, category, price, description, petImage } = petInputs
        if (!breed || !age || !category || !price || !description) {
            toast("please fill all the input fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            //api call

            //bosy
            const reqBody = new FormData()
            reqBody.append("breed", breed)
            reqBody.append("age", age)
            reqBody.append("category", category)
            reqBody.append("description", description)
            reqBody.append("price", price)
            preview ? reqBody.append("petImage", petImage) :
            reqBody.append("petImage", pet.petImage)

            //header
            const token = localStorage.getItem("token")
            if (preview) {
                var headerConfig = {
                    "Content-Type": "multipart/form-data",
                    "access_token": `Bearer ${token}`
                }
            }
            else {
                var headerConfig = {
                    "Content-Type": "application/json",
                    "access_token": `Bearer ${token}`
                }
            }
            //project id
            const petId = pet._id

            const result=await updatePetApi(reqBody,headerConfig,petId)
            console.log(result);
            if(result.status==200){
                toast(`${result.data.category} updated !!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                //refresh  data
                setEditUpdate(result.data)
                handleClose()
            }
            else{
                toast(`update failed`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }


    }

    useEffect(() => {

        if (petInputs.petImage) {
            setPreview(URL.createObjectURL(petInputs.petImage))
        }
        else {
            setPreview("")
        }
    }, [petInputs.petImage])

    return (
        <div>

            <Button variant="secondary" onClick={handleShow} >EDIT</Button>


            <Modal show={show} onHide={handleClose} className='bg-transparent'>
                <Modal.Header className='border-0 ' closeButton>
                    <Modal.Title >EDIT DETAILS OF THE PET</Modal.Title>
                </Modal.Header>
                <Modal.Body className=''>
                    <Container>
                        <Row>
                            <Col lg={7}>
                                <label htmlFor="img1" >

                                    <input o type="file" name="" id="img1" style={{ display: 'none' }}
                                        onChange={(e) => setPetInputs({ ...petInputs, ["petImage"]: e.target.files[0] })} />
                                    <img src={preview ? preview : `${BASE_URL}/uploads/${pet.petImage}`}
                                        className='100 me-5 mb-3' alt=""
                                        style={{ height: '250px' }} />

                                </label>

                            </Col>
                            <Col lg={5}>
                                <input type="text" onChange={(e) => setPetInputs({ ...petInputs, ["breed"]: e.target.value })} value={petInputs.breed} name="" id="" className='border-0 form-control' placeholder='Pet Breed' />
                                <hr />
                                <Row>
                                    <Col>
                                        <input type="text" onChange={(e) => setPetInputs({ ...petInputs, ["age"]: e.target.value })} value={petInputs.age} name="" id="" className='border-0 form-control' placeholder='Pet Age' />
                                        <hr />
                                        <Row>
                                            <Col>
                                                <input type="text" onChange={(e) => setPetInputs({ ...petInputs, ["category"]: e.target.value })} value={petInputs.category} name="" id="" className='border-0 form-control' placeholder='category' />
                                                <hr />
                                                <Row>
                                                    <Col>
                                                        <input type="text" onChange={(e) => setPetInputs({ ...petInputs, ["price"]: e.target.value })} value={petInputs.price} name="" id="" className='border-0 form-control' placeholder='price' />
                                                        <hr />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Col>

                            <Row>
                                <Col>

                                    <textarea type="text" onChange={(e) => setPetInputs({ ...petInputs, ["description"]: e.target.value })} value={petInputs.description} name="" id="" className='border-0 form-control' placeholder='Description' />
                                    <hr />
                                </Col>
                            </Row>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer className='border-0 '>

                    <div className='text-center w-100'>
                        <Button variant="secondary" className='w-25' onClick={(e) => handleUpdate(e)}>
                            UPDATE
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>
    )
}

export default EditAddedcard
