/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DropDown from "./Template/DropDown";
import axios from "../Utiles/Axios";
import { useEffect, useState } from "react";
import Cards from "./Template/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoFilter } from "react-icons/io5";

function Movie() {
  document.title = "Movie App | Movie";
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const filters = [
    { id: "popular", label: "Popular" },
    { id: "top_rated", label: "Top Rated" },
    { id: "upcoming", label: "Upcoming" },
    { id: "now_playing", label: "Now Playing" },
  ];

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${filter}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
        setLoading(false);
      } else {
        setHasMore(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setHasMore(false);
      alert("Failed to load movies. Check the console for details.");
      console.error("/movie API error:", err);
    }
  };

  const refreshHandler = () => {
    setHasMore(true);
    setPage(1);
    setMovies([]);
    setLoading(true);
    setTimeout(() => {
      GetMovie();
    }, 0);
  };

  useEffect(() => {
    refreshHandler();
  }, [filter]);

  if (loading && movies.length === 0) return <Loading />;

  return (
    <div className="min-h-screen bg-zinc-900 pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <h1 className="text-2xl font-bold text-white">Movies</h1>
        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-2">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === id
                  ? "bg-blue-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Filter Button - Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <IoFilter />
          Filter
        </button>
      </div>
      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden grid grid-cols-2 gap-2 mt-4 max-w-7xl mx-auto px-4">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setFilter(id);
                setShowFilters(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === id
                  ? "bg-blue-500 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4">
        <InfiniteScroll
          dataLength={movies.length}
          next={GetMovie}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-6">
              <div className="relative">
                <div className="w-10 h-10 border-4 border-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-10 h-10">
                  <div className="w-10 h-10 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          }
        >
          <Cards data={movies} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Movie;
