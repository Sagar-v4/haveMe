
import React, {useContext, useState} from 'react';
import {Layout, Menu} from 'antd';

import {CalendarOutlined, HistoryOutlined, ScheduleOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
const { Sider } = Layout;


export default function MySideBar(props) {

    return (
        <Sider style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,
        }} collapsible collapsed={props.collapsed} onCollapse={(value) => props.setCollapsed(value)}>
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

            </Menu>
        </Sider>
    );
};