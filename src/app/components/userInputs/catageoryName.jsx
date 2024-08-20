import React, { useRef, useState } from "react";

export function delay(delayedFunction, timeoutInMilliSeconds) {
  let timeoutId = null;
  return (event) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      delayedFunction(event);
      timeoutId = null; // Reset timeoutId after execution
    }, timeoutInMilliSeconds);
  };
}

function CatageoryName(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const userInput = useRef("");

  function handleUserInput() {
    return delay(validateFormData, 1000);
  }

  const validateFormData = (event) => {
    if (event.target.value !== "") {
      setIsFormValid(true);
      userInput.current = event.target.value;
    } else setIsFormValid(false);
  };

  function handleFormSubmit() {
    if (isFormValid) {
      props.sendDataToParent({ categeoryName: userInput.current, isFormValid });
    }
  }

  return (
    <div className="flex flex-col flex-nowrap justify-top custom_height">
      <div className="p-2">
        <label
          className="block mb-2
        "
        >
          Enter Catageory Type
        </label>
        <input
          type="text"
          placeholder="Enter text here"
          className="bg-white rounded-md shadow-lg w-full h-8 p-2"
          autoFocus
          onChange={handleUserInput()}
          aria-label="widgetTitle"
        />
      </div>
      <button
        className={`
        ${isFormValid ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-900"}
          bg-blue-500 text-white
          mt-2 mx-2
       `}
        onClick={handleFormSubmit}
      >
        submit
      </button>
    </div>
  );
}

export default CatageoryName;
