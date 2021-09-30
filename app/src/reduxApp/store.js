import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { userSlice } from "./user/userSlice";

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice.reducer,
  },
});
