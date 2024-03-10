import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PeopleActions, removePeople } from "../Store/Actions/PeopleActions";
import Loading from "../Components/Loading";
import { FaArrowLeft } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";
import HorizonalCards from "./Template/HorizonalCards";
import DropDown from "../Components/Template/DropDown";
function PeopleDetails() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  useEffect(() => {
    dispatch(PeopleActions(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id]);
  return info ? (
    <div className="relative h-fit lg:px-40 sm:px-20 p-[2%] overflow-x-hidden bg-[#27272A]">
      {/* Part-1 (Navigation) */}
      <nav className="w-full flex items-center gap-5">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-5">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#18181B] rounded-full hover:bg-white duration-300 w-12 h-12 p-1"
          />
        </h1>
      </nav>
      {/* Part-2  (Personal Info)*/}
      <div className="w-full lg:flex md:flex items-center gap-10 mt-14">
        <img
          className="h-[50vh] object-cover object-[50%,20%] mx-auto rounded-xl mb-1"
          src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
          alt=""
        />
        <div className="text-white font-semibold max-sm:px-14">
          <h1 className="lg:text-6xl max-md:text-4xl max-sm:text-3xl sm:mt-5 mb-5">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
          </h1>
          <div className="flex flex-col ">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-zinc-100">
              DOB: &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md text-zinc-400">
                {info.detail.birthday}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-zinc-100">
              Profession : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md text-zinc-400">
                {info.detail.known_for_department}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-zinc-100">
              Gender : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md text-zinc-400">
                {info.detail.gender === 2 ? "Male" : "Female"}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-zinc-100">
              Also Know As : &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md text-zinc-400">
                {info.detail.also_known_as.join(", ")}
              </span>
            </h1>
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-zinc-100 ">
              Biography: &nbsp;
              <span className="lg:text-xl md:text-lg sm:text-md text-zinc-400 text-justify">
                {info.detail.biography.slice(0, 550)}
              </span>
            </h1>
          </div>
        </div>
      </div>
      {/* Part-3 (Social Icons)*/}
      <div className="w-full mt-3 text-white flex gap-9 bg-[#27272A]">
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <SiWikidata className="duration-300 w-12 h-12 py-1" />
        </a>
        <a
          target="_blank"
          href={`https://www.facebook.com/${info.externalid.facebook_id}`}
        >
          <FaFacebookSquare className="duration-300 w-12 h-12 py-1" />
        </a>
        <a
          target="_blank"
          href={`https://www.instagram.com/${info.externalid.instagram_id}`}
        >
          <RiInstagramFill className="duration-300 w-12 h-12 py-1" />
        </a>
        <a
          target="_blank"
          href={`https://twitter.com/${info.externalid.twitter_id}`}
        >
          <FaSquareXTwitter className="duration-300 w-12 h-12 py-1" />
        </a>
      </div>
      {/* Part-4 (Cast) */}
      <div className="mt-12">
        <h1 className="lg:text-4xl md:text-xl sm:text-lg text-zinc-100">
          Cast: &nbsp;
        </h1>
        <HorizonalCards data={info.combinedCredits.cast} />
      </div>
      {/* Part-4 (Acting) */}
      <div className="flex justify-between items-center mt-12">
        <h1 className="lg:text-4xl md:text-xl sm:text-lg text-zinc-100">
          Movies and shows: &nbsp;
        </h1>
        <DropDown
          title="Category"
          options={["tv", "movie"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-2xl shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-500 p-10]">
        {info[category + "Credits"].cast.map((item, index) => (
          <li
            key={index}
            className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
          >
            <Link to={`/${category}/details/${item.id}`}>
              <span>
                {item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
              </span>
              <span className="block ml-5 mt-2">
                {item.character && `Charater Name: ${item.character}`}
              </span>
            </Link>
          </li>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PeopleDetails;
