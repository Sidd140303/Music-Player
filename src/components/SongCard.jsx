import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  // const activeSong = "test";
  const imageUrl = song.album.images?.[0]?.url || "default-image-path.jpg";
  const songTitle = song.album.name;
  const songArtist = song.artists[0].name;

  const handlePauseClick = () => {};
  const handlePlayClick = () => {};

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center rounded-lg bg-black bg-opacity-30 group-hover:flex ${
            activeSong === songTitle
              ? "flex bg-black bg-opacity-40 rounded-lg"
              : "hidden"
          }   
         `}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          src={imageUrl}
          alt="song_img"
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{songTitle}</Link>
        </p>
        <p className="text-sm text-gray-300 truncate mt-1">
          <Link>{songArtist}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
