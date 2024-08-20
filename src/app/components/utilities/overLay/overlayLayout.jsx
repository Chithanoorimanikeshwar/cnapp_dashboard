import React, { Fragment } from 'react'
import DashboardOverlay from './dashboardOverlay'
import WidgetOverlay from './widgetOverlay'

function OverlayLayout() {
  return (
   <Fragment>
     <DashboardOverlay>
        <WidgetOverlay/>
       <WidgetOverlay/>
       <WidgetOverlay/>
    </DashboardOverlay>
    <DashboardOverlay>
        <WidgetOverlay/>
       <WidgetOverlay/>
    </DashboardOverlay>
    
   </Fragment>
  )
}

export default OverlayLayout