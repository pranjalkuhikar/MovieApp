/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "./Template/Header";
import Sidenav from "./Template/Sidenav";
import Topnav from "./Template/Topnav";
import axios from "../Utiles/Axios";
import HorizonalCards from "./Template/HorizonalCards";
import DropDown from "./Template/DropDown";
import Loading from "./Loading";

function Home() {
  document.title = "Movie App | Home";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeader = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (err) {
      console.log("Error:-" + err);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error:-" + err);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeader();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="lg:w-[100%] max-sm:w-[100%] h-full overflow-auto overflow-x-hidden max-sm:relative max-sm:top-16">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizonalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
