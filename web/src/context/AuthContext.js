import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: null,
    user : {
        avtar: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
        createdAt: "2022-06-14T08:38:47.695Z",
        dob: null,
        email: "sss@gmail.com",
        email_verified: false,
        forgot_code: null,
        forgot_time: null,
        gender: null,
        mobile_number: null,
        name: "sss",
        social_detail: [],
        status: true,
        updatedAt: "2022-06-14T08:38:47.695Z",
        __v: 0,
        _id: "62a84917600df42f43fe2614",
        _type: null
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}