/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// eslint-disable-next-line no-unused-vars
function Cards({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 p-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="aspect-[2/3] rounded-xl bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 p-4">
      {data.map((item, index) => {
        // Determine image source
        let imageSrc = "/Noimg.jpg";
        if (
          item.media_type === "person" ||
          item.known_for_department === "Acting"
        ) {
          imageSrc = item.profile_path
            ? item.profile_path.startsWith("http")
              ? item.profile_path
              : `https://image.tmdb.org/t/p/w500${item.profile_path}`
            : "/Noimg.jpg";
        } else {
          imageSrc = item.poster_path
            ? item.poster_path.startsWith("http")
              ? item.poster_path
              : `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/Noimg.jpg";
        }
        // Determine media type for routing
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
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={`/${mediaType}/details/${item.id}`}
              className="block group/card"
            >
              {/* Card */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800">
                {/* Image */}
                <img
                  src={imageSrc}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-3 md:p-4 w-full">
                    {/* Rating */}
                    {mediaType !== "person" && (
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-yellow-500 text-sm md:text-base" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {item.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-white font-semibold line-clamp-2 text-xs md:text-sm">
                      {item.title || item.name}
                    </h3>

                    {/* Year - if available */}
                    {item.release_date && (
                      <p className="text-zinc-400 text-xs mt-1">
                        {new Date(item.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Cards;
