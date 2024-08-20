import React, { Fragment } from "react";
import ControlPanelLayout from "../components/controlPannel/controlpanellayout";
import DashboardBodyLayout from "../components/dashboardbody/layout";
import ErrorProvider from "../components/utilities/errorboundary";

const RootLayout = () => {
  return (
  
      <div className="pt-4 px-2  bg-slate-100  h-[100vh] overflow-y-auto">
        <ControlPanelLayout></ControlPanelLayout>
        <DashboardBodyLayout></DashboardBodyLayout>
      </div>
  );
};

export default RootLayout;
