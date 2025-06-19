/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft } from "react-icons/fa6";
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
  const [loading, setLoading] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        // Transform the data to ensure proper image paths
        const transformedResults = data.results.map((person) => ({
          ...person,
          profile_path: person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : "/Noimg.jpg",
          media_type: "person",
        }));
        setPeople((prevState) => [...prevState, ...transformedResults]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error:-" + err);
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setLoading(true);
    setHasMore(true);
    setPage(1);
    setPeople([]);
    setTimeout(() => {
      GetPeople();
    }, 0);
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  if (loading) return <Loading />;

  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <FaArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Popular People</h1>
        </div>

        <InfiniteScroll
          dataLength={people.length}
          next={GetPeople}
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
          <Cards data={people} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default People;
