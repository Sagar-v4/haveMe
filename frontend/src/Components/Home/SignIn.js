import React from "react";
import {Button, Col, Form, NavLink, Row} from "react-bootstrap";
import Axios from "axios";

export default function SignIn(props) {

    const register = () => {
        Axios({
            method: "POST",
            data: {
                name: props.name,
                email: props.email,
                password: props.password
            },
            withCredentials: true,
            url: "http://localhost:5000/local/register",
        }).then((res) => console.log(res));
    };

    return (

            <Form>

                <Form.Group className="mb-3" controlId="formBasicFirstNameSignUp">
                    <Form.Control type="text" value={props.name} onChange={(e)=>props.setName(e.target.value)} placeholder="Enter name*" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmailSignUp">
                    <Form.Control type="email" value={props.email} onChange={(e)=>props.setEmail(e.target.value)} placeholder="Enter email*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordSignUp">
                    <Form.Control type="password" value={props.password} onChange={(e)=>props.setPassword(e.target.value)} placeholder="Enter password*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPasswordSignUp">
                    <Form.Control type="password" value={props.confirmPassword} onChange={(e)=>props.setConfirmPassword(e.target.value)} placeholder="Enter confirm password*" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckboxSignUp">
                    <Form.Check type="checkbox" checked={props.acceptedTerms} onChange={(e)=>props.setAcceptedTerms(e.target.checked)} className={"d-inline-block"} label="I agree the" />
                    <NavLink href="#" className="link-primary px-1 d-inline-block text-decoration-none">Privacy policy</NavLink>and
                    <NavLink href="#" className="link-primary px-1 d-inline-block text-decoration-none">Terms and Conditions</NavLink>
                </Form.Group>

                <Row>
                    <Col>
                        <Button onClick={register} variant="primary" type="submit">
                            Signup
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