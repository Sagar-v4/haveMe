import '../App.css';
import {
    FieldTimeOutlined,
    QrcodeOutlined,
    SearchOutlined,
    ScanOutlined,
    DownloadOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Input,
    Layout, message,
    Modal,
    Row,
    Select,
    Space,
    Table,
    Tooltip,
} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { QRCode } from 'react-qrcode-logo';
import Draggable from "react-draggable";
import Highlighter from "react-highlight-words";
import axios from "axios";
const { Header, Content} = Layout;


export default function Assist(props) {

    const [user] = useState(JSON.parse(localStorage.getItem("user")));

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // ----------------------------  list modal ----------------------------

    const [presences, setPresences] = useState([]);

    const [visibleList, setVisibleList] = useState(false);
    const [disabledList, setDisabledList] = useState(false);
    const [boundsList, setBoundsList] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefList = useRef(null);

    const showListModal = (id) => {
        setEventId(id);
        setVisibleList(true);
    };

    const handleCancelList = (e) => {
        setVisibleList(false);
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchPropsPresence = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            maxWidth: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            maxWidth: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const [updPresence, setUpdPresence] = useState([]);

    const updatePresence = (value) => {
        setUpdPresence(value);
    };
    const PresenceColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ellipsis: true,
            ...getColumnSearchPropsPresence('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '40%',
            ellipsis: true,
            ...getColumnSearchPropsPresence('email'),
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            fixed: 'right',
            width: '20%',
            ...getColumnSearchPropsPresence('verified'),
            render: (verified) => (
                <>
                    {verified ? "Verified" : "Not Verified"}
                </>),
        },
        {
            title: 'X',
            dataIndex: '_id',
            key: 'x',
            fixed: 'right',
            width: '10%',
            ...getColumnSearchPropsPresence('_id'),
            render: (row) => <a><SyncOutlined onClick={updatePresence.bind(this, row)}/></a>
        },
    ];

    const onStartList = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefList.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsList({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const [newPresence, setNewPresence] = useState();
    const [newTmpPresence, setNewTmpPresence] = useState();
    const handleChangePresence = (value) => {
        setNewTmpPresence(value);
    };
    const addNewPresencs = () => {
        setNewPresence(newTmpPresence);
    }
    // ---------------------------- end list modal ----------------------------

    // ----------------------------  QR modal ----------------------------
    const [visibleQR, setVisibleQR] = useState(false);
    const [disabledQR, setDisabledQR] = useState(false);
    const [boundsQR, setBoundsQR] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const [QRcode, setQRcode] = useState();
    const [currEvent, setCurrEvent] = useState();
    const [updateQR, setUpdateQR] = useState();
    const draggleRefQR = useRef(null);

    const showQRModal = (id) => {
        setCurrEvent(id);
        setQRcode(id.code);
        setVisibleQR(true);
    };

    const handleCancelQR = (e) => {
        setVisibleQR(false);
    };

    const onStartQR = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefQR.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsQR({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    // ---------------------------- end QR modal ----------------------------


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(process.env.API_URL + "/api/assistant/" + user._id + "/allEvents");

                setEvents(res.data.sort((e1, e2) => {
                    return new Date(e1.expire) - new Date(e2.expire);
                }));

            } catch (err) {
                message.error(err.message);
            }

        };
        fetchEvents().then(r => {});
    }, [user._id]);


    useEffect(() => {
        const fetchPresences = async () => {
            try {
                const presence = await axios.get("process.env.API_URL/api/presence/" + eventId + "/event");
                presence.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setPresences(presence.data);
            } catch (err) {
                // message.error(err.message);
            }
        };
        fetchPresences().then(r => {});
    }, [eventId]);


    useEffect(() => {
        const fetchQR = async () => {
            try {
                const res = await axios.put("process.env.API_URL/api/event/" + currEvent._id + "/qr", {user_id: user._id});
                setCurrEvent(res.data);
                setQRcode(res.data.code);
            } catch (err) {
                // message.error(err.message);
            }
        };
        fetchQR().then(r => {});
    }, [updateQR]);


    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const users = await axios.get("process.env.API_URL/api/user/" + user._id + "/all");
                setAllUsers(users.data);
            } catch (err) {
                // message.error(err.message);
            }
        };
        fetchAllUsers().then(r => {});
    }, [user]);


    useEffect(() => {
        const setNewPresence = async () => {
            try {
                const p = await axios.post("process.env.API_URL/api/presence", {
                    "event_id": eventId,
                    "user_id": newPresence,
                });
                p.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setPresences(p.data);
                message.success('New presence added successful!');
            } catch (err) {
                // message.error(err.message);
            }
        };
        setNewPresence().then(r => {});
    }, [newPresence]);

    useEffect(() => {
        const updatePresence = async () => {
            try {
                await axios.put("process.env.API_URL/api/presence/" + updPresence);
                const presence = await axios.get("process.env.API_URL/api/presence/" + eventId + "/event");
                presence.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setPresences(presence.data);

                message.success('Presence updated successful!');
            } catch (err) {
                // message.error(err.message);
            }
        };
        updatePresence().then(r => {});
    }, [updPresence]);

    return (

        <>
            <Header
                className="site-layout-background"
                style={{
                    width: "100%",
                    display: "block",
                    position: "fixed",
                    padding: 0,
                }}
            ><h1>Assist</h1></Header>
            <Content
                style={{
                    margin: '84px 16px 16px',
                }}
            >
                <div className="site-card-wrapper">
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                    }}>
                        {events.map(event =>

                            <Col
                                gutter={{
                                    xs: 8,
                                    sm: 16,
                                    md: 24,
                                    lg: 32,
                                }}
                                xs={24} sm={12} md={12} lg={8} xl={6}
                                style={{
                                    marginBottom: "20px",
                                }}>
                                <Card
                                    title={event.event_id.name}
                                    actions={[

                                        <Tooltip title="Presences"><ScanOutlined
                                            onClick={showListModal.bind(this, event.event_id._id)}/></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined
                                            onClick={showQRModal.bind(this, event.event_id)}/></Tooltip>,
                                    ]}
                                >
                                    <div>
                                        <FieldTimeOutlined/> <span>{event.event_id.expire}</span>
                                    </div>
                                    <div
                                        style={{
                                            height: "50px",
                                            overflowY: "hidden",
                                            textTransform: "capitalize"
                                        }}>
                                        <p>{event.event_id.description}</p>
                                    </div>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>

            </Content>

            {/*---------------------------- list modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledList) {
                                setDisabledList(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledList(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        Presences
                    </div>
                }
                visible={visibleList}
                onCancel={handleCancelList}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledList}
                        bounds={boundsList}
                        onStart={(event, uiData) => onStartList(event, uiData)}
                    >
                        <div ref={draggleRefList}>{modal}</div>
                    </Draggable>
                )}
            >
                <Row style={{
                    width: "100%",
                    display: "flex",
                }}>
                    <div
                        style={{
                            flexGrow: 0.9,
                        }}>
                        <Select
                            allowClear
                            showSearch
                            style={{
                                width: "calc(100% - 20px)"
                            }}
                            onChange={handleChangePresence}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.includes(input)}
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {allUsers.map(u =>
                                <Select.Option value={u._id} key={u.email}>{u.email}</Select.Option>
                            )}
                        </Select>
                    </div>
                    <div
                        style={{
                            flexGrow: 0.1,
                        }}>
                        <Button
                            style={{
                                width: "100%"
                            }} type="primary"
                            onClick={addNewPresencs}
                        >Add</Button>
                    </div>
                </Row>
                <br/>
                <Table columns={PresenceColumns} dataSource={presences}
                       pagination={{
                           pageSize: 5,
                       }}
                       scroll={{
                           y: 400,
                       }}/>
            </Modal>
            {/*---------------------------- end list modal ----------------------------*/}

            {/*---------------------------- QR modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            display: 'flex',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledQR) {
                                setDisabledQR(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledQR(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        QR Code
                    </div>
                }
                visible={visibleQR}
                onCancel={handleCancelQR}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledQR}
                        bounds={boundsQR}
                        onStart={(event, uiData) => onStartQR(event, uiData)}
                    >
                        <div ref={draggleRefQR}>{modal}</div>
                    </Draggable>
                )}
            >
                <div>
                    <Row style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "12px"
                    }}>
                        <div className={"qr-print"}><QRCode size={300} value={QRcode}/></div>
                    </Row>
                    <Row style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Col>
                            <Button type="primary" onClick={window.print} icon={<DownloadOutlined/>}>
                                Download
                            </Button>
                        </Col>
                        <Col>
                            <Button type={"primary"} onClick={() => setUpdateQR(currEvent)}
                                    icon={<SyncOutlined/>}>Change</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            {/*---------------------------- end QR modal ----------------------------*/}

        </>
    );
};
