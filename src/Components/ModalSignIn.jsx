import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='beranda-text'>
                <h1>Welcome to Travel Addict, {nameLogin} {nameRegister}</h1>
                <p>Share and get traveling experience story here, and Promo about Traveling </p>
                <p>Start share and enjoy experience now</p>
                <div className='signIn-Up'>
                    <Button variant='primary' onClick={handleShow}>Sign In Now</Button>
                    <p>Did You haven't account yet? Please regist first</p>
                    <button variant="primary" onClick={handleShow2}>Sign Up Now</button>
                </div>
            </div>

            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            {/* Modal content for Sign in Form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In to your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik2.handleSubmit}>
                        <br />
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="emailLogin"
                            name="email"
                            type="email"
                            onChange={formik2.handleChange}
                            value={formik2.values.email}
                        />

                        {formik2.touched.email && formik2.errors.email ? (
                            <div>{formik2.errors.email}</div>
                        ) : null}

                        <br /> <br />
                        <label htmlFor="password">Password</label>
                        <input
                            id="passwordLogin"
                            name="password"
                            type="password"
                            onChange={formik2.handleChange}
                            value={formik2.values.password}
                        />

                        {formik2.touched.password && formik2.errors.password ? (
                            <div>{formik2.errors.password}</div>
                        ) : null}

                        <button type="submit">Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

render(<Example />);