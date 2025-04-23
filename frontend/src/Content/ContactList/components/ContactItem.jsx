import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactItem({contact, messages}) {
  // console.log("Messages: ", messages)
  return (
    <Link to={`messageWindow/${contact.id}`} className="flex gap-2 border-b-2 border-slate-500 p-2">
        <Link to={`profile/${contact.id}`}>
            <img 
                src={contact.profilePicture?.url || "66f-1.jpg"} 
                alt={contact.nickname || contact.username} 
                className='rounded-full w-10 aspect-square object-cover object-center'
            />
        </Link>
        <div>
            <p className='font-semibold'>{contact.nickname || contact.username} </p>
            <p>{(messages[messages.length - 1].text) || "Click to begin!"}</p>
        </div>
    </Link>
  )
}
