import React, { useContext, useEffect } from "react";
import Category from "./features/category";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData } from "../../features/dashboard/dashboard";
import { ErrorContext } from "../utilities/errorboundary";
import OverlayLayout from "../utilities/overLay/overlayLayout";

function DashboardBodyLayout() {
  const notifyUser = useContext(ErrorContext);
  const fetchInitialDataRequestStatus = useSelector(
    (state) => state.cnapp_dashboard?.loading
  );
  const fetchInitialDataRequestErrorsStatus = useSelector(
    (state) => state.cnapp_dashboard?.error
  );
  const categeoryList = useSelector(
    (state) => state.cnapp_dashboard?.categeoryList ?? []
  );
  //loading page data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  function renderCategeoryList() {
    console.log(categeoryList);
    return categeoryList.map((data, index) => {
      return <Category key={index + 1} categeoryInfo={data} />;
    });
  }
  switch (fetchInitialDataRequestStatus) {
    case "loading": {
      return <OverlayLayout />;
    }
    case "fulfilled": {
      if (categeoryList.length > 0)
        return <div className="py-2 px-1">{renderCategeoryList()}</div>;
      else
        return (
          <div className="h-full w-full flex justify-center items-center">
            <p className=" animate-pulse ">
              {fetchInitialDataRequestErrorsStatus || "Create New Dashboard"}
            </p>
          </div>
        );
    }
    case "rejected": {
      return (
        <div className="h-full w-full flex justify-center items-center">
          <p className=" animate-pulse ">
            {fetchInitialDataRequestErrorsStatus || "Realod the page"}
          </p>
        </div>
      );
    }
    default: {
      notifyUser(fetchInitialDataRequestErrorsStatus || "Relaod the page");
    }
  }
}

export default DashboardBodyLayout;
