
import React, {useState} from 'react';
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Main from "../Home/Main";

export default function Home(props) {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Header show={show} handleClose={handleClose} handleShow={handleShow} />

            <Main className={"mx-5"}/>

            <Footer />
        </>
    );
}


