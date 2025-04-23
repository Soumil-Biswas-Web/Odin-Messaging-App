import React, { useState } from 'react'
import axios from 'axios'
import { redirect, useLoaderData, useParams } from 'react-router-dom';
import feedData from '../../assets/js/feedData';
import catchError from '../../assets/js/catchError';
import Logout from '../Login/Logout';
import EditProfileNickname from './components/EditProfileNickname';
import { MdEdit } from "react-icons/md";
import EditProfilePicture from './components/EditProfilePicture';

export default function Profile() {
  
  const {contactId} = useParams();
  console.log("Contact ID : ", contactId);

  let data = useLoaderData();
  // let data = feedData; 

  if (contactId != "you") data = (data.contacts.filter((contact) => contact.contact.id === contactId))[0].contact;

  const [nameVisibility, setNameVisibility] = useState(false);
  const handleNameVisibility = () => {
    setNameVisibility((prev) => !prev);
  };

  return (
    <div>
      <div className="magic-center my-10 gap-5">
        <img 
            src={data.profilePicture?.url || "66f-1.jpg"} 
            alt={data.nickname || data.username} 
            className='rounded-full w-32 aspect-square object-cover object-center'
        />
        {contactId == "you" && 
          <EditProfilePicture contactId={contactId}/>
        }                  
        <div className="magic-center">
          <p className='font-bold'>{data.nickname || data.username} 
            <span>
              {contactId == "you" && 
                <button onClick={handleNameVisibility} className='hover:text-gray-600 text-sm'><MdEdit /></button>
              }              
            </span>
          </p>
          {(contactId == "you" && nameVisibility ) && <EditProfileNickname contactId={contactId}/>}
        </div>
        {(data.nickname != null) && <p>{data.username}</p>}
        {(contactId == "you") && <Logout/>}
      </div>

    </div>
  )
}

Profile.loader = async () => {
    try {
      const token = localStorage.getItem('token');                
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_SERVER_URL}/profile/fetch`, {
            headers: { 
                Authorization: `Bearer ${token}`, 
            },
        }
      );
      console.log(response.data);
      return response.data;
    } 
    catch (e) {
      catchError(e);
      throw redirect("/");
    }  
}