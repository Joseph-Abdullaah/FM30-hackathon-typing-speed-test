import React from 'react'

function MainContent({children}) {
  return (
    <div className="flex flex-col h-full w-full p-4 sm:py-5 lg:px-28 lg:py-8">
      {children}
    </div>
  )
}

export default MainContent