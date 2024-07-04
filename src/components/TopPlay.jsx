import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetRecommendationQuery,
  useGetArtistsQuery,
} from "../redux/services/shazamCore";
import "swiper/css/free-mode";
import { data } from "autoprefixer";

const TopChartCard = ({ song, i }) => {
  // ddd.log(song.album.name);
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const ArtistDetails = ({ artistId }) => {
  // const data2 = useGetArtistsQuery();
  const {
    artdata: artistData,
    error,
    isLoading,
  } = useGetArtistsQuery(artistId);
  // console.log(artist);
  const artID = artistId;
  const artist = artistData?.artists?.[0];
  // console.log("artist", artID);
  console.log("data", artistData);

  if (isLoading) return <p>Loading artist details...</p>;
  if (error) return <p>Error fetching artist details</p>;

  return (
    <div>
      {/* {artist?.images?.[0]?.url && ( */}
      <img
        // src={artist.images[0].url}
        src="data:image/webp;base64,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"
        alt={artist?.name}
        className="w-12 h-12 rounded-full object-cover border-red-100"
      />
      {/* <h1>{artist.name}</h1> */}
      {/* )} */}
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const data1 = useGetRecommendationQuery();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const TopPlays = data1.data?.tracks?.slice(0, 5);
  // console.log(TopPlays);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data1, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">
              See more...
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {TopPlays?.map((song, i) => (
            <TopChartCard key={song.id} song={song} i={i} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Artist</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">
              See more...
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {TopPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0]?.id}`}>
                {song?.artists[0]?.id && (
                  <ArtistDetails artistId={song.artists[0].id} />
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
