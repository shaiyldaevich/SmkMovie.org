import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/3`,
  prepareHeaders: (headers) => {
    if (process.env.NEXT_PUBLIC_API_TOKEN) {
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      );
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  tagTypes: [
    "upcoming",
    "trendeing",
    "popular",
    "top_rated",
    "details",
    "credits",
    "videos",
    "similar",
    "recommendations",
    "discover",
    "ganre",
  ],
  endpoints: () => ({}),
});
