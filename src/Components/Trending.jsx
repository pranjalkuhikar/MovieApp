/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DropDown from "./Template/DropDown";
import axios from "../Utiles/Axios";
import { useEffect, useState } from "react";
import Cards from "./Template/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  document.title = "Movie App | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error:-" + err);
    }
  };

  const refreshHandler = () => {
    setHasMore(true);
    setPage(1);
    setTrending([]);
    setTimeout(() => {
      GetTrending();
    }, 0);
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full min-h-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-semibold flex items-center gap-3">
          Trending<small className="text-sm text-zinc-600">({category})</small>
        </h1>
        <DropDown
          title="Category"
          options={["tv", "movie", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <DropDown
          title="Duration"
          options={["day", "week"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
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
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
