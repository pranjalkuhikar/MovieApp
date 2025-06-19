import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
function HorizonalCards({ data = [] }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="aspect-[2/3] rounded-xl bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <motion.button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-r-lg 
          opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all duration-200
          backdrop-blur-sm disabled:opacity-0 lg:block hidden"
        disabled={scrollContainerRef.current?.scrollLeft === 0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoChevronBack className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-l-lg 
          opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all duration-200
          backdrop-blur-sm lg:block hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoChevronForward className="w-6 h-6" />
      </motion.button>

      {/* Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {data.map((item, index) => {
          // Determine media type
          let mediaType = item.media_type;
          if (!mediaType) {
            if (item.first_air_date) mediaType = "tv";
            else if (item.release_date) mediaType = "movie";
            else if (item.profile_path) mediaType = "person";
          }
          if (mediaType === "person") mediaType = "people";
          if (!mediaType) return null; // Do not render if still undefined
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-none"
            >
              <Link
                to={`/${mediaType}/details/${item.id}`}
                className="block w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] group/card"
              >
                {/* Card */}
                <motion.div
                  className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Image */}
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/Noimg.jpg"
                    }
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover/card:opacity-100"
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute bottom-0 p-3 md:p-4 w-full">
                      {/* Rating */}
                      <motion.div
                        className="flex items-center gap-1 mb-2"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        <FaStar className="text-yellow-500 text-sm md:text-base" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {item.vote_average?.toFixed(1)}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        className="text-white font-semibold line-clamp-2 text-xs md:text-sm"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        {item.title || item.name}
                      </motion.h3>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HorizonalCards;
