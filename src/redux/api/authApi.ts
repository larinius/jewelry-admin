import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

export interface User {
  username: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", `Basic ${process.env.REACT_APP_BW_CLIENT_ID!}`);
      headers.set("Content-Type", "application/x-www-form-urlencoded");
      headers.set("Accept", "application/json");

      const token = (getState() as RootState).persistedReducerAuth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/oauth/token",
        method: "POST",
        body: `username=${credentials.username}&password=${credentials.password}&grant_type=password`,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
