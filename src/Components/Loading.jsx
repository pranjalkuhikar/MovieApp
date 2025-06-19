function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-pulse"></div>

        {/* Inner spinner */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-zinc-400 text-sm font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
