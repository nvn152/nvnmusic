import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jioSaavanApi = createApi({
  reducerPath: "jioSaavanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://saavn.dev",
  }),
  endpoints: (builder) => ({
    getHomepageData: builder.query({
      query: (languages) => `/modules?language=${languages.join(",")}`,
    }),

    getTrendingSongs: builder.query({
      query: () => `/modules?trending`,
    }),

    getPlaylistSongs: builder.query({
      query: ({ playlistId }) => `/playlists?id=${playlistId}`,
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
    getArtistSongs: builder.query({
      query: (artistId) => `/artists/${artistId}/songs?page=1`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/songs?query=${searchTerm}&limit=200`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/?id=${artistId}`,
    }),
    getTopCharts: builder.query({
      query: () => `/modules?charts`,
    }),
    getTrendingAblums: builder.query({
      query: () => `/modules?albums`,
    }),
    getAlbumSong: builder.query({
      query: ({ albumId }) => `/albums?id=${albumId}`,
    }),
  }),
});

export const {
  useGetHomepageDataQuery,
  useGetSongDetailsQuery,
  useGetLyricsQuery,
  useGetSongRelatedQuery,
  useGetArtistSongsQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetTrendingSongsQuery,
  useGetTopChartsQuery,
  useGetPlaylistSongsQuery,
  useGetTrendingAblumsQuery,
  useGetAlbumSongQuery,
} = jioSaavanApi;
