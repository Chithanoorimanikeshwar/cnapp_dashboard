import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Prompt from "../../utilities/prompt";
import CatageoryName from "../../userInputs/catageoryName";
import { addNewCatageory } from "../../../features/dashboard/dashboard";

function AddNewWidget() {
  const [isPromtEnable, setIsPromtEnable] = useState(false);
  const dispatch = useDispatch();

  function createNewCatageory(event) {
    setIsPromtEnable(true);
  }
  function togglePrompt(){
    setIsPromtEnable((prev)=>!prev);
  }
  function getDataFromChild(info) {
    if (info.isFormValid) setIsPromtEnable(false);
    //dispatch new catageory to store
    dispatch(addNewCatageory({categeoryName:info.categeoryName}))
  }


  return (
    <Fragment>
      <button
        className="py-1 px-2 border rounded bg-white text-sm  transition ease-in-out delay-100
         hover:-translate-y-1 hover:scale-110  duration-300 "
        onClick={createNewCatageory}
        
      >
        Add Widget <span className="text-sm px-1 font-blod">+</span>
      </button>
      {isPromtEnable && (
        <Prompt togglePrompt={togglePrompt}>
          <CatageoryName sendDataToParent={getDataFromChild} />
        </Prompt>
      )}
    </Fragment>
  );
}

export default AddNewWidget;
