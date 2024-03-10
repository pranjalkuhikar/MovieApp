/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
import Topnav from "./Template/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../Utiles/Axios";
import { useEffect, useState } from "react";
import Cards from "./Template/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function People() {
  document.title = "Movie App | People";
  const navigate = useNavigate();
  const [category] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error:-" + err);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setPage(1);
      setPeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2%] flex items-center justify-center gap-5 ">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-5">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#18181B] rounded-full hover:bg-white duration-300 w-9 h-9 p-1"
          />
          People<small className="text-sm text-zinc-600">({category})</small>
        </h1>
        <Topnav />
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
