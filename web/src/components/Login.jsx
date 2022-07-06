import {Button, Checkbox, Form, Input, message} from 'antd';
import React, {useState} from 'react';
import axios from "axios";

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

export default function Login() {

    const handleClick = async (e) => {

        try {
            const res = await axios.post("https://haveme-api.herokuapp.com/api/auth/login/", {
                email: e.email,
                password: e.password
            });
            window.location.reload();
            message.success('Login successful!');
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
            message.error(err.message);
        }

    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo.message).then(r => {});
    };

    return (
        <>
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
                    <Input/>
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
                    <Input.Password/>
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
        </>
    );
};
