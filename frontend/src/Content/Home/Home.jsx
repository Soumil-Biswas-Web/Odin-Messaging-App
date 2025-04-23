import React from 'react'
import Login from '../Header/components/Login'
import { useSelector } from 'react-redux';

export default function Home() {

    const user = useSelector((state) => state.userReducer);

    return (
            user.username?
            <div className='magic-center justify-center h-full'>
                Click on a contact to view their messages.
            </div>
            :
            <div className='magic-center justify-center h-full'>
                You might want to 
                <Login/> first
            </div>        
    )
}
