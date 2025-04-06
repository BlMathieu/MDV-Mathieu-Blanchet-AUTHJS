import { createListenerMiddleware } from "@reduxjs/toolkit";
import { refreshThunk } from "./AuthenticationThunk";
import { AuthenticationSlice, setExpired } from "./AuthenticationSlicer";

const refreshAuthMiddleware = createListenerMiddleware();

refreshAuthMiddleware.startListening({
    predicate: (_action, currentState: any, _oldState:any) => {
        return currentState.authentication.hasExpired;
    },
    effect: async (_action, listenerApi) => {
        listenerApi.dispatch(setExpired(false));
        const state = listenerApi.getState() as AuthenticationSlice;
        if (!state.isLogged) listenerApi.dispatch(refreshThunk());
    }
});

export default refreshAuthMiddleware;