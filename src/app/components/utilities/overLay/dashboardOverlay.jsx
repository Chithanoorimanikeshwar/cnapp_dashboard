import React from 'react'

function DashboardOverlay({children}) {
  return (
    <div className=" overflow-hidden h-60 ">
    <p className="capitalize text-md font-semibold w-36 h-5 block border text-lg rounded-lg bg-slate-400 animate-pulse"></p>

    <div className="w-full h-[13.5rem] pb-2  flex flex-nowrap overflow-x-auto">
      {children}
    </div>
  </div>
  )
}

export default DashboardOverlay