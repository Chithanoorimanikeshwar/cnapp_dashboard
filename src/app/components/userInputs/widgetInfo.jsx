import React, { useRef, useState } from "react";
import { delay } from "./catageoryName";

function CollectUserData({ sendDataToParent }) {
  const [formErrors, setFormErrors] = useState("");
  const widgetTitle = useRef({ data: "", isValid: undefined });
  const widgetText = useRef({ data: "", isValid: undefined });

  function handleUserInput() {
    return delay(validateFormData, 1000);
  }

  const validateFormData = (event) => {
    const formData = event?.target?.value || "";
    const formField = event?.target?.ariaLabel || "";
    switch (formField) {
      case "widgetTitle": {
        widgetTitle.current = {
          data: formData || "",
          isValid: formData != "" ? true : false,
        };
        break;
      }
      case "widgetText": {
        widgetText.current = {
          data: formData || "",
          isValid: formData != "" ? true : false,
        };
        break;
      }

      default: {
        console.log("something went wrong at widgetInfo");
      }
    }
  };

  function handleFormSubmit() {
    if (widgetTitle.current.isValid && widgetText.current.isValid) {
      sendDataToParent({
        formValid: true,
        title: widgetTitle.current,
        text: widgetText.current,
      });
    } else if (!widgetTitle.current.isValid)
      setFormErrors("Enter Widget Title");
    else if (!widgetText.current.isValid) setFormErrors("Enter Widget Text");
    return 0;
  }

  return (
    <div className="flex flex-col flex-nowrap justify-top custom_height">
      <div className="p-2">
        <label className="block">Enter Widget Title</label>
        <input
          type="text"
          placeholder="Enter text here"
          className="bg-white rounded-md shadow-lg w-full h-8 p-2"
          autoFocus
          onChange={handleUserInput()}
          aria-label="widgetTitle"
        />
      </div>
      <div>
        <div className="p-2">
          <label>Enter Text</label>
          <input
            type="text"
            placeholder="Enter text here"
            className="bg-white rounded-md shadow-lg w-full h-8 p-2"
            onChange={handleUserInput()}
            aria-label="widgetText"
          />
        </div>
        <div></div>
      </div>
      <button
        className="bg-blue-500 text-white
          mt-2 mx-2"
        onClick={handleFormSubmit}
      >
        submit
      </button>
      {formErrors != "" && (
        <p className="text-red-600 font-bold text-sm mt-2">{formErrors}</p>
      )}
    </div>
  );
}

export default CollectUserData;
