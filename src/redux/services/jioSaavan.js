import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jioSaavanApi = createApi({
  reducerPath: "jioSaavanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://saavn.me",
  }),
  endpoints: (builder) => ({
    getHomepageData: builder.query({
      query: (languages) => `/modules?language=${languages.join(",")}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs?id=${songid}`,
    }),
    getLyrics: builder.query({
      query: ({ songid }) => `/lyrics?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ artistId, songid }) =>
        `/artists/${artistId}/recommendations/${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/${artistId}/songs?page=1`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/songs?query=${searchTerm}&limit=200`,
    }),
  }),
});

export const {
  useGetHomepageDataQuery,
  useGetSongDetailsQuery,
  useGetLyricsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} = jioSaavanApi;
