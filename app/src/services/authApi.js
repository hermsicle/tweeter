import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create API for sign up and login

const baseUrl = "/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    postSignup: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    postLogin: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { usePostSignupMutation, usePostLoginMutation } = authApi;
