import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {

    const navigate = useNavigate()
    //state to store data from input
    const [user, setUser] = useState({
        userName: "", email: "", password: ""
    })

    const [unameValid, setUnameValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [pswValid, setPswValid] = useState(false)


    const setInputs = (e) => {
        const { name, value } = e.target
        if (name == 'userName') {
            if (value.match(/^[a-zA-Z ]+$/)) {
                setUnameValid(false)
            }
            else {
                setUnameValid(true)
            }
        }

        if (name == 'email') {
            if (value.match(/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/)) {
                setEmailValid(false)
            }
            else {
                setEmailValid(true)
            }
        }

        if (name == 'password') {
            if (value.match(/^([a-zA-Z0-9]{4,8})$/)) {
                setPswValid(false)
            }
            else {
                setPswValid(true)
            }
        }
        setUser({ ...user, [name]: value })

    }
    console.log(user);

    const handleRegister = async (e) => {
        e.preventDefault()
        const { userName, email, password } = user
        if (!userName || !email || !password) {
            toast('please fill all the input fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        else {
            const result = await registerApi(user)
            console.log(result.data);
            if (result.status == 200) {
                toast(`${result.data.userName} , your account created successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                setUser({
                    userName: "", email: "", password: ""
                })
                navigate('/login')
            }
            else {
                alert(result.response.data)
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (!email || !password) {
            toast("please fill all the input fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        else {
            const result = await loginApi(user)
            // console.log(result.data.user.userName);
            if (result.status == 200) {
                //token
                //store user datas in localstorage
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("currentUser", JSON.stringify(result.data.user));
                localStorage.setItem("currentUserID", result.data.user._id);

                toast("Login Successful", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUser({
                    email: "", password: ""
                })
                navigate('/dashboard')
            }
            else {
                alert(result.response.data)
            }
        }
    }



    const isRegisterForm = register ? true : false


    return (
        <div className='bi fluid'>
            <Container className='di mt-5 w-50 border-dark'>
                <h1 className='text-center text-white'>
                    {isRegisterForm ? "SIGN UP" : "SIGN IN"}
                </h1>


                {isRegisterForm &&
                    <>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3 mt-5"
                        >
                            <Form.Control value={user.userName} type="text" placeholder="name@example.com" onChange={(e) => setInputs(e)} name='userName' />
                        </FloatingLabel>
                        {unameValid &&
                            <p className='text-danger'>Include characters only</p>
                        }
                    </>

                }
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control value={user.email} type="email" placeholder="name@example.com" onChange={(e) => setInputs(e)} name='email' />
                </FloatingLabel>
                {emailValid &&
                    <p>shoud not include space </p>
                }
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"

                >
                    <Form.Control value={user.password} type="password" placeholder="Password" onChange={(e) => setInputs(e)}
                        name='password' />
                </FloatingLabel>
                {pswValid && <p><i class="fa-solid fa- fa-circle-info"></i>password must be 4-8 </p>
                }
                <div className='text-center mt-5 '>
                    {isRegisterForm ?
                        <Button onClick={(e) => handleRegister(e)} style={{ textDecoration: 'none' }} to={'/login'} className='bg-dark border-0' >Register</Button> :
                        <Button onClick={(e) => handleLogin(e)} style={{ textDecoration: 'none' }} className='btn text-light  bg-dark border-0' >Login</Button>

                    }
                </div>

                <div className='text-center mt-5 border-black ' style={{ textDecoration: 'none' }}>
                    {isRegisterForm ?
                        <p>Already Have an Account ?
                            <Link to={'/login'} className='border-black ' style={{ textDecoration: 'none' }}>  Login </Link>     </p>
                        :
                        <p>New User ?
                            <Link to={'/register'} className='border-black ' style={{ textDecoration: 'none' }}>Create an Account</Link> </p>
                    }
                </div>

            </Container>
            <ToastContainer />
        </div>
    )
}

export default Auth