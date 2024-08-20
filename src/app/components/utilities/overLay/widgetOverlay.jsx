import React from 'react'

function WidgetOverlay() {
  return (
    <div className="px-2 py-1 bg-slate-200 rounded-xl">
        <div className="w-56 min-w-96 mx-2 h-full border-black bg-slate-50 rounded-xl p-2 shadow-md flex justify-center items-center">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>  
        </div>
      </div>
  )
}

export default WidgetOverlay