import React from "react";
import {Button, Col, Form, Row, NavLink} from "react-bootstrap";
import Axios from "axios";

export default function LogIn(props) {

    const login = () => {
        Axios({
            method: "POST",
            data: {
                email: props.email,
                password: props.password
            },
            withCredentials: true,
            url: "http://localhost:5000/auth/local/login",
        }).then((res) => console.log(res));
    };
    return (
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmailLogIn">
                    {/*<Form.Label>Email address</Form.Label>*/}
                    <Form.Control type="email" value={props.email} onChange={(e)=>props.setEmail(e.target.value)} placeholder="Enter email*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordLogIn">
                    {/*<Form.Label className="">Password</Form.Label>*/}
                    <Form.Control type="password" value={props.password} onChange={(e)=>props.setPassword(e.target.value)} placeholder="Enter password*" required/>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxLogIn">
                            <Form.Check type="switch" checked={(props.rememberMe)} onChange={(e)=>props.setRememberMe(e.target.checked)} id="rememberMe" label="Remember me" />
                        </Form.Group>
                    </Col>
                    <Col className="text-end">
                        <NavLink href="https://www.google.com" className="link-primary pt-0">Forgot Password ?</NavLink>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={login} variant="primary" type="submit">
                            Login
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Form>
    );
};