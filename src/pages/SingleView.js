import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'

function SingleView() {
  
  const [uname,setUname]=useState("")
  useEffect(()=>{
if(localStorage.getItem("currentUser")){
  setUname(localStorage.getItem("currentUser"))
}
 },[] )
  return (
    <div>
     

<Profile userName={uname}></Profile>  
    </div>
  )
}

export default SingleView