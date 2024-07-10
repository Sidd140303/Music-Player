import React from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchterm } = useParams();
  const { data1, isFetching, error } = useGetSongsBySearchQuery(searchterm);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songs = data1?.albums?.items.map((item) => item.data.name); // Extract song names
  console.log(songs); // Log the extracted song names

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing Results for <span>{searchterm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data1?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data1}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
