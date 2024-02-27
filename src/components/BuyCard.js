import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addcartResponseContext } from '../service/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BuyCard({p}) {

  const {setAddCart}=useContext(addcartResponseContext)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePay=()=>{
    toast("Payment Successful", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      handleClose()

  }
  return (
    <div>
      <div>
        <Button variant="warning" onClick={handleShow} className='w-75'><i class="fa-regular fa-solid fa-money-check-dollar me-2"></i>BUY</Button></div>
  
      
  
        <Modal show={show} onHide={handleClose} className='bg-dark'>
          <Modal.Header className='border-0' closeButton>
            <Modal.Title>PURCHASE PAYMENT DETAILS</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
            <Col lg={12}>
              <h6 className='text-success'>PAYMENT TO SELLER ID: {p.userId}</h6>
         <br />
         <i class="fa-solid fa-user ms-3"></i><br />
                <input type="text"  name="" id="" className='border-0 form-control' placeholder='FULL NAME' />
                <hr />
                <Row>
                  <Col>
                  <i class="fa-regular fa-credit-card ms-3"></i><br />
                    <input type="text" name="" id="" className='border-0 form-control' placeholder='AC No.' />
                    <hr />
                    <Row>
                      <Col><i class="fa-solid fa-building-columns ms-3"></i><br />
                        <input type="text" name=""  id="" className='border-0 form-control' placeholder='IFSC CODE' />
                        <hr />
                        <Row>
                          <Col>
                          <i class="fa-solid fa-credit-card ms-3"></i> <br />
                          <input type="text"name=""  id="" className='border-0 form-control' placeholder='UPI ID' />
                            <hr />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

              </Col>


            </Row>
          </Modal.Body>
          <Modal.Footer className='border-0'>
         <div className='text-center w-100 '>
              
              <Button variant="success" className='w-25' onClick={handlePay}>
              <i class="fa-brands fa-paypal"></i> PAY Rs.{p.price}
              </Button>
         </div>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
    </div>
  )
}

export default BuyCard