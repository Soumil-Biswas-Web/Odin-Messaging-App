import React from 'react'

export default function Heading({isSmol}) {
  return (
    <div className={`hidden xs:block text-contrast-color font-bold ml-[-2.5rem] pl-10 ${isSmol? "text-2xl" : "text-6xl"}`}>Odin-Messaging-App</div>
  )
}
