import { createListenerMiddleware } from "@reduxjs/toolkit";
import { refreshThunk } from "./AuthenticationThunk";
import { AuthenticationSlice } from "./AuthenticationSlicer";

const refreshAuthMiddleware = createListenerMiddleware();

refreshAuthMiddleware.startListening({
    predicate: (_action, currentState: any, oldState: any) => {
        return !currentState.authentication.isLogged && oldState.authentication.isLogged;
    },
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState() as AuthenticationSlice;
        if (!state.isLogged) listenerApi.dispatch(refreshThunk());
    }
});

export default refreshAuthMiddleware;