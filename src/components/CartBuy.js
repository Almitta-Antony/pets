import React from 'react'
import BuyCard from './BuyCard'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../service/baseUrl';

function CartBuy({ project }) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>


      <Button variant="warning" className='w-100' onClick={handleShow}><i class="fa-solid fa-cart-shopping me-2"></i>ADD TO CART</Button>



      <Modal show={show} onHide={handleClose} className='bg-dark'>
        <Modal.Header className='border-0' closeButton>
          <Modal.Title ><h1 className='text-center'><i class="fa-solid fa-cart-shopping me-2"></i>CART</h1> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <img src={project ? `${BASE_URL}/uploads/${project.petImage}` : "https://i.postimg.cc/76pJ1S46/dogs.jpg"} style={{ height: "280px" }} alt="" className='w-100' />
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg={6}>
              <h6>CATEGORY:{project.category}</h6><br />
              <h6>BREED:{project?.breed}</h6>
              
            </Col>
            <Col lg={6}>
            <h6>AGE:{project?.age}</h6><br />
              <h6>PRICE:{project?.price}</h6>
              
            </Col>
            <Row>
              <Col><br />
              <p>DESCRIPTION:{project?.description}</p>
              <hr />
              </Col>
            </Row>
          </Row>



        </Modal.Body>
        <Modal.Footer className='border-0'>
          <div className='text-center w-100 '>
            <BuyCard p={project}></BuyCard>

          </div>
        </Modal.Footer>
      </Modal>



      {/* <BuyCard></BuyCard> */}
    </div>
  )
}

export default CartBuy