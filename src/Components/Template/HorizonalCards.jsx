import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function HorizonalCards({ data }) {
  return (
    <div className="w-[100%] h-[40vh] bg-[#27272A]  max-sm:min-h-[50vh] p-5 mb-5 flex overflow-y-hidden ">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            key={index}
            className="lg:min-w-[18%]  max-sm:min-w-[70%]  rounded-xl bg-[#18181B] p-3 mr-5 mb-2"
          >
            <img
              className="w-full h-[60%] object-cover rounded-xl"
              src={
                item.poster_path || item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${
                      item.poster_path || item.backdrop_path
                    }`
                  : "../../../Noimg.jpg"
              }
              alt=""
            />
            <div className=" p-3 h-[40%] overflow-y-auto">
              <h1 className="text-xl text-white font-semibold mb-1">
                {item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
              </h1>
              <p className="text-xs text-[#A1A1AA] font-semibold">
                {item.overview.slice(0, 45)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="lg:text-5xl font-semibold text-white max-md:text-4xl max-sm:text-3xl lg:mt-5 max-sm:mt-10 mb-5">
          Not Available
        </h1>
      )}
    </div>
  );
}

export default HorizonalCards;
