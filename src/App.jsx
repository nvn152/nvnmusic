import { Loader, Error } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";
import Library from "./pages/Library";
import YourAccount from "./pages/YourAccount";

import Trending from "./pages/Trending";
import Albums from "./pages/Albums";

import AlbumSongsList from "./components/AlbumSongsList";
import PlayListSongsList from "./pages/PlayListSongsList";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./_root/RootLayout";
import InQueue from "./components/InQueue";
import ActiveSong from "./pages/ActiveSong";
import ScrollToTop from "./utils/ScrollToTop";

const router = createBrowserRouter([
  {
    element: <Rootlayout />,
    loader: Loader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Discover />,
        loader: Loader,
      },
      {
        path: "/trending",
        element: <Trending />,
        loader: Loader,
      },
      {
        path: "/albums",
        element: <Albums />,
        loader: Loader,
      },
      {
        path: "/albums/:albumId",
        element: <AlbumSongsList />,
        loader: Loader,
      },
      {
        path: "/top-artists",
        element: <TopArtists />,
        loader: Loader,
      },
      {
        path: "/top-charts",
        element: <TopCharts />,
        loader: Loader,
      },
      {
        path: "/around-you",
        element: <AroundYou />,
        loader: Loader,
      },
      {
        path: "/artists/:id",
        element: <ArtistDetails />,
        loader: Loader,
      },
      {
        path: "/songs/:songid",
        element: <SongDetails />,
        loader: Loader,
      },
      {
        path: "/playlist/:playlistId",
        element: <PlayListSongsList />,
        loader: Loader,
      },
      {
        path: "/search/:searchTerm",
        element: <Search />,
        loader: Loader,
      },
      {
        path: "/library",
        element: <Library />,
        loader: Loader,
      },
      {
        path: "/your-account",
        element: <YourAccount />,
        loader: Loader,
      },
      {
        path: "/inqueue",
        element: <InQueue />,
        loader: Loader,
      },
      {
        path: "/activesong",
        element: <ActiveSong />,
        loader: Loader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
