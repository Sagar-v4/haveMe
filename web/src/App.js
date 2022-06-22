import './App.css';
import React, {useContext, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import Assist from "./pages/Assist";
import Presence from "./pages/Presence";

import {Layout, Menu} from 'antd';
import {CalendarOutlined, HistoryOutlined, ScheduleOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {AuthContext} from "./context/AuthContext";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Profile', 'profile', <UserOutlined />),
    getItem('History', 'history', <HistoryOutlined />),
    getItem('Event', 'event', <CalendarOutlined />),
    getItem('Assist', 'assist', <ScheduleOutlined />)
];

export default function App() {

    const [collapsed, setCollapsed] = useState(false);

    // localStorage.removeItem("currentUser");
    // const user = localStorage.getItem("currentUser");
    // console.log("curr-------",user);




    const { user } = useContext(AuthContext);
    console.log("App: user", user);

    // const user = {
    //     avtar: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
    //     createdAt: "2022-06-14T08:38:47.695Z",
    //     dob: null,
    //     email: "sss@gmail.com",
    //     email_verified: false,
    //     forgot_code: null,
    //     forgot_time: null,
    //     gender: null,
    //     mobile_number: null,
    //     name: "sss",
    //     social_detail: [],
    //     status: true,
    //     updatedAt: "2022-06-14T08:38:47.695Z",
    //     __v: 0,
    //     _id: "62a84917600df42f43fe2614",
    //     _type: null
    // }
    return (
        <Router>
            <Switch>
                <Route exact={true} path={"/"}>
                    {/*{ console.log("App Home: user", user) }*/}
                    { user ? <Redirect to={"/event"}/> : <Home />}
                    {/*<Home />*/}
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
                        <Menu theme="dark" mode="inline" >

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

                        </Menu>
                    </Sider>

                    <Layout className="site-layout">
                        <Route path={"/profile"}>
                            { user ? <Profile/> : <Redirect to={"/"}/> }
                        </Route>
                        <Route path={"/event"}>
                            { console.log("App Event: user", user) }
                            {user ? <Event user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                        <Route path={"/presence"}>
                            { console.log("App Presence: user", user) }
                            {user ? <Presence user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                        <Route path={"/assist"}>
                            { console.log("App Assist: user", user) }
                            {user ? <Assist user={user}/> : <Redirect to={"/"}/>}
                        </Route>
                        {/*<Assist/>*/}
                        {/*<Presence />*/}
                    </Layout>
                </Layout>
            </Switch>

        </Router>
    );
};
