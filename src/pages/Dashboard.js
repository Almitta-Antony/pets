import React from 'react'
import Header from '../components/Header'
import DashContent from '../components/DashContent'
import { Col, Container, Row } from 'react-bootstrap'

function Dashboard({admin}) {
  return (
    <div>
      <Header></Header>
<Container className='d-flex'>
    
    <Row> <Col>  <DashContent></DashContent>
    </Col></Row>
  
</Container>  
    </div>
  )
}

export default Dashboard