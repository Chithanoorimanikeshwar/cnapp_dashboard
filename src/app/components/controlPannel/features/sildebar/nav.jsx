import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./navlinks";
import Tab from "./tab";
import { removeWidget } from "../../../../features/dashboard/dashboard";

function Navbar({ toggleSlidebar }) {
  const dispatch = useDispatch();
  const navList = useSelector(
    (state) => state.cnapp_dashboard?.categeoryList ?? []
  );
  const [widgetList, setWidgetList] = useState(() => {
    return (navList?.length > 0 && navList[0].subCategeory) || [];
  });
  const [activedb, setActivedb] = useState(() => {
    return (navList?.length > 0 && navList[0].id) || "";
  });
  const checkedList = useRef({});

  function editDashBoardWidgets() {
    const removeList = { ...checkedList.current };
    Object.keys(removeList).map((key) => {
      if (removeList[key].length > 0) {
        dispatch(
          removeWidget({ categeoryId: key, widgetList: removeList[key] })
        );
      }
    });
    toggleSlidebar();
  }

  function handleCheckedList(widgetId, action) {
    switch (action) {
      case "add": {
        checkedList.current[activedb] = [
          ...(checkedList.current.categeoryId || []),
        ];
        checkedList.current[activedb].push(widgetId);
        break;
      }
      case "remove": {
        checkedList.current[activedb] = checkedList.current[activedb].filter(
          (value) => !(value == widgetId)
        );
        break;
      }
      default: {
        return 0;
      }
    }
  }

  function handleDataFromChild(categeory) {
    console.log(categeory);
    categeory.navLinkData && setWidgetList(categeory.navLinkData.subCategeory);
    categeory.navLinkData && setActivedb(categeory.navLinkData.id);
  }

  function renderNavList() {
    return navList.map((categeory, index) => {
      console.log(categeory.id, activedb);
      return (
        <NavLinks
          key={categeory.id}
          sendDataToParent={handleDataFromChild}
          isActive={categeory.id == activedb ? true : false}
          navLinkData={categeory}
        />
      );
    });
  }
  function renderWidget() {
    return (
      widgetList.length > 0 &&
      widgetList.map((widget) => {
        return (
          <Tab
            key={widget.id}
            tabInfo={widget}
            updateCheckedList={handleCheckedList}
            categeoryId={activedb}
          />
        );
      })
    );
  }

  if (navList.length > 0) {
    return (
      <div className="h-[80%] relative">
        <ul className="flex flex-nowarp">{renderNavList()}</ul>
        <ul className="p-2">{renderWidget()}</ul>
        <div className="absolute bottom-0 right-0 ">
      
          <button
            className="p-2 border bg-red-600 text-white inline-block "
            onClick={editDashBoardWidgets}
          >
            Remove
          </button>
          <button
            className="p-2 border bg-slate-500 text-white inline-block "
            onClick={toggleSlidebar}
          >
            cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full h-[80%] justify-center items-center">
        <p className="animate-pulse cursor-default">Create a new Dashboard</p>
      </div>
    );
  }
}

export default Navbar;
