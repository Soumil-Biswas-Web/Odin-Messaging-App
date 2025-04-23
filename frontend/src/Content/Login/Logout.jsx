import React from 'react'
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Store/User.js/UserSlice'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {       
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Reset Redux state
        dispatch(clearUser());

        navigate("/")
    }

  return (
    <button
        className='button-style'
        onClick={handleLogout}
    >Logout</button>
  )
}
