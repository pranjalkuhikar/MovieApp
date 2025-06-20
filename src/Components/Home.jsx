/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiTelevisionFill } from "react-icons/pi";
import axios from "../Utiles/Axios";
import HorizonalCards from "./Template/HorizonalCards";
import Loading from "./Loading";
import { motion } from "framer-motion";

function Home() {
  document.title = "Movie App | Home";
  const [loading, setLoading] = useState(true);
  const [heroMovie, setHeroMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroMovies, setHeroMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending movies for hero section
        const trendingResponse = await axios.get("/trending/movie/day");
        const heroData = trendingResponse.data.results.slice(0, 5); // Get top 5 movies for hero
        setHeroMovies(heroData);
        setHeroMovie(heroData[0]);

        // Fetch trending movies
        const moviesResponse = await axios.get("/movie/popular");
        setTrendingMovies(moviesResponse.data.results);

        // Fetch popular TV shows
        const showsResponse = await axios.get("/tv/popular");
        setPopularShows(showsResponse.data.results);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Auto-rotate hero movies every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroMovies.length;
        setHeroMovie(heroMovies[nextIndex]);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [heroMovies]);

  // Determine correct media type for heroMovie
  let heroMediaType = heroMovie?.media_type;
  if (!heroMediaType) {
    if (heroMovie?.first_air_date) heroMediaType = "tv";
    else if (heroMovie?.release_date) heroMediaType = "movie";
    else if (heroMovie?.profile_path) heroMediaType = "person";
  }
  if (heroMediaType === "person") heroMediaType = "people";

  if (loading || !heroMovie) return <Loading />;

  return (
    <div className="w-full bg-zinc-900">
      {/* Hero Section */}
      <motion.section
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Background */}
        <motion.div
          className="absolute inset-0"
          key={heroMovie.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 py-8 flex items-center">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
              layoutId={`movie-title-${heroMovie.id}`}
            >
              {heroMovie.title}
            </motion.h1>
            <motion.div
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded-full text-xs sm:text-sm font-semibold">
                {heroMovie.vote_average.toFixed(1)} Rating
              </span>
              <span className="text-zinc-300 text-sm sm:text-base">
                {new Date(heroMovie.release_date).getFullYear()}
              </span>
            </motion.div>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-zinc-300 mb-4 sm:mb-6 line-clamp-3 md:line-clamp-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {heroMovie.overview}
            </motion.p>
            <motion.div
              className="flex gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to={`/${heroMediaType}/details/${heroMovie.id}`}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 text-sm sm:text-base hover:scale-105"
              >
                <FaPlay />
                Watch Now
              </Link>
              <Link
                to={`/${heroMediaType}/details/${heroMovie.id}`}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-all duration-300 text-sm sm:text-base hover:scale-105"
              >
                More Info
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroMovies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => {
                setCurrentImageIndex(index);
                setHeroMovie(movie);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? "bg-blue-500 w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.section>

      {/* Featured Sections */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Trending Now */}
        <motion.section
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IoTrendingUp className="text-xl sm:text-2xl text-blue-500" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Trending Now
              </h2>
            </div>
            <Link
              to="/trending"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="-mx-4 sm:mx-0">
            <HorizonalCards data={trendingMovies} />
          </div>
        </motion.section>

        {/* Popular Movies */}
        <motion.section
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BiSolidMoviePlay className="text-xl sm:text-2xl text-blue-500" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Popular Movies
              </h2>
            </div>
            <Link
              to="/movie"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="-mx-4 sm:mx-0">
            <HorizonalCards data={trendingMovies} />
          </div>
        </motion.section>

        {/* Popular TV Shows */}
        <motion.section
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PiTelevisionFill className="text-xl sm:text-2xl text-blue-500" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Popular TV Shows
              </h2>
            </div>
            <Link
              to="/tv"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="-mx-4 sm:mx-0">
            <HorizonalCards data={popularShows} />
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Home;
