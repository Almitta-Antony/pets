import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { homePetsImagesApi } from '../service/allApi';
import PetImage from '../components/PetImage';




function Home() {
    const [isLoggedIn, setLoggedIn] = useState(false)

    const [homePets, setHomePets] = useState([])

    const getHomePets = async () => {

        const response = await homePetsImagesApi()
        setHomePets(response.data)
    }

    useEffect(() => {
        getHomePets()
        if (localStorage.getItem("currentUserID")) {
            setLoggedIn(true)
        }
    }, [])

    console.log(homePets);
    // console.log(isLoggedIn);

    return (
        <div className=''>

            <Row>
                <Col>
                    <div className='div1 fluid '>
                        <Carousel fade>
                          
                            <Carousel.Item>
                                
                                <img
                                    className="d-block w-100"
                                    src="https://i.postimg.cc/7YsSZb6K/gulyas-bianka-3-WOh54zn-PGU-unsplash-1.webp"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                <h1 className='h23'>PET SHOP</h1>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    <Link to={'/login'}>Get to know More Click Here</Link>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://i.postimg.cc/tTd4xJPr/Adobe-Stock-84016419.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                <h1 className='h23'>PET SHOP</h1>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <Link to={'/login'}>Get to know More Click Here</Link>

                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://i.postimg.cc/Ssr99Ky1/bdjk.webp"
                                    style={
                                        {
                                            height: "800px"
                                        }
                                    }
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                <h1 className='h23'>PET SHOP</h1>

                                    {isLoggedIn ?
                                        <Link to={'/dashboard'}>YOUR ACCOUNT</Link> :
                                        <Link to={'/login'}>Get to know More Click Here</Link>}

                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>

                    </div>
                </Col>
            </Row>



            <div className='secondmain '>
                <Row>

                    <Col lg={6}>
                        <Container id="dogcon1" className='dogcon w-50 container border-black mt-3 mb-2 bg-white'>

                            <Row>
                                <Col >
                                    <div>
                                        <Row >
                                            <Col>

                                                <h1  className='text-center'>
                                                      DOGS</h1>
                                                <Row>
                                                    <Col>
                                                        <p>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam maiores, et omnis veritatis non tempore, autem, dolor nostrum ipsa ex eius esse placeat. Vitae laudantium adipisci praesentium corrupti, ratione consectetur.
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </Container>
                    </Col>





                    <Col lg={6}>
                        <Container id="dogcon2" className='dogcon w-50 container border-black mb-2 mt-3 bg-white'>
                            <Row>

                                <Col >
                                    <div >
                                        <Row >
                                            <Col >

                                                <h1  className='text-center'>CATS</h1>
                                                <Row>
                                                    <Col>
                                                        <p>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam maiores, et omnis veritatis non tempore, autem, dolor nostrum ipsa ex eius esse placeat. Vitae laudantium adipisci praesentium corrupti, ratione consectetur.
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </Container>


                    </Col>



                  
                </Row>




            </div>

            <div className='thirddiv '>

                <Container className='w-75 mt-5'>
                    <Row>
                        <Col lg={6}>
                            <img src="https://i.postimg.cc/76pJ1S46/dogs.jpg"
                                style={{ height: '500px' }}
                                className='w-100 mt-5 mb-5' alt="" />
                        </Col>
                        <Col lg={6} className='mt-5 '>
                            <h1>  Why Choose Us?</h1>
                            <Row className='mt-5'>
                                <Col lg={6} xs={6}>

                                    <h4><i class="fa-solid fa-plus"></i>SELL PETS</h4>
                                    <p>Far far away, behind the word mountains, far from the countries.</p>
                                </Col>
                                <Col lg={6} xs={6}>
                                    <h4>
                                    <i class="fa-solid fa-cart-shopping"></i> BUY PETS</h4>
                                    <p>Far far away, behind the word mountains, far from the countries</p>

                                </Col>
                                <Row className='mt-5'>
                                    <Col lg={12} xs={12}>
                                        <h4><i class="fa-solid fa-filter"></i>FILTER PETS</h4><p>Far far away, behind the word mountains, far from the countries.</p>
                                    </Col>
                                    
                                </Row>
                            </Row>
                        </Col>
                    </Row>

                </Container>

            </div>


<Container className='petgallery d-flex border mt-5'>
    
                <div className='m-1 py-1'>
                <Row>
                <Col>
                <h4 className='text-center'>Pet Gallery</h4>
                </Col>
            </Row>
                  <Row>
                        {homePets?.length > 0 ?
                            homePets.map(i => (
                               <Col lg={4} xs={12} sm={12} md={6} className=''> 
                                <PetImage project={i}></PetImage>
                                </Col>
                            ))
                            :
                            <p>no pet images</p>
                        }
                  </Row>
                </div>
    
</Container>



        </div>

    )
}

export default Home