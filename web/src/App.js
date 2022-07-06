import './App.css';
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import Assist from "./pages/Assist";
import Presence from "./pages/Presence";

import {Layout, Menu, message} from 'antd';
import {CalendarOutlined, HistoryOutlined, ScheduleOutlined, LogoutOutlined, UserOutlined, DownloadOutlined} from '@ant-design/icons';

const { Sider } = Layout;

export default function App() {

    const [collapsed, setCollapsed] = useState(false);

    const logout = async () => {
        try {
            localStorage.clear();
            message.success('Logout successful!');
        } catch (err) {
            message.error(err.message);
        }
    }

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Router>
            <Switch>
                <Route exact={true} path={"/"}>
                    {user ? <Redirect to={"/event"}/> : <Home/>}
                </Route>
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
                        <div className="logo"><a href={"/"}>haveMe</a></div>
                        <Menu theme="dark" mode="inline">

                            <Menu.Item key={"profile"} icon={<UserOutlined/>}>
                                <a href={"/profile"}>Profile</a>
                            </Menu.Item>
                            <Menu.Item key={"event"} icon={<CalendarOutlined/>}>
                                <a href={"/event"}>Event</a>
                            </Menu.Item>
                            <Menu.Item key={"presence"} icon={<HistoryOutlined/>}>
                                <a href={"/presence"}>Presence</a>
                            </Menu.Item>
                            <Menu.Item key={"assist"} icon={<ScheduleOutlined/>}>
                                <a href={"/assist"}>Assist</a>
                            </Menu.Item>
                            <Menu.Item key={"download"} icon={<DownloadOutlined/>}>
                                <a href={"/download"}>Download</a>
                            </Menu.Item>
                            <Menu.Item key={"logout"} icon={<LogoutOutlined/>}>
                                <a onClick={logout} href={"/"}>Logout</a>
                            </Menu.Item>

                        </Menu>
                    </Sider>

                    <Layout className="site-layout">
                        <Route path={"/profile"}>
                            {user ? <Profile/> : <Redirect to={"/"}/>}
                        </Route>
                        <Route path={"/event"}>
                            {user ? <Event user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                        <Route path={"/presence"}>
                            {user ? <Presence user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                        <Route path={"/assist"}>
                            {user ? <Assist user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                    </Layout>
                </Layout>
            </Switch>

        </Router>
    );
};
