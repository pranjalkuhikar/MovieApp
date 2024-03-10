/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MovieActions, removeMovie } from "../Store/Actions/MovieActions";
import Loading from "../Components/Loading";
import { FaArrowLeft } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";
import { FaPlay } from "react-icons/fa";
import HorizontalCards from "./Template/HorizonalCards";

function MovieDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(MovieActions(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 32%",
        backgroundRepeat: "no-repeat",
        height: "100",
        width: "100",
      }}
      className="relative h-fit lg:px-40 sm:px-20 p-[2%] overflow-x-hidden"
    >
      {/* Part-1 (Navigation)*/}
      <nav className="w-full flex items-center gap-5">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-5">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#18181B] rounded-full hover:bg-white duration-300 w-12 h-12 p-1"
          />
        </h1>
        <a target="_blank" href={info.detail.homepage}>
          <FaExternalLinkAlt className="text-blue-500 duration-300 w-7 h-7 p-1" />
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <SiWikidata className="duration-300 w-8 h-8 py-1" />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          <FaImdb className="text-yellow-500 duration-300 w-8 h-8 p-1" />
        </a>
      </nav>
      {/* Part-2 (Poster and Details)*/}
      <div className="w-full lg:flex md:flex items-center gap-10 mt-14">
        <img
          className="h-[50vh] object-cover object-[50%,20%] mx-auto rounded-xl mb-1"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="text-white font-semibold max-sm:px-14">
          <h1 className="lg:text-6xl max-md:text-4xl max-sm:text-3xl sm:mt-5 mb-5">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <span className="text-xl text-zinc-400">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="flex flex-col ">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              Duration : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {info.detail.runtime}min
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              User Rating : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {(info.detail.vote_average * 10).toFixed()}%
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              Release Date : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {info.detail.release_date}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              Tagline : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {info.detail.tagline}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              Genres : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {info.detail.genres.map((g) => g.name).join(", ")}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg">
              Overview : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md">
                {info.detail.overview}
              </span>
            </h1>
            <Link
              to={`${pathname}/trailer`}
              className="px-5 py-3 mt-7 bg-blue-500 w-fit max-sm:mx-auto rounded-lg flex items-center gap-2"
            >
              <FaPlay />
              Play Trailer
            </Link>
          </div>
        </div>
      </div>
      {/* Part-3 (Available Platform) */}
      <div className="w-full mt-10 text-white">
        {info.watchproviders && info.watchproviders.flatrate && (
          <h1 className="lg:text-2xl md:text-xl mb-2 sm:text-lg flex items-center">
            Available on Platform : &nbsp;
            <span className="lg:text-xl md:text-lg sm:text-md flex gap-5">
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover object-[50%,20%] rounded-xl mb-1"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                />
              ))}
            </span>
          </h1>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <h1 className="lg:text-2xl md:text-xl mb-2 sm:text-lg flex items-center">
            Available to Buy : &nbsp;
            <span className="lg:text-xl md:text-lg sm:text-md flex gap-5">
              {info.watchproviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover object-[50%,20%] rounded-xl mb-1"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                />
              ))}
            </span>
          </h1>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <h1 className="lg:text-2xl md:text-xl mb-2 sm:text-lg flex items-center">
            Available to Rent : &nbsp;
            <span className="lg:text-xl md:text-lg sm:text-md flex gap-5">
              {info.watchproviders.rent.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover object-[50%,20%] rounded-xl mb-1"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                />
              ))}
            </span>
          </h1>
        )}
      </div>
      {/* Part-4 (Recommendations & Similar Movies) */}
      <hr className="mt-10 border-zinc-400 border-[1px]" />
      <div>
        <h1 className="lg:text-5xl font-semibold text-white max-md:text-4xl max-sm:text-3xl lg:mt-5 max-sm:mt-10 mb-5">
          Recommendations
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
