import axios from "../../Utiles/Axios";
import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoSearch, IoClose } from "react-icons/io5";
import DropDown from "./DropDown";

function Topnav({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setSearches([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    setShowDropdown(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const { data } = await axios.get(`search/multi?query=${query}`);
        setSearches(data.results || []);
      } catch (err) {
        setSearches([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  // Keyboard navigation: close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search:", searchQuery);
      // Implement search functionality
    }
  };

  const handleResultClick = (item) => {
    let mediaType = item.media_type;
    if (!mediaType) {
      if (item.first_air_date) mediaType = "tv";
      else if (item.release_date) mediaType = "movie";
      else if (item.profile_path) mediaType = "person";
    }
    if (mediaType === "person") mediaType = "people";
    if (!mediaType) return;
    window.location.href = `/${mediaType}/details/${item.id}`;
    setShowDropdown(false);
    setQuery("");
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 shadow-lg">
      <div className="flex items-center h-16 px-4 max-w-7xl mx-auto gap-2 lg:gap-6 justify-between">
        {/* Menu button - visible on mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <HiMenuAlt2 className="h-6 w-6" />
        </button>

        {/* Logo - visible on mobile */}
        <Link
          to="/"
          className="lg:hidden flex items-center space-x-2 text-white font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <span>MovieApp</span>
        </Link>

        {/* Search bar - desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex w-full max-w-xl justify-end"
        >
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="search"
              placeholder="Search movies, shows, people..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setQuery(e.target.value);
              }}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                transition-all duration-200 ease-in-out"
            />
            {/* Search Results Dropdown */}
            {showDropdown && searches.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searches.map((item) => {
                  let mediaType = item.media_type;
                  if (!mediaType) {
                    if (item.first_air_date) mediaType = "tv";
                    else if (item.release_date) mediaType = "movie";
                    else if (item.profile_path) mediaType = "person";
                  }
                  if (mediaType === "person") mediaType = "people";
                  if (!mediaType) return null;
                  return (
                    <div
                      key={item.id + mediaType}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
                      onClick={() => handleResultClick(item)}
                    >
                      <img
                        src={
                          item.poster_path || item.profile_path
                            ? `https://image.tmdb.org/t/p/w92${
                                item.poster_path || item.profile_path
                              }`
                            : "/Noimg.jpg"
                        }
                        alt={item.title || item.name}
                        className="w-8 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">
                          {item.title || item.name}
                        </div>
                        <div className="text-xs text-zinc-400 capitalize">
                          {mediaType}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </form>

        {/* Mobile search button */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Search"
        >
          {searchOpen ? (
            <IoClose className="h-6 w-6" />
          ) : (
            <IoSearch className="h-6 w-6" />
          )}
        </button>

        {/* Dropdown menu */}
        <div className="flex items-center"></div>
      </div>

      {/* Mobile search bar - shown when search is active */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search movies, shows, people..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setQuery(e.target.value);
                }}
                className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Search Results Dropdown - Mobile */}
              {showDropdown && searches.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searches.map((item) => {
                    let mediaType = item.media_type;
                    if (!mediaType) {
                      if (item.first_air_date) mediaType = "tv";
                      else if (item.release_date) mediaType = "movie";
                      else if (item.profile_path) mediaType = "person";
                    }
                    if (mediaType === "person") mediaType = "people";
                    if (!mediaType) return null;
                    return (
                      <div
                        key={item.id + mediaType}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer"
                        onClick={() => handleResultClick(item)}
                      >
                        <img
                          src={
                            item.poster_path || item.profile_path
                              ? `https://image.tmdb.org/t/p/w92${
                                  item.poster_path || item.profile_path
                                }`
                              : "/Noimg.jpg"
                          }
                          alt={item.title || item.name}
                          className="w-8 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="text-white font-semibold text-sm">
                            {item.title || item.name}
                          </div>
                          <div className="text-xs text-zinc-400 capitalize">
                            {mediaType}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

export default Topnav;
