import React, { Fragment, useState } from "react";
import Prompt from "../../utilities/prompt";
import CollectUserData from "../../userInputs/widgetInfo";
import { useDispatch } from "react-redux";
import { addNewWidget } from "../../../features/dashboard/dashboard";

function Widget({ widgetInfo, categeoryId }) {
  const dispatch = useDispatch();
  const [isPromtEnable, setIsPromptEnable] = useState(false);

  function togglePrompt(){
    setIsPromptEnable((prev)=>!prev);
  }

  function createNewWidget(event) {
    setIsPromptEnable(true);
  }

  function handleDataFromChild(formData) {
    let widgetInfo = {
      title: formData.title.data,
      text: formData.text.data,
    };
    dispatch(addNewWidget({ categeoryId, widgetInfo }));
    setIsPromptEnable(false);
  }
  function renderData() {
    if (widgetInfo) {
      return (
        <div className="w-56 min-w-96 mx-2 h-full border-black bg-slate-50 rounded-xl p-2 shadow-md ">
          <p className="capitalize font-semibold underline">{widgetInfo.title}</p>
          <div>{widgetInfo.text}</div>
        </div>
      );
    } else {
      return (
        <div className="w-56 min-w-96 mx-2 h-full border-black bg-slate-50 rounded-xl p-2 shadow-md flex justify-center items-center">
          <button
            className="py-1 px-2 border rounded bg-white text-sm"
            onClick={createNewWidget}
          >
            <span className="text-sm px-1 font-blod">+</span>Add Widget
          </button>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <div className="px-2 py-1 bg-slate-200 rounded-xl">{renderData()}</div>
      {isPromtEnable && (
        <Prompt togglePrompt={togglePrompt}>
          <CollectUserData sendDataToParent={handleDataFromChild} />
        </Prompt>
      )}
    </Fragment>
  );
}

export default Widget;
