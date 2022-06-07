import React from "react";
import {Button, Nav} from "react-bootstrap";
import {Facebook, Github, Google} from "react-bootstrap-icons";

export default function SocialMediaSignIn(props) {

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    }
    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    }
    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    }

    return (
        <Nav className="justify-content-center" activeKey="">
            <Nav.Item className={"mx-2"}>
                <Button onClick={google} className={"bg-white border-0 pb-0"}><Google className="text-danger h3"/></Button>
            </Nav.Item>
            <Nav.Item className={"mx-2"}>
                <Button onClick={github} className={"bg-white border-0 pb-0"}><Github className="text-dark h3"/></Button>
            </Nav.Item>
            <Nav.Item className={"mx-2"}>
                <Button onClick={facebook} className={"bg-white border-0 pb-0"} disabled><Facebook className="text-primary h3"/></Button>
            </Nav.Item>
        </Nav>
    );
};