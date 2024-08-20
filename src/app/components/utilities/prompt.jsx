import React from "react";

function Prompt(props) {
  return (
    <div aria-label="prompt">
      <div
        aria-label="promptbackdrop"
        className="fixed top-0 bottom-0 left-0 right-0 z-10 "
      ></div>
      <div
        aria-label="promtbody"
        className="fixed z-20 top-1/4 bottom-1/4 right-1/3 left-1/3 border bg-blue-100 shadow-lg rounded-md p-2"
      >
        <div className="flex w-full flex-nowrap h-8 text-md mb-2">
          <p className="self-center">Promt</p>
          <button
            className=" rounded-tr-md  text-red-700  text-2xl text-center align-middle hover:bg-slate-500 font-mono ml-auto
        "
          onClick={props.togglePrompt}
          >
            <img src="images/x.svg" alt="close" width={25} />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Prompt;
