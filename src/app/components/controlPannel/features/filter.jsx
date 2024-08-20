import React from "react";

function Filter() {
  return <button className="p-1 font-semibold border rounded bg-white  flex flex-nowrap items-center border-blue-600 ">
    <div className="p-1 border-r-2">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[15px] text-blue-600"
        fill="currentColor"
        viewBox="0 0 512 512"
        
      >
        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
      </svg>
    </div>
    <div className="px-1 text-sm text-blue-600">Last 2 days</div>
    <div className="p-1 ">
    <svg xmlns="http://www.w3.org/2000/svg"
     className="w-[10px] text-blue-600"
        fill="currentColor"
    viewBox="0 0 448 512">
      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
    </div>
  </button>
}

export default Filter;
