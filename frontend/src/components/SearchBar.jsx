import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postDestination } from "../features/destination/destinationSlice";

function SearchBar() {
  const [destination, setDestination] = useState("");
  const dispatch = useDispatch();

  const getDestination = (e) => setDestination(e.target.value);

  const handleDestination = (e) => {
    if (destination === "") {
      toast.error("A destination must be provided!");
      return;
    }

    const city = { city: destination };
    dispatch(postDestination(city));
    setDestination("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={getDestination}
        value={destination}
        placeholder="Search for places"
      />
      <div className="icon-wrapper search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#F88747"
          className="w-6 h-6"
          role="img"
          onClick={handleDestination}
        >
          <title>magnifying-glass-icon</title>
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
