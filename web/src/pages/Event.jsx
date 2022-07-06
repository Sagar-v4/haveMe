import '../App.css';
import {
    EditOutlined,
    FieldTimeOutlined,
    LockOutlined,
    PlusOutlined,
    QrcodeOutlined,
    SearchOutlined,
    ScanOutlined,
    DownloadOutlined,
    SyncOutlined,
    DeleteTwoTone
} from '@ant-design/icons';
import {
    Affix,
    Button,
    Card,
    Col,
    Form,
    Input,
    Layout,
    Modal,
    Row,
    Select,
    Space,
    Table,
    DatePicker,
    Tooltip,
    message
} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { QRCode } from 'react-qrcode-logo';
import Draggable from "react-draggable";
import moment from 'moment';
import Highlighter from "react-highlight-words";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
const { Header, Content} = Layout;

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
// ---------------------------- end date picker -------------------------

export default function Event() {

    const [user] = useState(JSON.parse(localStorage.getItem("user")));

    // ---------------------------- new event modal ----------------------------

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const [visibleNewEvent, setVisibleNewEvent] = useState(false);
    const [disabledNewEvent, setDisabledNewEvent] = useState(false);
    const [boundsNewEvent, setBoundsNewEvent] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRefNewEvent = useRef(null);

    const showNewEventModal = () => {
        setVisibleNewEvent(true);
    };

    const onNewEventFinish = async (e) => {

        const newEvent = {
            user_id : user._id,
            name : e.newEventName,
            description : e.newEventDescription,
            expire : e.newEventDate
        }

        try {
            await axios.post("https://haveme-api.herokuapp.com/api/event", newEvent)
                .then(message.success('Event created..'));
            window.location.reload();

            setVisibleNewEvent(false);
        } catch (err) {
            message.error(err.message);
        }
        setVisibleNewEvent(false);
    };

    const onNewEventFinishFailed = (errorInfo) => {
        message.error(errorInfo.message).then(r => {});
    };
    const handleCancelNewEvent = (e) => {
        setVisibleNewEvent(false);
    };

    const onStartNewEvent = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefNewEvent.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsNewEvent({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    // ---------------------------- end new event modal ----------------------------

    // ---------------------------- edit event modal ----------------------------

    const [visibleEditEvent, setVisibleEditEvent] = useState(false);
    const [disabledEditEvent, setDisabledEditEvent] = useState(false);
    const [boundsEditEvent, setBoundsEditEvent] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRefEditEvent = useRef(null);

    const showEditEventModal = (event) => {

        setCurrEvent(event);
        setVisibleEditEvent(true);
    };

    const onEditEventFinish = async (e) => {

        const EditEvent = {
            user_id : user._id,
            name : e.EditEventName,
            description : e.EditEventDescription,
            expire : e.EditEventDate
        }

        try {
            await axios.put("https://haveme-api.herokuapp.com/api/event/" + currEvent._id, EditEvent)
                .then(message.success('Event Updated..'));
            window.location.reload();

            setVisibleEditEvent(false);
        } catch (err) {
            message.error(err.message);
        }
        setVisibleEditEvent(false);
    };

    const onEditEventFinishFailed = (errorInfo) => {
        message.error(errorInfo.message).then(r => {});
    };
    const handleCancelEditEvent = () => {
        setVisibleEditEvent(false);
    };

    const onStartEditEvent = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefNewEvent.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsEditEvent({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    // ---------------------------- end edit event modal ----------------------------



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
            ...getColumnSearchPropsPresence( 'email'),
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
            render: (row) => <a ><SyncOutlined onClick={updatePresence.bind(this, row)} /></a>
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


    // ----------------------------  Assist modal ----------------------------

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

    const getColumnSearchPropsAssist = (dataIndex) => ({
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


    const [delAssist, setDelAssist] = useState();

    const deleteAssist = (value) => {
        setDelAssist(value);
    };
    const AssistColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ellipsis: true,
            ...getColumnSearchPropsAssist('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '50%',
            ellipsis: true,
            ...getColumnSearchPropsAssist('email'),
        },
        {
            title: 'X',
            dataIndex: '_id',
            key: 'x',
            width: '10%',
            ...getColumnSearchPropsAssist('_id'),
            render: (row) => <a ><DeleteTwoTone twoToneColor={"red"} onClick={deleteAssist.bind(this, row)} /></a>,
        },
    ];

    const [visibleAssist, setVisibleAssist] = useState(false);
    const [disabledAssist, setDisabledAssist] = useState(false);
    const [boundsAssist, setBoundsAssist] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefAssist = useRef(null);

    const [assist, setAssist] = useState([]);

    const showAssistModal = (id) => {
        setEventId(id);
        setVisibleAssist(true);
    };

    const handleCancelAssist = (e) => {
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
    }

    const [newAssist, setNewAssist] = useState();
    const [newTmpAssist, setNewTmpAssist] = useState();
    const handleChangeAssist = (value) => {
        setNewTmpAssist(value);
    };
    const addNewAssist = () => {
        setNewAssist(newTmpAssist);
    }
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
                const res = await axios.get("https://haveme-api.herokuapp.com/api/event/" + user._id + "/user");
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
                const presence = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + eventId + "/event");
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
                const res = await axios.put("https://haveme-api.herokuapp.com/api/event/" + currEvent._id + "/qr", {user_id: user._id});
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
                const users = await axios.get("https://haveme-api.herokuapp.com/api/user/" + user._id + "/all");
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
                const p = await axios.post("https://haveme-api.herokuapp.com/api/presence", {
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
        const setNewAssist = async () => {
            try {
                const p = await axios.post("https://haveme-api.herokuapp.com/api/assistant/", {
                    "user_id" : newAssist,
                    "event_id" : eventId,
                });
                p.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setAssist(p.data);
                message.success('New assistant added successful!');
            } catch (err) {
                // message.error(err.message);
            }
        };
        setNewAssist().then(r => {});
    }, [newAssist]);



    useEffect(() => {
        const fetchAssists = async () => {
            try {
                const presence = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + eventId + "/event");
                presence.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setPresences(presence.data);
                const assist = await axios.get("https://haveme-api.herokuapp.com/api/assistant/" + eventId + "/event");
                assist.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setAssist(assist.data);
            } catch (err) {
                // message.error(err.message);
            }
        };
        fetchAssists().then(r => {});
    }, [eventId]);


    useEffect(() => {
        const deleAssist = async () => {
            try {
                await axios.delete("https://haveme-api.herokuapp.com/api/assistant/" + delAssist);
                const assist = await axios.get("https://haveme-api.herokuapp.com/api/assistant/" + eventId + "/event");
                assist.data.map(r => {
                    r.name = r.user_id.name;
                    r.email = r.user_id.email;
                });
                setAssist(assist.data);

                message.success('Assistant deleted successful!');
            } catch (err) {
                // message.error(err.message);
            }
        };
        deleAssist().then(r => {});
    }, [delAssist]);

    useEffect(() => {
        const updatePresence = async () => {
            try {
                await axios.put("https://haveme-api.herokuapp.com/api/presence/" + updPresence);
                const presence = await axios.get("https://haveme-api.herokuapp.com/api/presence/" + eventId + "/event");
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
            ><h1>Event</h1></Header>
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
                                        <Tooltip title="Edit">
                                            <Button onClick={showEditEventModal.bind(this, event)} icon={<EditOutlined/>}/>
                                        </Tooltip>
                                    }

                                    actions={[
                                        <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal.bind(this, event._id)}/></Tooltip>,
                                        <Tooltip title="Presences"><ScanOutlined onClick={showListModal.bind(this, event._id)}/></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined onClick={showQRModal.bind(this, event)}/></Tooltip>,
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

            <Affix className={"btn-fab"}>
                <Tooltip title="New Event">
                    <Button style={{
                        width: 60,
                        height: 60
                    }} type="primary" onClick={showNewEventModal} size="large" shape="circle" icon={<PlusOutlined/>}/>
                </Tooltip>
            </Affix>

            {/*---------------------------- edit event modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledNewEvent) {
                                setDisabledEditEvent(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledEditEvent(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        Edit Event
                    </div>
                }
                visible={visibleEditEvent}
                onCancel={handleCancelEditEvent}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledEditEvent}
                        bounds={boundsEditEvent}
                        onStart={(event, uiData) => onStartEditEvent(event, uiData)}
                    >
                        <div ref={draggleRefEditEvent}>{modal}</div>
                    </Draggable>
                )}
            >
                <Form
                    name="Edit_event"
                    onFinish={onEditEventFinish}
                    onFinishFailed={onEditEventFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <Form.Item
                        name="EditEventName"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event name!',
                            },
                        ]}>
                        <Input showCount maxLength={30} placeholder="Event name *"
                               allowClear />
                    </Form.Item>

                    <Form.Item
                        name="EditEventDate"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event expire date!',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder={"Expire date *"}
                            allowClear
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{
                                defaultValue: moment('00:00:00', 'HH:mm:ss'),
                            }}
                            style={{
                                width: "100%",
                            }}

                        />
                    </Form.Item>
                    <Form.Item
                        name="EditEventDescription"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event name!',
                            },
                        ]}>
                        <TextArea showCount maxLength={100}
                                  placeholder="Event description *" allowClear
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*---------------------------- end edit event modal ----------------------------*/}


            {/*---------------------------- new event modal ----------------------------*/}
            <Modal
                footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledNewEvent) {
                                setDisabledNewEvent(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledNewEvent(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        New Event
                    </div>
                }
                visible={visibleNewEvent}
                onCancel={handleCancelNewEvent}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledNewEvent}
                        bounds={boundsNewEvent}
                        onStart={(event, uiData) => onStartNewEvent(event, uiData)}
                    >
                        <div ref={draggleRefNewEvent}>{modal}</div>
                    </Draggable>
                )}
            >
                <Form
                    name="new_event"
                    onFinish={onNewEventFinish}
                    onFinishFailed={onNewEventFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <Form.Item
                        name="newEventName"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event name!',
                            },
                        ]}>
                        <Input showCount maxLength={30} placeholder="Event name *"
                               allowClear />
                    </Form.Item>

                    <Form.Item
                        name="newEventDate"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event expire date!',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder={"Expire date *"}
                            allowClear
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{
                                defaultValue: moment('00:00:00', 'HH:mm:ss'),
                            }}
                            style={{
                                width: "100%",
                            }}

                        />
                    </Form.Item>
                    <Form.Item
                        name="newEventDescription"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input event name!',
                            },
                        ]}>
                        <TextArea showCount maxLength={100}
                                  placeholder="Event description *" allowClear
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*---------------------------- end new event modal ----------------------------*/}

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
                            // mode={"multiple"}
                            // maxTagCount={1}
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
                            // mode={"multiple"}
                            maxTagCount={1}
                            style={{
                                width: "calc(100% - 20px)"
                            }}
                            onChange={handleChangeAssist}
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
                            onClick={addNewAssist}
                        >Add</Button>
                    </div>
                </Row>
                <br/>
                <Table columns={AssistColumns} dataSource={assist}
                       pagination={{
                           pageSize: 5,
                       }}
                       scroll={{
                           y: 400,
                       }}/>
            </Modal>
            {/*---------------------------- end assist modal ----------------------------*/}

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
                            <Button type="primary" onClick={window.print}  icon={<DownloadOutlined />}>
                                Download
                            </Button>
                        </Col>
                        <Col>
                            <Button type={"primary"} onClick={() => setUpdateQR(currEvent)} icon={<SyncOutlined />}>Change</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            {/*---------------------------- end QR modal ----------------------------*/}

        </>
    );
};
