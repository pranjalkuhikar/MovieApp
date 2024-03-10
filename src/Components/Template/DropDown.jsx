/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function DropDown({ title, options, func }) {
  return (
    <div className="w-[18%] min-w-fit">
      <select
        onChange={func}
        defaultValue="0"
        className="bg-gray-50 border font-semibold border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
