import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();
export const loginCall = async (userCredential, dispatch) => {

    dispatch({type: "LOGIN_START"});

    try {
        const res = await axios.post(process.env.API_URL + "api/auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});

    } catch (e) {
        dispatch({type: "LOGIN_FAILURE", payload: e});
    }

};