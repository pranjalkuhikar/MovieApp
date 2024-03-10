/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import Topnav from "./Template/Topnav";
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
    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full px-20 flex items-center justify-center gap-5 ">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-5">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#18181B] rounded-full hover:bg-white duration-300 w-9 h-9 p-1"
          />
          Trending<small className="text-sm text-zinc-600">({category})</small>
        </h1>
        <Topnav />
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
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
