import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTrending: build.query<TRENDING.GetResponse, TOPRATED.GetRequest>({
      query: (query) => ({
        url: `/trending/movie/${query}`,
        method: "GET",
      }),
      providesTags: ["trendeing"],
    }),
  }),
});

export const { useGetTrendingQuery } = api;
