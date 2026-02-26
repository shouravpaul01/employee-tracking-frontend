import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithReauth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // try refresh token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User","Project","Analytics"],
  endpoints: (builder) => ({}),
});
