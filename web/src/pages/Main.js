import '../App.css';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./Home";
import Event from "./Event";
import Assist from "./Assist";
import Presence from "./Presence";

import {Layout, Menu} from 'antd';
import {CalendarOutlined, HistoryOutlined, ScheduleOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const dotenv = require("dotenv");
dotenv.config();

const items = [
    getItem('Profile', 'profile', <UserOutlined />),
    getItem('History', 'history', <HistoryOutlined />),
    getItem('Event', 'event', <CalendarOutlined />),
    getItem('Assist', 'assist', <ScheduleOutlined />)
];

export default function Main(props) {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
        <Layout
        >
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'sticky',
                left: 0,
                top: 0,
                bottom: 0,
            }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" >haveMe</div>
                <Menu theme="dark" defaultSelectedKeys={['event']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Switch>
                <Route exact={true} path={"/event"}>
                    <Event />
                </Route>
                {/*<Home />*/}
                {/*<Assist/>*/}
                {/*<Presence />*/}
                </Switch>
            </Layout>
        </Layout>
        </Router>
    );
};
