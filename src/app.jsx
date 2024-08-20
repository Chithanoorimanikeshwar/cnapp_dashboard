import React, { Fragment } from "react";
import RootLayout from "./app/_root/rootlayout";
import ErrorNotificationProvider from "./app/components/utilities/errorboundary";



const App = () => {
  return (
    <ErrorNotificationProvider>
      <RootLayout />
    </ErrorNotificationProvider>
  );
};

export default App;
