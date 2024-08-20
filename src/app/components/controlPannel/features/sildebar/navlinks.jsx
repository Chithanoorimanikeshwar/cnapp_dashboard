import React from "react";

function NavLinks({ navLinkData, sendDataToParent, isActive }) {
    console.log(isActive);

  function handleButtonClick(event) {
    sendDataToParent({
      event,
      navLinkData,
    });
  }
  return (
    <li>
      <button
        className={`px-3 pb-2  ${
          isActive ? "border-b-2 border-black" : ""
        }`}
        onClick={handleButtonClick}
      >
        {navLinkData?.categeoryName.slice(0,5)}
      </button>
    </li>
  );
}

export default NavLinks;
