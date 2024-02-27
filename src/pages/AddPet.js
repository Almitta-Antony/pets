import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import { addPetApi } from '../service/allApi';
import AddedetCard from '../components/AddedetCard';
import { addResponseContext } from '../service/ContextShare';

function AddPet() {

  const{addUpdate,setAddUpdate}=useContext(addResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState('')

  const [petInputs, setPetInputs] = useState({
    breed: "", age: "", category: "", price: "", description: "", petImage: ""
  })


  const setInputs = (e) => {
    const { value, name } = e.target
    setPetInputs({ ...petInputs, [name]: value })
  }

  
  const handleAdd = async (e) => {
    e.preventDefault()
    const { breed, age, category, price, description, petImage } = petInputs
    if (!breed || !age || !category || !price || !description || !petImage) {
      alert("please fill all the input fields")
    }
    else {
      //header
      const headerConfig = {
        "Content-Type": "multipart/form-data",
        "access_token": `Bearer ${token}`
      }

      //body
      const reqBody=new FormData()
      reqBody.append("breed",breed)
      reqBody.append("age",age)
      reqBody.append("category",category)
      reqBody.append("description",description)
      reqBody.append("price",price)
      reqBody.append("petImage",petImage)

      const result = await addPetApi(reqBody,headerConfig)
      console.log(result);
      if(result && result.status === 200){
        //change context state
        setAddUpdate(result.data)
        alert(`${result.data.category} added!`)
        //reset form data
        setPetInputs({...petInputs, breed: "", age: "", category: "", price: "", description: "", petImage: ""})
        handleClose()
       
      }
      else{
        alert(result.response.data)
      }
      
    }


  }


  useEffect(() => {
    if (petInputs.petImage) {
      setPreview(URL.createObjectURL(petInputs.petImage))
    }
    else{
      setPreview("")
    }
  }, [petInputs.petImage])

  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
    else {
      setToken("")
    }
  }, [])
  console.log(token);
  console.log(petInputs);


  return (
    <div className='mt-5 '>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h1 className='text-center'>SELL PETS</h1>
            <Row>
              <Col>
                <div className='text-center mt-5'>
                  <Button variant="danger" onClick={handleShow} className='text-center'>
                    SELL PETS
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <AddedetCard></AddedetCard>
      




      <Modal show={show} onHide={handleClose} className='bg-transparent'>
        <Modal.Header className='border-0 ' closeButton>
          <Modal.Title >ADD DETAILS OF THE PET</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <Container>
            <Row>
              <Col lg={7}>
                <label htmlFor="img1" >

                  <input onChange={(e) => setPetInputs({ ...petInputs, ["petImage"]: e.target.files[0] })} type="file" name="" id="img1" style={{ display: 'none' }} />
                  <img src={preview ? preview : "https://i.postimg.cc/BQgSYLFL/dog-icon-add-sign-labrador-260nw-1387152242.png"} 
                  className='100 me-5 mb-3' alt="" 
                  style={{ height: '250px' }} />

                </label>

              </Col>
              <Col lg={5}>
                <input type="text" onChange={(e) => setInputs(e)} name="breed" id="" className='border-0 form-control' placeholder='Pet Breed' />
                <hr />
                <Row>
                  <Col>
                    <input type="text" onChange={(e) => setInputs(e)} name="age" id="" className='border-0 form-control' placeholder='Pet Age' />
                    <hr />
                    <Row>
                      <Col>
                        <input type="text" onChange={(e) => setInputs(e)} name="category" id="" className='border-0 form-control' placeholder='category' />
                        <hr />
                        <Row>
                          <Col>
                            <input type="text" onChange={(e) => setInputs(e)} name="price" id="" className='border-0 form-control' placeholder='price' />
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

                  <textarea type="text" onChange={(e) => setInputs(e)} name="description" id="" className='border-0 form-control' placeholder='Description' />
                  <hr />
                </Col>
              </Row>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer className='border-0 '>

          <Button variant="primary" onClick={(e) => handleAdd(e)}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddPet