import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const saavanApi = createApi({
  reducerPath: "saavanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jio-saavan-api-bay.vercel.app/api",
  }),
  endpoints: (builder) => ({
    globalSearch: builder.query({
      query: ({ query }) => `/search?query=${query}`,
    }),

    songSuggestions: builder.query({
      query: ({ songid }) => `/songs/${songid}/suggestions`,
    }),

    songLyrics: builder.query({
      query: ({ songid }) => `/songs/${songid}/lyrics`,
    }),
  }),
});

export const {
  useGlobalSearchQuery,
  useSongSuggestionsQuery,
  useSongLyricsQuery,
} = saavanApi;