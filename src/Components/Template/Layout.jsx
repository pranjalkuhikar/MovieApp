import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";

function Layout() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsSidenavOpen(false);
  }, [location]);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 overflow-hidden">
      {/* Mobile Sidenav - Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${
          isSidenavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidenav}
      />

      {/* Sidenav */}
      <div
        className={`fixed top-0 left-0 h-full w-80 lg:w-80 bg-zinc-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidenavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-0`}
      >
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 relative">
        {/* Topnav */}
        <Topnav onMenuClick={toggleSidenav} />

        {/* Main Content Area */}
        <main className="relative h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
