import { createSlice } from "@reduxjs/toolkit";
import AuthenticationResponse from "../../types/AuthenticationResponse";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../../types/UserType";
import toast from "react-hot-toast";

export interface AuthenticationSlice {
    token: string,
    user: UserToken,
    isLogged: boolean,
}
const initialState: AuthenticationSlice = {
    token: '',
    user: {
        email: "",
        username: "",
        role: "étudiant",
    },
    isLogged: false,
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        logout: (state: AuthenticationSlice) => {
            state.isLogged = initialState.isLogged;
            state.user = initialState.user;
            state.token = initialState.token;

        },
        login: (state, action) => {
            const data = action.payload as AuthenticationResponse;
            state.token = data.token;
            state.user = jwtDecode(data.token);
            state.isLogged = data.status;
        }
    }
});
export const { logout, login } = authenticationSlice.actions
export default authenticationSlice;