import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-zinc-400 text-lg mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
      <div className="mt-12 text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Movie App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default NotFound;
