import '../App.css';
import {
    EditOutlined,
    FieldTimeOutlined,
    LockOutlined,
    PlusOutlined,
    QrcodeOutlined,
    SearchOutlined,
    CarryOutOutlined,
    ScanOutlined,
    UsergroupAddOutlined,
    DisconnectOutlined, LinkOutlined, DeleteOutlined, DownloadOutlined, SyncOutlined
} from '@ant-design/icons';
import {Affix, Button, Card, Col, Form, Input, Layout, Modal, Row, Select, Space, Table, DatePicker, Tooltip} from 'antd';
import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import Draggable from "react-draggable";
import moment from 'moment';
import Highlighter from "react-highlight-words";
import TextArea from "antd/es/input/TextArea";
import {useContext, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
const { Header, Content} = Layout;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

// --------------------- date picker ------------------------------

const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) {
        result.push(i);
    }

    return result;
}; // eslint-disable-next-line arrow-body-style

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
};

const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
});

const disabledRangeTime = (_, type) => {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
};
// ---------------------------- end date picker -------------------------

// ---------------------------- presence data ----------------------------
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
// ---------------------------- end presence data ----------------------------

export default function Event(props) {


    const { user } = useContext(AuthContext);
    // ---------------------------- dummy data  for table ----------------------------

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

    const getColumnSearchProps = (dataIndex) => ({
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
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    // ---------------------------- end of dummy data table ----------------------------


    // ----------------------------  list modal ----------------------------
    const [visibleList, setVisibleList] = useState(false);
    const [disabledList, setDisabledList] = useState(false);
    const [boundsList, setBoundsList] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefList = useRef(null);

    const showListModal = () => {
        setVisibleList(true);
    };

    const handleCancelList = (e) => {
        console.log(e);
        setVisibleList(false);
    };

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
    // ---------------------------- end list modal ----------------------------


    // ----------------------------  Assist modal ----------------------------
    const [visibleAssist, setVisibleAssist] = useState(false);
    const [disabledAssist, setDisabledAssist] = useState(false);
    const [boundsAssist, setBoundsAssist] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefAssist = useRef(null);

    const showAssistModal = () => {
        setVisibleAssist(true);
    };

    const handleCancelAssist = (e) => {
        console.log(e);
        setVisibleAssist(false);
    };

    const onStartAssist = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefAssist.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsAssist({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    // ---------------------------- end assist modal ----------------------------


    // ----------------------------  Assist modal ----------------------------
    const [visibleSelect, setVisibleSelect] = useState(false);
    const [disabledSelect, setDisabledSelect] = useState(false);
    const [boundsSelect, setBoundsSelect] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefSelect = useRef(null);

    const showSelectModal = () => {
        setVisibleSelect(true);
    };

    const handleCancelSelect = (e) => {
        console.log(e);
        setVisibleSelect(false);
    };

    const onStartSelect = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefSelect.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsSelect({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    // ---------------------------- end assist modal ----------------------------

    // ----------------------------  QR modal ----------------------------
    const [visibleQR, setVisibleQR] = useState(false);
    const [disabledQR, setDisabledQR] = useState(false);
    const [boundsQR, setBoundsQR] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefQR = useRef(null);

    const showQRModal = () => {
        setVisibleQR(true);
    };

    const handleCancelQR = (e) => {
        console.log(e);
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
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get("http://localhost:5000/api/assist/" + user._id + "/user");
            setEvents(res.data.sort((e1, e2) => {
                return new Date(e1.expire) - new Date(e2.expire);
            }));
        };
        fetchEvents().then(r => console.log(r));
    }, [user._id]);
    console.log("events: ", events)

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
                    }} >
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
                                    title={event.name}
                                    extra={
                                        <Tooltip title="Delete">
                                            <Button icon={<DeleteOutlined/>}/>
                                        </Tooltip>
                                    }


                                    // onClick={(value) => setCollapsed(!collapsed)}
                                    actions={[

                                        // <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal && setEventAssistId(event._id)}/></Tooltip>,
                                        // {event.permi
                                        <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal}/></Tooltip>,
                                    // }
                                        <Tooltip title="Selections"><CarryOutOutlined onClick={showSelectModal}/></Tooltip>,
                                        <Tooltip title="Presences"><ScanOutlined onClick={showListModal}/></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined onClick={showQRModal}/></Tooltip>,
                                    ]}
                                >
                                    <div>
                                        <FieldTimeOutlined/> <span>{event.expire}</span>
                                    </div>
                                    <div
                                        style={{
                                            height: "50px",
                                            overflowY: "hidden",
                                            textTransform: "capitalize"
                                        }}>
                                        <p>{event.description}</p>
                                    </div>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>

            </Content>

            {/*<Affix className={"btn-fab"}>*/}
            {/*    <Tooltip title="Delete Event">*/}
            {/*        <Button style={{*/}
            {/*            width: 60,*/}
            {/*            height: 60*/}
            {/*        }} type="danger" onClick={showNewEventModal} size="large" shape="circle" icon={<DeleteOutlined />}/>*/}
            {/*    </Tooltip>*/}
            {/*</Affix>*/}


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
                <Table columns={columns} dataSource={data}/>
            </Modal>
            {/*---------------------------- end list modal ----------------------------*/}

            {/*---------------------------- assist modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledAssist) {
                                setDisabledAssist(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledAssist(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        Assistants
                    </div>
                }
                visible={visibleAssist}
                onCancel={handleCancelAssist}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledAssist}
                        bounds={boundsAssist}
                        onStart={(event, uiData) => onStartAssist(event, uiData)}
                    >
                        <div ref={draggleRefAssist}>{modal}</div>
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
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.includes(input)}
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option value="1">Not Idefferfrfrntified</Option>
                            <Option value="2">Closed</Option>
                            <Option value="3">Communicated</Option>
                            <Option value="4">Identified</Option>
                            <Option value="5">Resolved</Option>
                            <Option value="6">Cancelled</Option>
                        </Select>
                    </div>
                    <div
                        style={{
                            flexGrow: 0.1,
                        }}>
                        <Button
                            style={{
                                width: "100%"
                            }} type="primary">Add</Button>
                    </div>
                </Row>
                <br/>
                <Table columns={columns} dataSource={data}/>
            </Modal>
            {/*---------------------------- end assist modal ----------------------------*/}


            {/*---------------------------- selection modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledSelect) {
                                setDisabledSelect(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledSelect(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        Selection
                    </div>
                }
                visible={visibleSelect}
                onCancel={handleCancelSelect}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledSelect}
                        bounds={boundsSelect}
                        onStart={(event, uiData) => onStartSelect(event, uiData)}
                    >
                        <div ref={draggleRefSelect}>{modal}</div>
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

                        <Input style={{
                            width: "calc(100% - 20px)"
                        }} showCount maxLength={20} onChange={""} />
                    </div>
                    <div
                        style={{
                            flexGrow: 0.1,
                        }}>
                        <Button
                            style={{
                                width: "100%"
                            }} type="primary">Add</Button>
                    </div>
                </Row>
                <br/>
                <Table columns={columns} dataSource={data}/>
            </Modal>
            {/*---------------------------- end selection modal ----------------------------*/}

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
                <div style={{
                    marginInline: "auto",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Row style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Col><QRCode size={300} value="https://github.com/gcoro/react-qrcode-logo"/></Col>
                    </Row>
                    <Row style={{
                        display: "flex",
                        justifyContent: "space-between",

                    }}>
                        <Col>
                            <Button type="primary"  icon={<DownloadOutlined />}>
                                Download
                            </Button>
                        </Col>
                        <Col>
                            <Button type={"primary"} icon={<SyncOutlined />}>Change</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            {/*---------------------------- end QR modal ----------------------------*/}
        </>
    );
};

