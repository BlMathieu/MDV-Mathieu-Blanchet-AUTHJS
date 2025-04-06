import { createSlice } from "@reduxjs/toolkit";
import AuthenticationResponse from "../../types/AuthenticationResponse";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../../types/UserType";
import { loginThunk, logoutThunk, otpThunk, refreshThunk } from "./AuthenticationThunk";

export interface AuthenticationSlice {
    token: string,
    user: UserToken,
    isLogged: boolean,
    hasExpired: boolean,
}
const initialState: AuthenticationSlice = {
    token: '',
    user: {
        email: "",
        username: "",
        role: "étudiant",
        mfaValidated: false,
    },
    hasExpired: false,
    isLogged: false,
}

const handleLogin = (state: any, action: any) => {
    const data = action.payload as AuthenticationResponse;
    state.token = data.token;
    state.user = jwtDecode(data.token);
    state.isLogged = data.status;
    console.log("UPDATE !");
}
const resetState = (state: any) => {
    state.isLogged = initialState.isLogged;
    state.user = initialState.user;
    state.token = initialState.token;
    state.hasExpired = initialState.hasExpired;
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        setExpired: (state, action) => {
            state.hasExpired = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, handleLogin)
            .addCase(loginThunk.rejected, resetState)
            .addCase(refreshThunk.fulfilled, handleLogin)
            .addCase(refreshThunk.rejected, resetState)
            .addCase(otpThunk.fulfilled, handleLogin)
            .addCase(otpThunk.rejected, resetState)
            .addCase(logoutThunk.fulfilled, resetState)
    }
});
export const { setExpired } = authenticationSlice.actions
export default authenticationSlice;