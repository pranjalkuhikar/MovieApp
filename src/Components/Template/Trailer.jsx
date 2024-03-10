import { IoCloseSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return (
    <div className="fixed z-[999] top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.9)]">
      <IoCloseSharp
        onClick={() => navigate(-1)}
        className="absolute right-[9%] top-[11%] hover:text-[#18181B] rounded-full hover:scale-125 bg-white duration-300 w-9 h-9 p-1"
      />
      {ytvideo ? (
        <ReactPlayer
          controls
          height={600}
          width={1200}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
