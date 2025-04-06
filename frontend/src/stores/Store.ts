import refreshAuthMiddleware from "./authentication/AuthenticationMiddleware";
import authenticationSlice from "./authentication/AuthenticationSlicer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(refreshAuthMiddleware.middleware)
});
export default store;
export type RootState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;