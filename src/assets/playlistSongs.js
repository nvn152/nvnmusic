import {
  useGetPlaylistSongsQuery,
  useGetTopPlayListsQuery,
} from "../redux/services/jioSaavan";

const usePlaylistSongs = (playlistNumber) => {
  const {
    data: playlists,
    isFetching: isFetchingPlaylist,
    error: playListError,
  } = useGetTopPlayListsQuery();

  const { data: playlistSongs0 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  const { data: playlistSongs1 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  const { data: playlistSongs2 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  const { data: playlistSongs3 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  const { data: playlistSongs4 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  const { data: playlistSongs5 } = useGetPlaylistSongsQuery({
    playlistId: playlists?.data?.playlists[playlistNumber]?.id,
  });

  return {
    playlistSongs0,
    playlistSongs1,
    playlistSongs2,
    playlistSongs3,
    playlistSongs4,
    playlistSongs5,
  };
};

export default usePlaylistSongs;
