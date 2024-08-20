import React from "react";

import Filter from "./features/filter";
import AddNewWidget from "./features/addnewwidget";
import RepeatWidget from "./features/repeatwidget";
import MoreOptions from "./features/moreoptions";

const ControlPanelLayout = () => {
  return (
    <div className="flex flex-nowrap">
      <p className="text-md font-semibold md:text-lg lg:text-xl">
        CNAPP Dashboard
      </p>
      <div className="flex justify-evenly md:col-start-3 ml-auto">
        <AddNewWidget></AddNewWidget>
        <RepeatWidget></RepeatWidget>
        <MoreOptions></MoreOptions>
        <Filter></Filter>
      </div>
    </div>
  );
};

export default ControlPanelLayout;
