import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AddPet from '../pages/AddPet';
import { addcartResponseContext } from '../service/ContextShare';


function Header() {
 
    const [uname, setUname] = useState("")

   

    const navigate=useNavigate()
    const logout=(e)=>{
        e.preventDefault()
        localStorage.removeItem("currentUser")
        localStorage.removeItem("currentUserID")
        localStorage.removeItem("token")
        navigate('/')
    }

    useEffect(() => {
   

        if (localStorage.getItem("currentUser")) {
            setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
        }
    },[])
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='border-0' />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            className='toggle'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <Col>
                   
                </Col>{uname}'s DASHBOARD
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='text-start'>
                                <Col>
<h5>
                                        <Link to={'/single-view'} style={{ textDecoration: "none" }}><i class="fa-solid fa-gear"></i>  MY ACCOUNT</Link>
    
</h5>                                    <Row>
                                        <Col>
                                            <Link to={'/addpet'} style={{ textDecoration: "none" }}>
                                                <h5 className=' w-75 text-danger mt-3 ' style={{ height: "40px" }}><i class="fa-solid fa-plus me-2"></i>SELL </h5>

                                            </Link>

                                        </Col></Row>
                                </Col>

                                <Row>

                                    <Col className='mt-1'>
                                        <Link to={'/'} style={{ textDecoration: 'none' }} className='text-dark me-5' ><h5><i class="fa-solid fa-house p-1  "></i>Home</h5></Link>
                                        <Row>
                                            <Col className='mt-5 text-center'>
                                                <Button onClick={(e)=>logout(e)} className='bg-danger text-white w-100 border-white'>LogOut</Button>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>


                            </Offcanvas.Body>
                        </Navbar.Offcanvas>

                    </Container>
                </Navbar>
            ))}

        </div>
    )
}

export default Header