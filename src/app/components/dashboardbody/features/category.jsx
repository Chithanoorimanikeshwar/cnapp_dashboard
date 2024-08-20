import React, { useEffect, useState } from "react";
import Widget from "./widget";
import DashboardOverlay from "../../utilities/overLay/dashboardOverlay";
import WidgetOverlay from "../../utilities/overLay/widgetOverlay";
import Prompt from "../../utilities/prompt";
import { useDispatch } from "react-redux";
import { removeCategeoryAction } from "../../../features/dashboard/dashboard";

function Category({ categeoryInfo }) {
  const dispatch = useDispatch();
  const [isPromptEnable, setIsPromptEnable] = useState(false);

  function removeCategeory() {
    dispatch(removeCategeoryAction(categeoryInfo.id));
    togglePrompt();
  }

  function togglePrompt() {
    setIsPromptEnable((prev) => !prev);
  }

  function renderWidgets() {
    if (categeoryInfo.queryState === "pending") {
      return (
        <DashboardOverlay>
          <WidgetOverlay />
        </DashboardOverlay>
      );
    }
    return (
      categeoryInfo?.subCategeory?.length > 0 &&
      categeoryInfo.subCategeory.map((data) => {
        return (
          <Widget
            widgetInfo={data}
            key={data.id}
            categeoryId={categeoryInfo.id}
          />
        );
      })
    );
  }

  return (
    <div className=" overflow-hidden h-60 ">
      <div className="flex flex-nowarp w-full">
        <p className="capitalize text-md font-semibold">{`${
          categeoryInfo?.categeoryName || ""
        } dashboard`}</p>
        <button
          className="ml-auto border p-1 rounded hover:bg-slate-400"
          onClick={togglePrompt}
        >
          <img src="images/x.svg" width="10" />
        </button>
      </div>

      <div className="w-full h-[13.5rem]  flex flex-nowrap overflow-x-auto scrollbar-hide">
        {renderWidgets()}
        {categeoryInfo.queryState != "pending" && (
          <Widget categeoryId={categeoryInfo?.id} />
        )}
      </div>
      {isPromptEnable && (
        <Prompt togglePrompt={togglePrompt}>
          <div>
            <p>Remove {categeoryInfo.categeoryName}</p>
            <div className="flex flex-nowrap w-full justify-center mt-2">
              <button
                className="bg-slate-700 text-white border p-1 mx-1 hover:bg-white hover:text-slate-700"
                onClick={removeCategeory}
              >
                conform
              </button>
              <button
                className="bg-red-600 text-white border p-1 mx-1 hover:bg-white hover:text-red-600"
                onClick={togglePrompt}
              >
                cancel
              </button>
            </div>
          </div>
        </Prompt>
      )}
    </div>
  );
}

export default Category;
