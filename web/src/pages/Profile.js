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
    DisconnectOutlined, LinkOutlined, DownloadOutlined, SyncOutlined
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
    message, InputNumber
} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { QRCode } from 'react-qrcode-logo';
import Draggable from "react-draggable";
import moment from 'moment';
import Highlighter from "react-highlight-words";
import TextArea from "antd/es/input/TextArea";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
const { Header, Content} = Layout;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

export default function Event(props) {

    const {user} = useContext(AuthContext);
    // ---------------------------- new event modal ----------------------------

    const [visibleNewEvent, setVisibleNewEvent] = useState(false);
    const [disabledNewEvent, setDisabledNewEvent] = useState(false);
    const [boundsNewEvent, setBoundsNewEvent] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRefNewEvent = useRef(null);

    const [data, setData] = useState();

    const showNewEventModal = () => {

        // this.props.form.setFieldsValue({
        //     name: currUser.name,
            // Name: data.field.Name,
            // Description: data.field.Description,
            // Value: data.field.Value
        // })
        setVisibleNewEvent(true);
    };

    const onNewEventFinish = async (e) => {

        console.log(e);
        const editUser = {
            user_id: user._id,
            name: e.name,
            mobile_number: e.mobile_number,
            gender: e.gender,
            dob: e.dob,
        }

        try {
            const res = await axios.put("http://localhost:5000/api/user/" + user._id, editUser);
            message.success('Profile edited..');
            // history.push("/")
        } catch (err) {
            message.error(err.message);
        }
        // console.log('Received values of form: ', e);
        // console.log(props.user);
        setVisibleNewEvent(false);
    };

    const onNewEventFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCancelNewEvent = (e) => {
        console.log(e);
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

    const [currUser, setCurrUser] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get("http://localhost:5000/api/user/" + user._id);
            setCurrUser(res.data);
            setData(res.data);
        };
        fetchEvents().then(r => console.log(r));
    }, [user._id]);

    // const [fields, setFields] = useState([
    //     {
    //         name: ['name'],
    //         value: _name,
    //     },
    //     {
    //         name: ['mobile'],
    //         value: 'currUser.mobile_number',
    //     },
    //     {
    //         name: ['gender'],
    //         value: currUser.gender,
    //     },
    //     {
    //         name: ['dob'],
    //         value: currUser.dob,
    //     },
    // ]);
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
            >
                {/*<div className={"ant-avatar right"}>*/}
                {/*    <img src={currUser.avtar}/>*/}
                {/*</div>*/}
                <h1>Profile: {currUser.name}</h1>

            </Header>
            <Content
                style={{
                    margin: '84px 16px 16px',
                }}
            >
                <div className="site-card-wrapper">

                    <Card>
                        <Row>
                            <Col
                            >
                                <div className={""}
                                >
                                    <img src={currUser.avtar} alt={currUser.avtar}/>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <table width={"100%"} border={0}>
                                        <tr>
                                            <td><h1>Name:</h1></td>
                                            <td><h1>{currUser.name}</h1></td>
                                        </tr>
                                        <tr>
                                            <td><h1>Email:</h1></td>
                                            <td><h1>{currUser.email}</h1></td>
                                        </tr>
                                        <tr>
                                            <td><h1>Mobile:</h1></td>
                                            <td><h1>{currUser.mobile_number}</h1></td>
                                        </tr>
                                        <tr>
                                            <td><h1>Gender:</h1></td>
                                            <td><h1>{currUser.gender}</h1></td>

                                        </tr>
                                        <tr>
                                            <td><h1>Date of birth:</h1></td>
                                            <td><h1>{currUser.dob}</h1></td>
                                        </tr>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

            </Content>

            <Affix className={"btn-fab"}>
                <Tooltip title="edit">
                    <Button style={{
                        width: 60,
                        height: 60
                    }} type="primary" onClick={showNewEventModal} size="large" shape="circle" icon={<EditOutlined/>}/>
                </Tooltip>
            </Affix>


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
                        Edit
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
                    name="profile"
                    onFinish={onNewEventFinish}
                    onFinishFailed={onNewEventFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >

                    <Form.Item
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}>
                        <Input placeholder="name *"
                               allowClear/>
                    </Form.Item>

                    <Form.Item
                        name="mobile_number"
                        hasFeedback
                        rules={[
                            {
                                type: 'number',
                                message: 'Only numbers allowed!',
                            },
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                        ]}>
                        <InputNumber
                            style={{
                                width: "100%"
                            }} placeholder="mobile number *"  allowClear/>
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your gender!',
                            },
                        ]}>

                        <Select
                            placeholder="Geneder *"
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>

                    </Form.Item>


                    <Form.Item
                        name="dob"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your birth date!',
                            },
                            {
                                type: Date,
                                message: 'Only Dates allowed!',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder={"Birth date *"}
                            allowClear
                            format="YYYY-MM-DD"
                            style={{
                                width: "100%",
                            }}

                        />
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    name="password"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            min: 6,*/}
                    {/*            message: 'Password should be least 6!',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    hasFeedback*/}
                    {/*>*/}
                    {/*    <Input.Password*/}
                    {/*        placeholder={"Password(optional)"}*/}
                    {/*        allowClear/>*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item*/}
                    {/*    name="confirm"*/}
                    {/*    dependencies={['password']}*/}
                    {/*    hasFeedback*/}
                    {/*    rules={[*/}
                    {/*        ({ getFieldValue }) => ({*/}
                    {/*            validator(_, value) {*/}
                    {/*                if (!value || getFieldValue('password') === value) {*/}
                    {/*                    return Promise.resolve();*/}
                    {/*                }*/}

                    {/*                return Promise.reject(new Error('The two passwords that you entered do not match!'));*/}
                    {/*            },*/}
                    {/*        }),*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Input.Password*/}
                    {/*        placeholder={"Confirm password(optional)"}*/}
                    {/*        allowClear/>*/}
                    {/*</Form.Item>*/}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*---------------------------- end new event modal ----------------------------*/}

        </>
    );
};