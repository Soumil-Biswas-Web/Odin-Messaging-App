import React, { useEffect } from 'react'
import axios from 'axios'
import { redirect, useLoaderData, useRevalidator } from 'react-router-dom';
import feedData from '../../assets/js/feedData';
import ContactItem from './components/ContactItem';
import catchError from '../../assets/js/catchError';
import { useSelector } from 'react-redux';

export default function ContactList() {

    const data = useLoaderData();
    // console.log(data);
    // const data = feedData;

    const user = useSelector((state) => state.userReducer);
    const { revalidate } = useRevalidator();

    useEffect(() => {
      // re-run the loader when user logs in
      if (user.username) {
        revalidate();
      }
    }, [user.username]);    

    const contacts = data?.contacts || [];

    // Filter out the messages the contact has sent the current user
    const filterContactMessages = (contact) => (
        data.recievedMessages.filter((msg) => msg.fromUserId === contact.id)
    )

  return (
    <div className="w-full">
        {contacts.map((contact, index) => (
            <ContactItem 
                contact={contact.contact} 
                messages={filterContactMessages(contact.contact)}
                key={index}
            />
        ))}
    </div>
  )
}

ContactList.loader = async () => {
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
      // throw redirect("/");
    }  
}