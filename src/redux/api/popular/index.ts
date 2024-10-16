import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPopular: build.query<POPULAR.GetResponse, POPULAR.GetRequest>({
      query: (query) => ({
        url: `/${query}/popular`,
        method: "GET",
      }),
      providesTags: ["popular"],
    }),
  }),
});

export const { useGetPopularQuery } = api;
