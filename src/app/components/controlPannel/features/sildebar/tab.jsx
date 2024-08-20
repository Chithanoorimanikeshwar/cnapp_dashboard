import React, { useState } from "react";

function Tab({ tabInfo, updateCheckedList, categeoryId }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckList() {
    updateCheckedList(
      tabInfo.id,
      !isChecked ? "add" : "remove"
    );

    setIsChecked((prev) => !prev);
  }
  return (
    <li className="p-2 border border-black">
      <input
        type="checkbox"
        name=""
        value={tabInfo.id}
        className="p-2"
        onClick={handleCheckList}
      />
      <span className="px-2">{tabInfo.title}</span>
    </li>
  );
}

export default Tab;
