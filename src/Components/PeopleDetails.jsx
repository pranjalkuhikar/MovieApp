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

  if (!info) return <Loading />;

  const { detail, externalid, combinedCredits, movieCredits, tvCredits } = info;

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="absolute top-0 left-0 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-black/20 rounded-full transition-colors"
          >
            <FaArrowLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="max-w-5xl w-full mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
          {/* Profile Image */}
          <div className="w-56 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={
                detail.profile_path
                  ? `https://image.tmdb.org/t/p/w500${detail.profile_path}`
                  : "/Noimg.jpg"
              }
              alt={detail.name || detail.title || "Profile"}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {detail.name || detail.title}
            </h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                {detail.known_for_department || "N/A"}
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                {detail.gender === 2
                  ? "Male"
                  : detail.gender === 1
                  ? "Female"
                  : "Other"}
              </span>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                DOB: {detail.birthday || "N/A"}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-zinc-400">
                Also Known As:{" "}
              </span>
              <span className="text-zinc-200">
                {detail.also_known_as && detail.also_known_as.length > 0
                  ? detail.also_known_as.join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-zinc-400">Biography: </span>
              <span className="text-zinc-200">
                {detail.biography
                  ? detail.biography.slice(0, 600)
                  : "No biography available."}
              </span>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {externalid?.wikidata_id && (
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}
                >
                  <SiWikidata className="w-8 h-8 text-white hover:text-blue-400 transition-colors" />
                </a>
              )}
              {externalid?.facebook_id && (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${externalid.facebook_id}`}
                >
                  <FaFacebookSquare className="w-8 h-8 text-white hover:text-blue-400 transition-colors" />
                </a>
              )}
              {externalid?.instagram_id && (
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${externalid.instagram_id}`}
                >
                  <RiInstagramFill className="w-8 h-8 text-white hover:text-blue-400 transition-colors" />
                </a>
              )}
              {externalid?.twitter_id && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${externalid.twitter_id}`}
                >
                  <FaSquareXTwitter className="w-8 h-8 text-white hover:text-blue-400 transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Movies & Shows</h2>
          <DropDown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizonalCards data={info[category + "Credits"].cast} />
      </div>

      {/* Combined Credits (Cast) */}
      {combinedCredits &&
        combinedCredits.cast &&
        combinedCredits.cast.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Cast Highlights
            </h2>
            <HorizonalCards data={combinedCredits.cast} />
          </div>
        )}
    </div>
  );
}

export default PeopleDetails;
