import React from "react";
import {Container, Navbar} from "react-bootstrap";

export default function Footer() {

    return(
        <>
            <Navbar fixed="bottom"  bg="dark" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand href="#home" cassName="text-center">
                        haveMe &copy;Copyright 2022 - All Rights Reserved
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};