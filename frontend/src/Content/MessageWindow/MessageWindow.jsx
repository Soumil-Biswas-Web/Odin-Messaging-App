import React from 'react'
import axios from 'axios'
import { redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import feedData from '../../assets/js/feedData';
import catchError from '../../assets/js/catchError';
import NewMessage from './components/NewMessage';
import formatDate from '../../assets/js/formatDate';


export default function MessageWindow() {
  
    const {contactId} = useParams();
    // console.log("Contact ID : ", contactId);    

    const data = useLoaderData();
    // const data = feedData;

    // Concatenate sent and recieved messages
    const messages = data.recievedMessages.filter(
        (msg) => msg.fromUserId === contactId
    ).concat(data.sentMessages.filter(
        (msg) => msg.toUserId === contactId
    ))

  return (
    // Display messages
    <div className='h-full flex flex-col'>
        <div className="flex-1">
          {messages.map((message, index) => (
              <div key={index} className="border-b-2 border-slate-500 p-5">
                <p className='font-semibold'>{message.fromUser.username} <span className='text-slate-900 text-sm'>{formatDate(message.createdAt)}</span></p>
                <p className=''>{message.text}</p>
              </div>
          ))}
        </div>
        <NewMessage toUserId={contactId}/>
    </div>
  )
}

MessageWindow.loader = async () => {  
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