import axios from "../../Utiles/Axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const GetSearch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setSearches(data.results);
    } catch (err) {
      console.log("Error:-" + err);
    }
  };

  useEffect(() => {
    GetSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <div className="lg:w-full md:w-[80%] sm:w-[20%]">
        <div className="relative h-[10vh] flex items-center justify-start ml-[15%] gap-4 ">
          <FiSearch className="text-zinc-200 text-2xl" />
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search Movie"
            className="w-[50%] p-3 border-none outline-none bg-transparent text-zinc-200 font-semibold text-xl"
          />
          {query.length > 0 && (
            <IoCloseSharp
              onClick={() => setQuery("")}
              className="text-zinc-200 text-2xl"
            />
          )}
          <div className="z-[100] w-[50%] max-sm:w-fit max-h-[60vh] bg-zinc-100 overflow-auto absolute top-[100%] left-[3.5%] rounded-xl">
            {searches.map((elem, index) => (
              <Link
                to={`/${elem.media_type}/details/${elem.id}`}
                className="p-10 w-[100%] flex items-center justify-start border-b-2 border-zinc-200 font-semibold text-zinc-900 text-lg hover:text-zinc-100 hover:bg-zinc-700 duration-500"
                key={index}
              >
                <img
                  className="w-[10vh] h-[10vh] object-cover rounded-lg mr-5 shadow-lg"
                  src={
                    elem.backdrop_path || elem.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          elem.backdrop_path || elem.profile_path
                        }`
                      : "../../../Noimg.jpg"
                  }
                  alt=""
                />
                <span>
                  {elem.title ||
                    elem.name ||
                    elem.original_name ||
                    elem.original_title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Topnav;
