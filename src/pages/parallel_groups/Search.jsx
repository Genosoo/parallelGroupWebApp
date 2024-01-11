/* eslint-disable react/prop-types */
import { FiSearch } from "react-icons/fi";
import { IoRefresh } from "react-icons/io5";

export default function Search({searchInput, handleSearchInputChange, handleFindClick, handleClearSearch}) {
  return (
<div className="search_box">
            <input
              value={searchInput}
              onChange={handleSearchInputChange}
            />
        <button className="btn_search" onClick={handleFindClick}>
              <FiSearch />
          </button>
          <button className="btn_clear" onClick={handleClearSearch}>
           <IoRefresh/>
        </button>
         
        </div>
  )
}
