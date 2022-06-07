import './App.css';
import React, { useState } from 'react';
import Group from "./pages/Group";
import Event from "./pages/Event";
import Assist from "./pages/Assist";

import {Layout, Menu} from 'antd';
import {CalendarOutlined, ProfileOutlined, ScheduleOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';

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
    getItem('Group', 'group', <TeamOutlined />),
    getItem('Event', 'event', <CalendarOutlined />),
    getItem('Assist', 'assist', <ScheduleOutlined />)
];

const App = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (
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
                {/*<Event />*/}
                {/*<Group />*/}
                <Assist/>
            </Layout>
        </Layout>
    );
};

export default App;