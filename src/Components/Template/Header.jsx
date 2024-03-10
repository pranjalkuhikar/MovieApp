import { Link } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";

/* eslint-disable react/prop-types */
function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "50% 32%",
        backgroundRepeat: "no-repeat",
        height: "100",
        width: "100",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start gap-2 p-[5%] text-white"
    >
      <h1 className="text-5xl max-sm:text-4xl w-[70%] font-bold p-1">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      <p className="text-sm max-sm:text-xs font-semibold w-[70%]">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="flex max-sm:text-xs items-center gap-1 text-lg">
        <CiCalendarDate className="text-2xl text-zinc-300" />
        {data.release_date || "No Information"}
        <RiMovie2Fill className="text-2xl ml-5 text-zinc-300" />
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="max-sm:text-xs px-5 py-2 rounded-md bg-white text-black w-fit font-semibold capitalize hover:bg-blue-500 hover:text-white duration-300"
      >
        watch trailer
      </Link>
    </div>
  );
}

export default Header;
