import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userPetsApi } from '../service/allApi';
import { addResponseContext, deleteResponseContext, editResponseContext } from '../service/ContextShare';
import PetCardDisplay from '../components/PetCradDisplay'



function AddedetCard() {
    const{addUpdate,setAddUpdate}=useContext(addResponseContext)
const {editUpdate}=useContext(editResponseContext)

const {deleteUpdate} = useContext(deleteResponseContext)


    const [userPets, setUserPets] = useState([])

    const getUserPets = async () => {
        //header -token
        if (localStorage.getItem("currentUserID")) {
            const id = (localStorage.getItem("currentUserID"))
            console.log(id);

            // header creation
            const token = localStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "access_token": `Bearer ${token}`
            }
            // console.log(reqHeader);
            const result = await userPetsApi(reqHeader, id)
            console.log(result);

            //id
            if (result.status == 200) {
                setUserPets(result.data)
            }
        }
    }
    useEffect(() => {
        getUserPets()
    }, [addUpdate,editUpdate,deleteUpdate])
    return (
        <div className=''>
            <Container className='pcard container w-75 mt-5 border' >
                <div className='mt-5'>

                    <h4 className='text-center mt-5 '>YOUR ADDED PETS</h4>
                </div>
             
                
                 <Container>
                 <div className='container p-5 my-5'>
                            <Row>
                            <Container className=" ">
                                        <Row>
                                {userPets?.length > 0 ?
                                    userPets?.map(i => (
<Col>
                                            <PetCardDisplay project={i}></PetCardDisplay>
    
</Col>                                    )) :

                                    <p className="text-danger mt-5">no pets added !</p>
                
                
                                }
                                    </Row>
                                    </Container>
                            </Row>
                            
               </div >
                 </Container>
               

                <div className='text-center mt-3'>
                    <Link to={'/dashboard'}>
                        <Button className='btn bg-white border-dark text-dark mb-5'>GO BACK HOME</Button>

                    </Link>
                </div>
            </Container>

        </div>
    )
}

export default AddedetCard