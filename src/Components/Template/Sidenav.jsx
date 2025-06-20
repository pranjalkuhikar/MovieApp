import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiBardFill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiTelevisionFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";

function Sidenav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/trending", icon: <FaFire />, label: "Trending" },
    { path: "/popular", icon: <RiBardFill />, label: "Popular" },
    { path: "/movie", icon: <BiSolidMoviePlay />, label: "Movies" },
    { path: "/tv", icon: <PiTelevisionFill />, label: "TV Shows" },
    { path: "/people", icon: <BsPeopleFill />, label: "People" },
  ];

  return (
    <div className="h-full flex flex-col bg-zinc-900">
      {/* Logo section */}
      <Link
        to="/"
        className="flex items-center gap-3 p-6 hover:opacity-80 transition-opacity"
      >
        <PiTelevisionSimpleFill className="text-4xl text-blue-500" />
        <span className="text-2xl font-bold text-white">CineVerse</span>
      </Link>

      {/* Main navigation */}
      <nav className="flex-1 px-4 pb-4">
        <div className="mb-8">
          <h2 className="px-4 mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Browse
          </h2>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 text-center">
          © {new Date().getFullYear()} CineVerse
        </p>
      </div>
    </div>
  );
}

export default Sidenav;
