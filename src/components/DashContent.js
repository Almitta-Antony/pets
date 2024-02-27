import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { addResponseContext, addcartResponseContext } from '../service/ContextShare'
import { allPetsApi } from '../service/allApi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../service/baseUrl';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartBuy from './CartBuy';


function DashContent() {

    const {addCart}=useContext(addcartResponseContext)

    const [searchData, setSearchData] = useState("")
    const [radioData,setRadioData]=useState([])


    const [uname, setUname] = useState("")
    const [allPets, setAllPets] = useState([])
    const navigate = useNavigate()

    const getAllPets = async () => {

        const response = await allPetsApi(searchData)
        setAllPets(response.data)
    }


    useEffect(() => {
        getAllPets()

        if (localStorage.getItem("currentUser")) {
            setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
        }
        else {
            toast("Please Login !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/')
        }
    }, [searchData])


    console.log(allPets);
    console.log(searchData);


    return (
        <div className='d1'>
            <Row>
                <Col lg={6}>
                
                </Col>
                
                <Col lg={6}>
                <div className='text-end'>
                    <Form inline>
                        <Row>
                           
                               
                               
                                    <Col lg={12} xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search by BREED"
                                            className=" mr-sm-2"
                                            onChange={(e) => setSearchData(e.target.value)}
                                        />
                                    </Col>
                          

                        </Row>
                    </Form>
                    </div>
                </Col>
                  
                
            </Row>
            <div className='mt-5'>







            </div>
            <h1 className='text-center mt-5'>BUY YOUR PET</h1>
            <div className='filter w-50  container text-center border p-2 mb-3' >
                
                <Container className='w-25 container' >
                    <Row >
                        <Col lg={4} >
                        <input type="radio" checked={radioData== "all"} onChange={(e)=>setRadioData(e.target.value)} value="all"/>
                       <label htmlFor=""><b>ALL</b></label>
                     
                        </Col>
                        <Col lg={4} >
                        <input type="radio" checked={radioData== "dog"} onChange={(e)=>setRadioData(e.target.value)} value="dog" />
                       <label htmlFor=""><b>DOGS</b></label>
                       
                        </Col>
                        <Col lg={4}>
                        <input type="radio" checked={radioData== "cat"} onChange={(e)=>setRadioData(e.target.value)} value="cat" />
                       <label htmlFor=""><b>CATS</b></label>
                        </Col>
                    </Row>
                </Container>
            </div>
            
     
            <Container className='d-flex add'>

                <div className='container p-5 my-5'>
                    <Row className=''>
                        {allPets&&
                            allPets
                            .filter((i)=>{
                                if(radioData==="dog"){
                                    return i.category===radioData
                                }
                                else if(radioData==="cat"){
                                    return i.category===radioData
                                }
                                else{
                                    return i
                                }
                        })
                        
                            
                            
                            
                            .map(i => (


                                <Col key={i._id} lg={4} sm={12} xs={12} md={12} className=''>
                                    <Card style={{ width: '22rem' }} className='mb-2'>
                                        <Card.Img variant="top" src={i ? `${BASE_URL}/uploads/${i.petImage}` : "https://i.postimg.cc/76pJ1S46/dogs.jpg"} style={{ height: '280px' }} />
                                        <Card.Body>
                                            <Card.Title>SELLER ID:{i.userId}</Card.Title>
                                            <Card.Text>
                                                <img src={i.petImage} alt="" />
                                                <h6>CATEGORY:{i.category}</h6>
                                                <h6>BREED:{i?.breed}</h6>
                                                <h6>AGE:{i?.age}</h6>
                                                <h6>PRICE:{i?.price}</h6>
                                                <h6>DESCRIPTION:{i?.description}</h6>
                                            </Card.Text>
                                            <Row>

                                                <Col lg={12}> 
                                                {/* <Link to={'/cart'}><p project={i}>CART</p></Link> */}
                                               <CartBuy  project={i}></CartBuy>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>


                            ))
                        }
                    </Row>
                </div>

            </Container>       
            <ToastContainer />
             </div>
    )
}

export default DashContent