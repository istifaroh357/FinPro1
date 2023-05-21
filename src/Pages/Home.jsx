import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Navbarr from '../Components/Navbarr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Banner from '../Components/Banner';



const Home = () => {
    const [token, setToken] = useState('');
    localStorage.setItem('token', JSON.stringify(token));
    const [name, setName] = useState('');
    localStorage.setItem('name', JSON.stringify(name));

    const [nameRegister, setNameRegister] = useState('');
    localStorage.setItem('nameRegister', JSON.stringify(nameRegister));
    const [messageRegister, setMessageRegister] = useState('');
    localStorage.setItem('messageRegister', JSON.stringify(messageRegister));

    // Modal, UseState Sign in & Sign Out 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const isLogin = JSON.parse(localStorage.getItem('token'));

    // Form for Sign In with formik
    const formikSignIn = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address').required('Required'),

            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .max(10, 'Must be 10 characters or less')
                .required('Required')
        }),
        onSubmit: values => {
            const email = values.email;
            const password = values.password;
            // console.log(values)
            // alert(JSON.stringify(values, null, 2));
            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", {
                email: email,
                password: password
            },
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
                    }
                }
            )
                .then(function (response) {
                    // console.log(response)
                    setName(response.data.data.name)
                    setToken(response.data.token)
                    
                })
                .catch(err => console.log(err))
        }
    })

    // Form for Sign Up with formik
    const formikSignUp = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            role: '',
            profilePictureUrl: "",
            phoneNumber: ''
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),

            email: Yup.string()
                .email('Invalid email address').required('Required'),

            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .max(10, 'Must be 10 characters or less')
                .required('Required')
        }),

        onSubmit: values => {
            const email = values.email;
            const name = values.name;
            const password = values.password;
            const passwordRepeat = values.passwordRepeat;
            const role = values.role;
            const profilePictureUrl = values.profilePictureUrl;
            const phoneNumber = values.phoneNumber;

            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
                {
                    email: email,
                    name: name,
                    password: password,
                    passwordRepeat: passwordRepeat,
                    role: role,
                    profilePictureUrl: profilePictureUrl,
                    phoneNumber: phoneNumber
                },

                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
                    }
                })
                .then(function (response) {
                    setNameRegister(response.data.data.name)
                    setMessageRegister(response.data.message)
                    alert(JSON.stringify(nameRegister, messageRegister));
                })
                .catch(err => console.log(err));
                alert(JSON.stringify());
        }
    })

    return (
        <>
            <Navbarr userName={JSON.parse(localStorage.getItem('name'))} userNameRegister={JSON.parse(localStorage.getItem('nameRegister'))} />
            <Banner />
            <div className='beranda'>
                <div className='beranda-text'>
                    <h1>Welcome to Travel Addict, {JSON.parse(localStorage.getItem('name'))}</h1>
                    <p>Share and get traveling experience story here, and Promo about Traveling </p>
                    <p>Start share and enjoy experience now</p>
                    {isLogin? '' : <div className='signIn-Up'>
                            <Button variant='primary' onClick={handleShow}>Sign In Now</Button>
                            <p>Did You haven't account yet? Please regist first</p>
                            <Button variant="primary" onClick={handleShow2}>Sign Up Now</Button>
                            </div> }
                        
                    
                    {/*Modal Content Sign In formik */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sign In to your account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* onSubmit={formikSignIn.handleSubmit} tadi saya hapus dulu untuk ditempatkan di klik button */}
                            <form onSubmit={formikSignIn.handleSubmit}>
                                <br />
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="emailLogin"
                                    name="email"
                                    type="email"
                                    onChange={formikSignIn.handleChange}
                                    value={formikSignIn.values.email}
                                />

                                {formikSignIn.touched.email && formikSignIn.errors.email ? (
                                    <div>{formikSignIn.errors.email}</div>
                                ) : null}

                                <br /> <br />
                                <label htmlFor="password">Password</label>
                                <input
                                    id="passwordLogin"
                                    name="password"
                                    type="password"
                                    onChange={formikSignIn.handleChange}
                                    value={formikSignIn.values.password}
                                />

                                {formikSignIn.touched.password && formikSignIn.errors.password ? (
                                    <div>{formikSignIn.errors.password}</div>
                                ) : null}
                                <Button variant="primary" type='submit' onClick={handleClose} >
                                    Submit
                                </Button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal content Sign Up Form */}
                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Please fill this form to create your account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={formikSignUp.handleSubmit}>

                                <label htmlFor="name">User Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.name}
                                />
                                {formikSignUp.touched.name && formikSignUp.errors.name ? (
                                    <div>{formikSignUp.errors.name}</div> // kasih className untuk atur tampilan erorr
                                ) : null}

                                <br /><br />
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.email}
                                />
                                {formikSignUp.touched.email && formikSignUp.errors.email ? (
                                    <div>{formikSignUp.errors.email}</div>
                                ) : null}


                                <br /><br />
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.password}
                                />
                                {formikSignUp.touched.password && formikSignUp.errors.password ? (
                                    <div>{formikSignUp.errors.password}</div>
                                ) : null}

                                <br /><br />
                                <label htmlFor="passwordRepeat">Password Repeat</label> <br />
                                <input
                                    id="passwordRepeat"
                                    name="passwordRepeat"
                                    type="password"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.passwordRepeat}
                                />

                                <br /><br />
                                <label htmlFor="role">Role</label>
                                <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.role}
                                />

                                <br /><br />
                                <label htmlFor="profilePictureUrl">Profil Picture URL</label>
                                <input
                                    id="profilePictureUrl"
                                    name="profilePictureUrl"
                                    type="text"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.profilePictureUrl}
                                />

                                <br /><br />
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    onChange={formikSignUp.handleChange}
                                    value={formikSignUp.values.phoneNumber}
                                />

                                <br /><br />
                                <Button variant="primary" type='submit' onClick={handleClose2}>
                                    Submit
                                </Button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default Home
