import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create action for signupUser ** Note: actions goes on top of slice
export const signupUser = createAsyncThunk(
  "users/signupUser",
  // Destructuring our form inputs in the first parameter
  async ({ username, email, password }, thunkAPI) => {
    console.log(username, email, password);
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      const data = await response;
      console.log(data);
      if (data.status === 200) {
        console.log(data.status, "success");
        localStorage.setItem("token", data.data.user.token);
        return {
          ...data,
          username: data.data.user.username,
          email: data.data.user.email,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Create action to login user
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      console.log(username, password);
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { data, status } = await response;

      console.log(data, status);

      if (status === 200) {
        localStorage.setItem("token", data.account.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      console.log("Login Error: " + err.message);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    signedIn: false,
  },
  reducers: {
    // Reducers go here
    checkToken: (state, { payload }) => {
      console.log(payload);
    },
    logoutUser: (state, { payload }) => {
      if (payload.token !== null) {
        state.signedIn = false;
      }

      // Validate token to match user to backend
      // If pass, set signed in to true
    },
    clearState: (state) => {
      state.username = "";
      state.email = "";
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.signedIn = false;
    },
  },
  extraReducers: {
    // Extra reducers go here
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.username = payload.data.user.username;
      state.email = payload.data.user.email;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.signedIn = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload: ", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

// exporting userSelector and its returning  the  'user' named  slice
export const userSelector = (state) => state.user;

// export the clearState from userSlice reducer
export const { clearState, checkToken, logoutUser } = userSlice.actions;

/*createAsyncThunk accepts three parameters:
(1. a string action type, 2. a payloadCreator callback, 3. and an options object )

1. type argument of 'users.signupUser' will generate these action types:
  pending: 'users/signupUser/pending' 
  fulfilled: 'users/signupUser/fulfilled'
  rejected: 'users/signupUser/rejected;

  ***We will put these in the extraReducers in our userSlice

2. payloadCreator: a callback function that should return a promise containing the result of some async logic
  if there is an error, it should return a rejected promise containing the error

  ** If there is an error,
    return thunkApi.rejectWithValue(err message goes here)

  the payloadCreator can contain whatever logic you wish and has these two arguments:
  1. arg: a single value, containing the first parameter that was passed to the thunk action when it was first dispatched
    In this example we passed 'formInputs' in the thunk action and we destrucrtured the values as { username, email, password }
  
  2. thunkAPI: an object containing all the parameters that are usually passed to redux
    dispatch, getState, extra, requestId, signal, rejectWithValue(value, meta), ...


*/
