import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// register
export const registerApi=async(body)=>{
   return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
}


//login
export const loginApi=async(body)=>{
   return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}

//update profile
export const updateProfile=async(body,headers,id)=>{
   return await commonApi('PUT',`${BASE_URL}/user/update-profile/${id}`,body,headers)
}

//getprofile
export const getProfileApi=async(id,headers)=>{
   return await commonApi('GET',`${BASE_URL}/user/getprofile/${id}`,{},headers)
}

//addpet
export const addPetApi=async(body,headers)=>{
   return await commonApi('POST',`${BASE_URL}/user/add-pet`,body,headers)
}

//getuserpets
export const userPetsApi=async(headers,id)=>{
   return await commonApi('GET',`${BASE_URL}/user/get-user-pets/${id}`,"",headers)
}

//getAllpets
export const allPetsApi=async(searchData)=>{
   return await commonApi('GET',`${BASE_URL}/user/get-all-pets?search=${searchData}`,"","")
}

//getAllpetsImages
export const homePetsImagesApi=async()=>{
   return await commonApi('GET',`${BASE_URL}/user/get-home-pets`,"","")
}

//update pet details
export const updatePetApi=async(body,headers,id)=>{
   return await commonApi('PUT',`${BASE_URL}/user/edit-pets/${id}`,body,headers)
}

//delete pet details
export const deletePetApi=async(headers,id)=>{
   return await commonApi('DELETE',`${BASE_URL}/user/delete-pets/${id}`,{},headers)
}