import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserCredentials } from "../../types/UserType";
import AuthenticationResponse, { BaseResponse } from "../../types/AuthenticationResponse";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_SERVER_URL

export const loginThunk = createAsyncThunk('login', async (credentials: UserCredentials) => {
    const url = `${baseUrl}/authentication/login`;
    const response = await axios.post<AuthenticationResponse>(url, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    const content = response.data;
    if (content.status) toast.success(content.message);
    else toast.error(content.message);
    return content;
});

export const refreshThunk = createAsyncThunk('refresh', async () => {
    const url = `${baseUrl}/authentication/refresh`;
    const response = await axios.post<AuthenticationResponse>(url, {}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    const content = response.data;
    if (content.status) toast.success(content.message);
    else toast.error(content.message);
    return content;
});

export const otpThunk = createAsyncThunk('otpThunk', async (secret: string, thunk) => {
    const url = `${baseUrl}/authentication/otp`;
    const state:any = thunk.getState();
    const response = await axios.post(url, { secret: secret }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.authentication.token}`
        },
        withCredentials: true,
    });
    const content = response.data;
    if (content.status) toast.success(content.message);
    else toast.error(content.message);
    return content;
});

export const logoutThunk = createAsyncThunk('logout', async () => {
    const url = `${baseUrl}/authentication/logout`;
    const response = await axios.post<BaseResponse>(url, {}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    const content = response.data;
    if (content.status) toast.success(content.message);
    else toast.error(content.message);
});