import React, { useContext } from 'react'
import PetCardDisplay from '../components/PetCradDisplay'
import { styled } from '@mui/material/styles';
import EditAddedcart from '../components/EditAddedcard';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../service/baseUrl';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { deletePetApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteResponseContext } from '../service/ContextShare';




function PetCradDisplay({ project }) {


    const {setDeleteUpdate}  = useContext(deleteResponseContext)


    const handleDelete=async(e)=>{
        e.preventDefault()
        const id=project?._id
        //header
        const token=localStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "access_token": `Bearer ${token}`
        }

        const response=await deletePetApi(reqHeader,id)

        console.log(response.data);
        if(response.status==200){
            toast(`Deleted successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        setDeleteUpdate(response.data)
    }
    else{
        toast(`Delete failed`, {
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

    return (
        <div >
            <Col lg={3} xs={12} sm={12} md={6} className='p-2'>
                <Card style={{ width: '20rem' }} >
                    <Card.Img variant="top" src={project ? `${BASE_URL}/uploads/${project.petImage}` : "https://i.postimg.cc/76pJ1S46/dogs.jpg"} style={{ height: "280px" }} />
                    <Card.Body>
                        <Card.Title><b>Pet Details</b></Card.Title>
                        <Card.Text>
                            <h6>CATEGORY:{project.category}</h6>
                            <h6>BREED:{project?.breed}</h6>
                            <h6>AGE:{project?.age}</h6>
                            <h6>PRICE:{project?.price}</h6>
                            <p>DESCRIPTION:{project?.description}</p>
                            <hr />
                            <Row>
                                <Col lg={6}>
                                    <EditAddedcart pet={project} ></EditAddedcart>

                                </Col>
                                <Col lg={6}>
                                    
                                <Button variant="danger" onClick={(e)=>handleDelete(e)}>DELETE</Button>

                                </Col>                      
                              </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>




            <ToastContainer />

        </div>
    )
}

export default PetCradDisplay
