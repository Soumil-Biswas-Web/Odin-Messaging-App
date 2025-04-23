import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledInput from './components/ControlledInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from '../../Store/User.js/UserSlice';
import catchError from '../../assets/js/catchError';

// Schema that decides how Form elements are validated while submitting
const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

export default function Login() {

  const navigate = useNavigate();   // To Navigate to Another site

  const dispatch = useDispatch();   // To set Global variable setUser

  // Sends POST Request to backend API to login
  const apiLogin = async(data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_SERVER_URL}/auth/login`, data
      );
      const { token, username } = response.data;
      // console.log(token);
      localStorage.setItem('token', token);
      flash("Logged in successfully");
      dispatch(setUser({ username, token }));
      // console.log(response.data.username);
      navigate("/");
    } catch (e) {
      catchError(e);
    }
  }
  
  const onSubmit = (data) => { 
    console.log(data);
    apiLogin(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  
  const formFields = [    // Array of Input fields for the form
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ]

  return (
    <div className='magic-center justify-stretch bg-background-color sm:bg-background-color-offset w-full h-full '>
      <div className="py-10 p-10 sm:px-20 bg-background-color rounded-[30px] flex flex-col items-stretch w-full sm:w-[600px] my-auto">
        <h1 className='text-xl font-bold mb-10 text-center'>Log In</h1>
        <form
            onSubmit={handleSubmit(onSubmit)}
            id="create-job-form"
        >
            {formFields.map((field, index) => (
                <ControlledInput
                name={field.name}
                label={field.label}
                control={control}
                type={field.type}
                placeholder={field.placeholder}
                error={errors[field.name]?.message}
                options={field.options || undefined} // Pass undefined if options is not present
                key={index}
                />
            ))}

            <div className="flex w-full justify-between px-5">
              <button className='button-style' type="submit">Login</button>
              <Link to={"/signup"} className='button-style'>Sign Up</Link>
            </div>
        </form>
      </div>
    </div>
  )
}
