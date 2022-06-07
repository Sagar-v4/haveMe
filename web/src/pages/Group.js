import '../App.css';
import Draggable from 'react-draggable';
import Highlighter from 'react-highlight-words';
import {
    EditOutlined,
    PlusOutlined,
    QrcodeOutlined,
    UnorderedListOutlined,
    SearchOutlined,
    ScanOutlined
} from '@ant-design/icons';
import {Affix, Button, Card, Col, Form, Input, Layout, Modal, Row, Space, Table, Tooltip} from 'antd';
import React, {useRef, useState} from 'react';
import TextArea from "antd/es/input/TextArea";
const { Header, Content } = Layout;

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

export default function Group(props) {

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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
                        icon={<SearchOutlined />}
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

    // ---------------------------- new grp input ----------------------------
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [nameStatus, setNameStatus] = useState("");
    // ----------------------------  end new grp input ----------------------------

    // ---------------------------- grp modal ----------------------------
    const [visibleGrp, setVisibleGrp] = useState(false);
    const [disabledGrp, setDisabledGrp] = useState(false);
    const [boundsGrp, setBoundsGrp] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRefGrp = useRef(null);

    const showNewGroupModal = () => {
        setVisibleGrp(true);
    };

    const handleOkGrp = (e) => {
        if(!name) {
            setNameStatus( "error");
            return;
        }

        setNameStatus( "");
        setVisibleGrp(false);
    };

    const handleCancelGrp = (e) => {
        console.log(e);
        setVisibleGrp(false);
    };

    const onStartGrp = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
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

    // ---------------------------- end grp modal ----------------------------


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

    const handleOkList = (e) => {
        if(!name) {
            setNameStatus( "error");
            return;
        }

        setNameStatus( "");
        setVisibleList(false);
    };

    const handleCancelList = (e) => {
        console.log(e);
        setVisibleList(false);
    };

    const onStartList = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
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
                ><h1>Group</h1></Header>
                <Content
                    style={{
                        margin: '84px 16px 16px',
                    }}
                >
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card
                                    title="My Family"
                                    extra={
                                        <Tooltip title="edit">
                                            <Button icon={<EditOutlined />} onClick={showNewGroupModal} />
                                        </Tooltip>}

                                    // onClick={(value) => setCollapsed(!collapsed)}
                                    actions={[

                                        <Tooltip title="Members"><ScanOutlined  onClick={showListModal} /></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined /></Tooltip>,
                                    ]}
                                >
                                    <div>
                                        <p>This is my family grp..</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    title="My Family"
                                    extra={
                                        <Tooltip title="edit">
                                            <Button icon={<EditOutlined />} onClick={showNewGroupModal} />
                                        </Tooltip>}

                                    // onClick={(value) => setCollapsed(!collapsed)}
                                    actions={[

                                        <Tooltip title="Members"><ScanOutlined  onClick={showListModal} /></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined /></Tooltip>,
                                    ]}
                                >
                                    <div>
                                        <p>This is my family grp..</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    title="My Family"
                                    extra={
                                        <Tooltip title="edit">
                                            <Button icon={<EditOutlined />} onClick={showNewGroupModal} />
                                        </Tooltip>}

                                    // onClick={(value) => setCollapsed(!collapsed)}
                                    actions={[

                                        <Tooltip title="Members"><ScanOutlined  onClick={showListModal} /></Tooltip>,
                                        <Tooltip title="QRCode"><QrcodeOutlined /></Tooltip>,
                                    ]}
                                >
                                    <div>
                                        <p>This is my family grp..</p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </Content>
                <Affix className={"btn-fab"}>
                    <Tooltip title="New Group">
                        <Button  style={{
                            width: 60,
                            height: 60
                        }} type="primary" onClick={showNewGroupModal} size="large" shape="circle" icon={<PlusOutlined />} />
                    </Tooltip>
                </Affix>

            {/*---------------------------- grp modal ----------------------------*/}
            <Modal
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
                        onFocus={() => {}}
                        onBlur={() => {}} // end
                    >
                        New Group
                    </div>
                }
                visible={visibleGrp}
                okText={"Submit"}
                onOk={handleOkGrp}
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
                <Form>
                    <Form.Item>
                        <Input showCount maxLength={30} status={nameStatus} value={name} placeholder="Group name*" allowClear onChange={(e)=>setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <TextArea showCount maxLength={100} value={description} placeholder="Group description" allowClear onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
            {/*---------------------------- end grp modal ----------------------------*/}

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
                        onFocus={() => {}}
                        onBlur={() => {}} // end
                    >
                        New Group
                    </div>
                }
                visible={visibleList}
                okText={"Submit"}
                onOk={handleOkList}
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
                <Table columns={columns} dataSource={data} />
            </Modal>
            {/*---------------------------- end list modal ----------------------------*/}
        </>
    );
};