/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function Cards({ data, title }) {
  return (
    <div className="flex items-center justify-center  hover:shadow-white gap-10 flex-wrap lg:w-full h-full bg-zinc-800">
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          key={index}
          className="relative h-[50vh] lg:w-[20%] mb-10 p-4 rounded-xl  hover:drop-shadow-xl bg-[#18181B]"
        >
          <img
            className="w-full h-[90%] object-cover object-[50%,20%] rounded-xl mb-1"
            src={
              item.poster_path || item.backdrop_path || item.profile_path
                ? `https://image.tmdb.org/t/p/original${
                    item.poster_path || item.backdrop_path || item.profile_path
                  }`
                : "../../../Noimg.jpg"
            }
            alt=""
          />
          <h1 className="text-lg text-white font-semibold mb-1">
            {item.title ||
              item.name ||
              item.original_name ||
              item.original_title}
          </h1>
          {item.vote_average && (
            <div className="absolute bottom-[20%] right-[-6%] w-[6vh] h-[6vh] bg-yellow-500 rounded-full flex items-center justify-center font-semibold text-xl">
              {(item.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
