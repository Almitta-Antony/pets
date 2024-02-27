import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BASE_URL } from '../service/baseUrl'

function PetImage({project}) {
  return (
    <div> 
        <Container className='d-flex my-5 py-2'>
            
    <Row>
        
                <Col lg={4} xs={12} sm={12} md={6}>


                    <img src={project?`${BASE_URL}/uploads/${project.petImage}`:"https://i.postimg.cc/76pJ1S46/dogs.jpg"} style={{height:'250px'}} alt="" className='petgalleryimages d-flex' />

                </Col>
         
    </Row>
</Container></div>
  )
}

export default PetImage
