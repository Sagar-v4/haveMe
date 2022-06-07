import '../App.css';
import {
    EditOutlined,
    FieldTimeOutlined,
    LockOutlined,
    PlusOutlined,
    QrcodeOutlined,
    UnorderedListOutlined,
    CheckSquareOutlined,
    SearchOutlined,
    CarryOutOutlined,
    ScanOutlined,
    UsergroupAddOutlined,
    DisconnectOutlined, LinkOutlined
} from '@ant-design/icons';
import {Affix, Button, Card, Col, Form, Input, Layout, Modal, Row, Select, Space, Table, DatePicker, Tooltip} from 'antd';
import React, { useState, useRef } from 'react';
import Draggable from "react-draggable";
import moment from 'moment';
import Highlighter from "react-highlight-words";
import TextArea from "antd/es/input/TextArea";
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

// ---------------------------- group data ----------------------------
const options = [];
for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
        label: `Long Label: ${value}`,
        value,
    });
}
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
// ---------------------------- end group data ----------------------------

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

    // ---------------------------- new event modal ----------------------------


    const [name, setName] = useState();
    const [mode, setMode] = useState();
    const [expire, setExpire] = useState();
    const [description, setDescription] = useState();

    const [nameStatus, setNameStatus] = useState("");
    const [modeStatus, setModeStatus] = useState("");
    const [expireStatus, setExpireStatus] = useState("");
    const [descriptionStatus, setDescriptionStatus] = useState("");


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

    const handleOkNewEvent = (e) => {
        let toReturn = false;
        if(!name) {
            setNameStatus( "error");
            toReturn = true;
        } else setNameStatus( "");

        if(!mode) {
            setModeStatus( "error");
            toReturn = true;
        } else setModeStatus("");

        if(!expire) {
            setExpireStatus( "error");
            toReturn = true;
        } else setExpireStatus("");

        if(!description) {
            setDescriptionStatus( "error");
            toReturn = true;
        } else setDescriptionStatus("");

        if(toReturn) return;

        setVisibleNewEvent(false);
    };

    const handleCancelNewEvent = (e) => {
        console.log(e);
        setVisibleNewEvent(false);
    };

    const onStartNewEvent = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
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


    // ---------------------------- Group selection ----------------------------
    const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value,
        options,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive',
    };


    const [visibleGrp, setVisibleGrp] = useState(false);
    const [disabledGrp, setDisabledGrp] = useState(false);
    const [boundsGrp, setBoundsGrp] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });


    const draggleRefGrp = useRef(null);

    const showGrpModal = () => {
        setVisibleGrp(true);
    };

    const handleCancelGrp = (e) => {
        console.log(e);
        setVisibleGrp(false);
    };

    const onStartGrp = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRefGrp.current?.getBoundingClientRect();

        if (!targetRect) {
            return;
        }

        setBoundsGrp({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    // ---------------------------- end Group selection ----------------------------


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
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                title="Msc IT CS Attendance"
                                extra={
                                    <Tooltip title="Edit">
                                        <Button onClick={showNewEventModal} icon={<EditOutlined/>}/>
                                    </Tooltip>
                                }


                                // onClick={(value) => setCollapsed(!collapsed)}
                                actions={[

                                    <Tooltip title="Groups"><UsergroupAddOutlined onClick={showGrpModal}/></Tooltip>,
                                    <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal}/></Tooltip>,
                                    <Tooltip title="Selections"><CarryOutOutlined  onClick={showSelectModal}/></Tooltip>,
                                    <Tooltip title="Presences"><ScanOutlined onClick={showListModal}/></Tooltip>,
                                    <Tooltip title="QRCode"><QrcodeOutlined/></Tooltip>,
                                ]}
                            >
                                <div>
                                    <FieldTimeOutlined/> <span>04 : 05 : 40</span>
                                </div>
                                <div>
                                    <DisconnectOutlined /> <span>Private</span>
                                </div>
                                <div>
                                    <p>This is one an only attendance sheet of msc it batch 23 of subject SP in winter
                                        semester 2022.</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Msc IT CS Attendance"
                                extra={
                                    <Tooltip title="Edit">
                                        <Button onClick={showNewEventModal} icon={<EditOutlined/>}/>
                                    </Tooltip>
                                }

                                // onClick={(value) => setCollapsed(!collapsed)}
                                actions={[

                                    <Tooltip title="Groups"><UsergroupAddOutlined onClick={showGrpModal}/></Tooltip>,
                                    <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal}/></Tooltip>,
                                    <Tooltip title="Selections"><CarryOutOutlined  onClick={showSelectModal}/></Tooltip>,
                                    <Tooltip title="Presences"><ScanOutlined onClick={showListModal}/></Tooltip>,
                                    <Tooltip title="QRCode"><QrcodeOutlined/></Tooltip>,
                                ]}
                            >
                                <div>
                                    <FieldTimeOutlined/> <span>04 : 05 : 40</span>
                                </div>
                                <div>
                                    <LinkOutlined /> <span>Public</span>
                                </div>
                                <div>
                                    <p>This is one an only attendance sheet of msc it batch 23 of subject SP in winter
                                        semester 2022.</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Msc IT CS Attendance"
                                extra={
                                    <Tooltip title="Edit">
                                        <Button onClick={showNewEventModal} icon={<EditOutlined/>}/>
                                    </Tooltip>
                                }

                                // onClick={(value) => setCollapsed(!collapsed)}
                                actions={[

                                    <Tooltip title="Groups"><UsergroupAddOutlined onClick={showGrpModal}/></Tooltip>,
                                    <Tooltip title="Assistants"><LockOutlined onClick={showAssistModal}/></Tooltip>,
                                    <Tooltip title="Selections"><CarryOutOutlined  onClick={showSelectModal}/></Tooltip>,
                                    <Tooltip title="Presences"><ScanOutlined onClick={showListModal}/></Tooltip>,
                                    <Tooltip title="QRCode"><QrcodeOutlined/></Tooltip>,
                                ]}
                            >
                                <div>
                                    <FieldTimeOutlined/> <span>04 : 05 : 40</span>
                                </div>
                                <div>
                                    <LinkOutlined /> <span>Public</span>
                                </div>
                                <div>
                                    <p>This is one an only attendance sheet of msc it batch 23 of subject SP in winter
                                        semester 2022.</p>
                                </div>
                            </Card>
                        </Col>
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


            {/*---------------------------- new event modal ----------------------------*/}
            <Modal
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
                        onFocus={() => {}}
                        onBlur={() => {}} // end
                    >
                        New Event
                    </div>
                }
                visible={visibleNewEvent}
                okText={"Submit"}
                onOk={handleOkNewEvent}
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
                <Form>
                    <Form.Item>
                        <Input showCount maxLength={30} status={nameStatus} value={name} placeholder="Event name*" allowClear onChange={(e)=>setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Select allowClear placeholder={"Event Mode*"} status={modeStatus} value={mode} onChange={(e)=>setMode(e)}>
                                <Option key={"mode"} value={"public"}>Public</Option>
                                <Option key={"mode"} value={"private"}>Private</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <DatePicker
                            placeholder={"Expire date*"}
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
                            status={expireStatus} value={expire} onChange={(e)=>setExpire(e)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <TextArea showCount maxLength={100} status={descriptionStatus} value={description} placeholder="Event description*" allowClear onChange={(e)=>setDescription(e.target.value)} />
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
                <Table columns={columns} dataSource={data}/>
            </Modal>
            {/*---------------------------- end list modal ----------------------------*/}

            {/*---------------------------- group modal ----------------------------*/}
            <Modal
                // footer={null}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabledGrp) {
                                setDisabledGrp(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabledGrp(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }} // end
                    >
                        Groups
                    </div>
                }
                visible={visibleGrp}
                onCancel={handleCancelGrp}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabledGrp}
                        bounds={boundsGrp}
                        onStart={(event, uiData) => onStartGrp(event, uiData)}
                    >
                        <div ref={draggleRefGrp}>{modal}</div>
                    </Draggable>
                )}
            >

                {/*{...selectProps}*/}
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Inserted are removed"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{
                        width: '100%',
                    }}
                >
                    {/*{filteredOptions.map((item) => (*/}
                    {/*    <Select.Option key={item} value={item}>*/}
                    {/*        {item}*/}
                    {/*    </Select.Option>*/}
                    {/*))}*/}
                    <OptGroup label="Manager">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </OptGroup>
                    <OptGroup label="Engineer">
                        <Option value="Yiminghe">yiminghe</Option>
                    </OptGroup>
                </Select>
            </Modal>
            {/*---------------------------- end group modal ----------------------------*/}

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
        </>
    );
};
