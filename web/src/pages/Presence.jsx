import { Table} from 'antd';
import React, {useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {useEffect} from "react";
import axios from "axios";

export default function Presence() {

    const user = JSON.parse(localStorage.getItem("user"));

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            width: '10%',
            showOnResponse: true,
            showOnDesktop: true,
            render: (verified) => (
                <>
                    {verified ? "Verified" : "Not Verified"}
                </>),
        },
    ];

    const [data, setPresences] = useState();

    useEffect(() => {
        const fetchPresence = async () => {
            const res = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + user._id + "/user");
            res.data.map(r => {
                r.key = r._id;
                r.name = r.event_id.name;
                r.description = r.event_id.description;
            });
            setPresences(res.data);
        };
        fetchPresence().then(r => console.log(r));
    }, [user._id]);

    return (

        <>
            <Header
                className="site-layout-background"
                style={{
                    width: "100%",
                    position: "fixed",
                    padding: 0,
                }}
            ><h1>Presence</h1></Header>
            <Content
                style={{
                    margin: '84px 16px 16px',
                }}
            >
                <Table
                    className="components-table-demo-nested"
                    columns={columns}

                    pagination={{
                        pageSize: 10,
                    }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                {record.message}
                            </p>
                        ),
                        rowExpandable: (record) => record.message !== null,
                    }}
                    dataSource={data}
                />
            </Content>
        </>
    );
};
