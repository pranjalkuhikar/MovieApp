import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiBardFill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiTelevisionFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { BsInfoSquareFill } from "react-icons/bs";
function Sidenav() {
  return (
    <div className="w-[20%] h-full max-sm:border-none border-r-2 border-zinc-500 p-10  max-sm:w-full  max-sm:p-0 max-sm:m-0 max-sm:absolute max:sm:top-0 max-sm:left-0 max-sm:flex max-sm:items-start  max-sm:justify-between ">
      <h1 className="flex items-center text-3xl max-sm:text-xl text-white font-semibold">
        <PiTelevisionSimpleFill className="text-4xl max-sm:text-7xl" />
        Movie App
      </h1>
      <nav className=" flex flex-col gap-2 max-sm:text-xs max-sm:flex-row max-sm:flex-wrap max-sm:w-full max-sm:items-center max-sm:mt-3 ">
        <h1 className="text-white font-semibold  max-sm:hidden mt-10 max-sm:mt-0 max-sm:p-0 p-4 text-xl max-sm:text-lg">
          <u>New Feeds</u>
        </h1>
        <Link
          to="/trending"
          className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg"
        >
          <FaFire /> Trending
        </Link>
        <Link
          to="/popular"
          className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg"
        >
          <RiBardFill /> Popular
        </Link>
        <Link
          to="/movie"
          className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg"
        >
          <BiSolidMoviePlay /> Movies
        </Link>
        <Link
          to="/tv"
          className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg"
        >
          <PiTelevisionFill /> Tv Shows
        </Link>
        <Link
          to="/people"
          className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg"
        >
          <BsPeopleFill /> People
        </Link>
      </nav>
      <hr className="mt-10 border-none bg-zinc-500 h-[1px]  max-sm:hidden" />
      <nav className=" flex flex-col gap-2 max-sm:hidden">
        <h1 className="text-white font-semibold mt-5 max-sm:mt-0 max-sm:p-0 p-4 text-xl max-sm:text-lg">
          <u>Website Information</u>
        </h1>
        <Link className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg">
          <BsInfoSquareFill /> About
        </Link>
        <Link className="max-sm:text-sm max-sm:mt-0 max-sm:p-0 text-[#A1A1AA] font-semibold flex items-center gap-2 text-xl hover:text-white hover:bg-[#18181B] duration-300 p-4 rounded-lg">
          <TiContacts /> Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
