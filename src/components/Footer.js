import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
       
        <div className='footer mt-5' >
             <br /> <br />
            <div>
                <Container>
             
                    <Row>
                        <hr />
                        <Col className='text-center' lg={12} xs={12} sm={12} md={12}>
                            <i style={{ cursor: 'pointer' }} class="fa-brands fa-instagram mt-3 text-dark" ></i>
                            <i style={{ cursor: 'pointer' }} class="fa-brands fa-twitter mt-3 ms-3 text-dark" ></i>
                            <i style={{ cursor: 'pointer' }} class="fa-solid fa-envelope mt-3 ms-3 text-dark" ></i>
                            <i style={{ cursor: 'pointer' }} class="fa-brands fa-github mt-3 ms-3 text-dark"  ></i>
                            <i style={{ cursor: 'pointer' }} class="fa-brands fa-linkedin mt-3 ms-3 text-dark"></i>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Footer