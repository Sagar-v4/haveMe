import { Button, Checkbox, Form, Input } from 'antd';
import React, {useContext, useState} from 'react';
import {loginCall} from "../apiCalls"
import {AuthContext} from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// useNavigate();
import {Redirect, Route} from "react-router-dom";
import App from "../App";
import Event from "../pages/Event";
import Home from "../pages/Home";
import axios from "axios";


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Login(props) {

    // const { user, isFetching, error, dispatch} = useContext(AuthContext);

    const [user, setUser] = useState(null);
    // const login = async () => {
    //     const res = await axios.get(process.env.API_URL + "api/auth/login/", {email: e.email, password: e.password});
    //     setUser(res.data);
    // };

    const handleClick = async (e) => {

        // loginCall({email: e.email, password: e.password}, dispatch).then(r => {<Redirect to={"/event"}/>});

        const res = await axios.post(process.env.API_URL + "api/auth/login/", {email: e.email, password: e.password});
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        // <Route to={"/"}></Route>;
        window.location.reload();
        // return <Redirect to="/event" />
        // login().then(r => console.log(r));

            // alert(user._id);
            // localStorage.setItem("user", JSON.stringify(res.data));

            // const user = localStorage.getItem("user");
            // console.log("id", user);
        // render() {
        //     return(
        //         <Redirect to={"/event"}/>
        //     )}

        // window.location.reload();

    };

    // console.log("user prop", props.user);
    console.log("user", user);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        {/*{ user ? <Redirect to={"/event"}/> : <Home />}*/}
        <Form
            name="login"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={handleClick}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 6,
                        message: 'Password should be least 6!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"{...tailFormItemLayout}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>

            {/*{ !user ? <Redirect to={"/"}/> : <Redirect to={"/event"}/> }*/}
        </>
    );
};
