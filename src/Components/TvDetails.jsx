import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { TvActions, removeTv } from "../Store/Actions/TvActions ";
import Loading from "../Components/Loading";
import { FaArrowLeft, FaPlay, FaImdb, FaExternalLinkAlt } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";
import HorizontalCards from "./Template/HorizonalCards";

function TvDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(TvActions(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);

  if (!info) return <Loading />;

  const { detail, externalid, recommendations, similar, watchproviders } = info;

  if (!detail)
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">TV Show not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section with Backdrop */}
      <div
        className="relative min-h-[80vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(24,24,27,1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-black/20 rounded-full transition-colors"
            >
              <FaArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-4">
              {detail.homepage && (
                <a
                  href={detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                </a>
              )}
              {externalid?.wikidata_id && (
                <a
                  href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  <SiWikidata className="w-6 h-6" />
                </a>
              )}
              {externalid?.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${externalid.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FaImdb className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* TV Info */}
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-start gap-8">
          {/* Poster */}
          <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={
                detail.poster_path
                  ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
                  : "/Noimg.jpg"
              }
              alt={detail.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {detail.name || detail.title}
              <span className="text-xl text-zinc-400 ml-2">
                (
                {detail.first_air_date
                  ? new Date(detail.first_air_date).getFullYear()
                  : "N/A"}
                )
              </span>
            </h1>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                  {detail.vote_average
                    ? (detail.vote_average * 10).toFixed()
                    : "N/A"}
                  % Rating
                </span>
                <span className="text-zinc-400">
                  {detail.episode_run_time && detail.episode_run_time.length > 0
                    ? `${detail.episode_run_time[0]} min/ep`
                    : "N/A"}
                </span>
              </div>

              <p className="text-lg italic text-zinc-400">
                {detail.tagline || "N/A"}
              </p>

              <div>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-zinc-300">{detail.overview || "N/A"}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {detail.genres && detail.genres.length > 0 ? (
                    detail.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-zinc-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-400">N/A</span>
                  )}
                </div>
              </div>

              <Link
                to={`${pathname}/trailer`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPlay />
                Play Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Providers */}
      {watchproviders && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {watchproviders.flatrate && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Available on Platforms
                </h2>
                <div className="flex flex-wrap gap-4">
                  {watchproviders.flatrate.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {watchproviders.rent && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Available to Rent
                </h2>
                <div className="flex flex-wrap gap-4">
                  {watchproviders.rent.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {watchproviders.buy && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Available to Buy
                </h2>
                <div className="flex flex-wrap gap-4">
                  {watchproviders.buy.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Seasons */}
      {detail.seasons && detail.seasons.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Seasons</h2>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {detail.seasons.map((season, idx) => (
              <div
                key={season.id || idx}
                className="min-w-[180px] bg-zinc-800 rounded-xl shadow-lg p-3 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-200"
              >
                <img
                  src={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : '/Noimg.jpg'}
                  alt={season.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <div className="text-white text-center">
                  <div className="font-semibold text-base mb-1 line-clamp-2">{season.name}</div>
                  <div className="text-xs text-zinc-400 mb-1">{season.air_date ? season.air_date.split('-')[0] : 'N/A'}</div>
                  <div className="text-xs text-zinc-400">Episodes: {season.episode_count ?? 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {(recommendations?.length > 0 || similar?.length > 0) && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {recommendations?.length > 0 ? "Recommendations" : "Similar Shows"}
          </h2>
          <HorizontalCards
            data={recommendations?.length > 0 ? recommendations : similar}
          />
        </div>
      )}

      <Outlet />
    </div>
  );
}
export default TvDetails;
