import { Tabs } from 'antd';
import React from 'react';
import Login from "../components/Login";
import Signup from "../components/Signup";
const { TabPane } = Tabs;

export default function Home() {

    return (
        <div style={{
            width: "500px",
            position: "absolute",
            border: "1px solid gray",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            marginInline: "auto"
        }}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Login" key="1">
                    <Login/>
                </TabPane>
                <TabPane tab="Signup" key="2">
                    <Signup/>
                </TabPane>
            </Tabs>
        </div>
    )
};