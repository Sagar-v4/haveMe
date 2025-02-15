import '../App.css';
import {
    EditOutlined,
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
    DatePicker,
    Tooltip,
    message, InputNumber
} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import Draggable from "react-draggable";
import axios from "axios";
const { Header, Content} = Layout;
const { Option } = Select;

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

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

    const showNewEventModal = () => {
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
            password: e.password
        }

        try {
            await axios.put(process.env.API_URL + "/api/user/" + user._id, editUser)
                .then(message.success('Profile Updated successfully..'));
            window.location.reload();
        } catch (err) {
            message.error(err.message);
        }
        setVisibleNewEvent(false);
    };

    const onNewEventFinishFailed = (errorInfo) => {
        message.error(errorInfo.message).then(r => {});
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
        const fetchUser = async () => {
            const res = await axios.get(process.env.API_URL + "/api/user/" + user._id);
            setCurrUser(res.data);
        };
        fetchUser().then(r => console.log(r));
    }, [user._id]);

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
                            <Col>
                                <div>
                                    <img style={{
                                        width: "200px",
                                        height: "200px",
                                    }} src={currUser.avtar} alt={currUser.avtar}/>
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


            {/*---------------------------- edit profile modal ----------------------------*/}
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
                            }} placeholder="mobile number *" allowClear/>
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

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                min: 6,
                                message: 'Password should be least 6!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder={"Password(optional)"}
                            allowClear/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*---------------------------- end edit profile modal ----------------------------*/}

        </>
    );
};