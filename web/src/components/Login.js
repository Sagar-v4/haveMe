import { Button, Checkbox, Form, Input } from 'antd';
import React, {useContext} from 'react';
import {loginCall} from "../apiCalls"
import {AuthContext} from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// useNavigate();
import {Redirect, Route} from "react-router-dom";
import App from "../App";
import Event from "../pages/Event";


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

    const { user, isFetching, error, dispatch} = useContext(AuthContext);
    const handleClick = (e) => {
        // console.log(email.current);
        // console.log('Success:', e);
        // let navigate = useNavigate();

        loginCall({email: e.email, password: e.password}, dispatch);

        if (user) {
            // localStorage.setItem("currentUser", JSON.stringify(user));

            // this.props.setUser(user);
            // window.location.reload();

            // navigate("/event", { replace: true });
            // {<Redirect to={"/event"}/>};
            // const ur = localStorage.getItem("currentUser");
            // console.log("curr-------",ur);
        } else {

        }
        // window.location.reload();

    };

    // console.log("user prop", props.user);
    console.log("user", user);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
    );
};
