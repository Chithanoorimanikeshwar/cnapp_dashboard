import React, { Fragment, useState } from "react";
import Navbar from "./sildebar/nav";

function MoreOptions() {
  const [isSidebarEnable, setIsSidebarEnable] = useState(false);
  function toggleSidebar() {
    setIsSidebarEnable((prev) => !prev);
  }

  return (
    <Fragment>
      <button
        className="inline-flex items-center justify-center w-8 h-8 rounded
       bg-white border p-2  transition ease-in-out delay-150
         hover:-translate-y-1 hover:scale-110  duration-300 "
        onClick={toggleSidebar}
      >
        <img
          src="/images/three-dots-vertical.svg"
          className="w-[20px]"
          alt="Repeat Icon"
        />
      </button>
      {isSidebarEnable && (
        <div aria-label="sidebar">
          <div
            aria-label="sibebar backdrop"
            className="fixed top-0 bottom-0 left-0 right-0 z-20 "
            onClick={toggleSidebar}
          ></div>
          <div
            aria-label="sidebar body"
            className="absolute z-20 top-0 bottom-0 right-0 left-1/2 border bg-blue-100
            "
          >
            <div className="flex flex-nowrap p-2 bg-indigo-950">
              <p className=" text-white">Add Widget</p>
              <button className="ml-auto self-center" onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
            <p className="my-2 mx-2">
              Personalise your dashboard by adding the follwing widget
            </p>
            <Navbar toggleSlidebar={toggleSidebar}/>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default MoreOptions;
