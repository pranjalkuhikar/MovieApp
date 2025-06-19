/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function DropDown({ title, options, func }) {
  return (
    <div className="relative min-w-[140px]">
      <select
        onChange={func}
        defaultValue="0"
        className="w-full appearance-none bg-zinc-800 text-zinc-100 px-4 py-2 pr-8 rounded-lg border border-zinc-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        hover:bg-zinc-700 transition-colors cursor-pointer text-sm font-medium"
        aria-label={title}
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o} className="bg-zinc-800">
            {o.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

export default DropDown;
