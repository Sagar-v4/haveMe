import React, {useState} from "react";
import {Button, Container, Modal, Nav, Navbar, Tab, Tabs} from "react-bootstrap";
import {DoorOpenFill} from 'react-bootstrap-icons';
import SignIn from "./SignIn";
import LogIn from "./LogIn";
import SocialMediaSignIn from "./SocialMediaSignIn";

export default function Header(props) {

    const [key, setKey] = useState("login");

    // Login
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Signup
    const [name, setName] = useState("");
    const [emailSignup, setEmailSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const [confirmPasswordSignup, setConfirmPasswordSignup] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return(
        <>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">haveMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Nav className="me-0">
                            <Button variant="primary" onClick={props.handleShow}>
                                <DoorOpenFill className="me-2"></DoorOpenFill>
                                Sign In
                            </Button>
                        </Nav>
                </Container>
            </Navbar>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Body className={"row"} >
                    <Container className={""}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 nav-fill"
                        >
                            <Tab eventKey="login" title="Login" >
                                <LogIn
                                    email={emailLogin}
                                    setEmail={setEmailLogin}
                                    password={passwordLogin}
                                    setPassword={setPasswordLogin}
                                    rememberMe={rememberMe}
                                    setRememberMe={setRememberMe}
                                    handleClose={props.handleClose}/>
                            </Tab>
                            <Tab eventKey="signup" className="" title="Signup">
                                <SignIn
                                    email={emailSignup}
                                    setEmail={setEmailSignup}
                                    name={name}
                                    setName={setName}
                                    password={passwordSignup}
                                    setPassword={setPasswordSignup}
                                    confirmPassword={confirmPasswordSignup}
                                    setConfirmPassword={setConfirmPasswordSignup}
                                    acceptedTerms={acceptedTerms}
                                    setAcceptedTerms={setAcceptedTerms}
                                    handleClose={props.handleClose}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </Modal.Body>

                <Modal.Footer className="justify-content-center">
                    <SocialMediaSignIn/>
                </Modal.Footer>

            </Modal>
        </>
    );
};