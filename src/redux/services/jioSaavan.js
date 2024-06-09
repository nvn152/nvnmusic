import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jioSaavanApi = createApi({
  reducerPath: "jioSaavanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://saavn-api-xi.vercel.app",
    //    baseUrl: "http://localhost:3000",
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
    getSongRelated: builder.query({
      query: ({ artistId, songid }) =>
        `/artists/${artistId}/recommendations/${songid}`,
    }),
    getArtistSongs: builder.query({
      query: ({ artistId, page }) => `/artists/${artistId}/songs?page=${page}`,
    }),

    //Search API
    getSongsBySearch: builder.query({
      query: ({ searchTerm }) => `/search/songs?query=${searchTerm}&limit=200`,
    }),
    getAlbumsBySearch: builder.query({
      query: ({ searchTerm }) => `/search/albums?query=${searchTerm}&limit=200`,
    }),
    getArtistsBySearch: builder.query({
      query: ({ searchTerm }) =>
        `/search/artists?query=${searchTerm}&limit=200`,
    }),

    //Details API
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/?id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs?id=${songid}`,
    }),

    getTopCharts: builder.query({
      query: () => `/modules?charts`,
    }),
    getTopPlayLists: builder.query({
      query: () => `/modules?playlists`,
    }),
    getTrendingAblums: builder.query({
      query: () => `/modules?albums`,
    }),
    getAlbumSong: builder.query({
      query: ({ albumId }) => `/albums?id=${albumId}`,
    }),
    getSongByTrackId: builder.query({
      query: ({ trackId }) => `/songs?id=${trackId}`,
    }),
  }),
});

export const {
  useGetHomepageDataQuery,
  useGetSongDetailsQuery,

  useGetSongRelatedQuery,
  useGetArtistSongsQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetTrendingSongsQuery,
  useGetTopChartsQuery,
  useGetPlaylistSongsQuery,
  useGetTrendingAblumsQuery,
  useGetAlbumSongQuery,
  useGetSongByTrackIdQuery,
  useGetAlbumsBySearchQuery,
  useGetArtistsBySearchQuery,
  useGetTopPlayListsQuery,
} = jioSaavanApi;
