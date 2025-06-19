import { Link } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";

/* eslint-disable react/prop-types */
function Header({ data }) {
  const bgUrl =
    data.backdrop_path || data.profile_path
      ? `url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`
      : undefined;

  // Map 'person' to 'people' for routing
  const routeMediaType =
    data.media_type === "person" ? "people" : data.media_type;

  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end items-start gap-2 p-[5%] text-white bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: bgUrl
          ? `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)), ${bgUrl}`
          : undefined,
      }}
      aria-label={data.title || data.name || "Header background"}
    >
      <h1 className="text-5xl max-sm:text-4xl w-[70%] font-bold p-1 drop-shadow-lg">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      <p className="text-sm max-sm:text-xs font-semibold w-[70%]">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${routeMediaType}/details/${data.id}`}
          className="text-blue-400 underline ml-1"
        >
          more
        </Link>
      </p>
      <p className="flex max-sm:text-xs items-center gap-1 text-lg">
        <CiCalendarDate className="text-2xl text-zinc-300" />
        {data.release_date || "No Information"}
        <RiMovie2Fill className="text-2xl ml-5 text-zinc-300" />
        {data.media_type?.toUpperCase?.()}
      </p>
      <Link
        to={`/${routeMediaType}/details/${data.id}/trailer`}
        className="max-sm:text-xs px-5 py-2 rounded-md bg-white text-black w-fit font-semibold capitalize hover:bg-blue-500 hover:text-white duration-300 shadow"
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
