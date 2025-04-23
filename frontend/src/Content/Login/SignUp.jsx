import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledInput from './components/ControlledInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Validate that it matches `password`
      .required('Repeat password is required'),      
  })
  .required();  

export default function SignUp() {

  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  // Sends POST Request to backend API to Sign Up
  const apiSignUp = async(data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_SERVER_URL}/auth/signup`, data
      );
      // localStorage.setItem("token", response.data);
      flash("Created Account successfully");
      console.log("Created Account successfully");
      navigate("/login");
    } catch (e) {
      catchError(e);
    }
  }  

  const onSubmit = (data) => { 
    console.log(data);
    apiSignUp(data);
  }

  const formFields = [    // Array of Input fields for the form
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
    },
    {
      name: "password_repeat",
      label: "Repeat Password",
      type: "password",
      placeholder: "Enter your Password again",
    },    
  ]

  return (
    <div className='magic-center justify-stretch bg-background-color sm:bg-background-color-offset w-full h-full'>
      <div className="py-10 p-10 sm:px-20 bg-background-color rounded-[30px] flex flex-col items-stretch w-full sm:w-[600px] my-auto">
        <h1 className='text-xl font-bold mb-10 text-center'>Sign Up</h1>
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

            <div className="flex w-full justify-between px-5 gap-5">
              <button className='button-style' type='submit'>Sign Up</button>
              <Link to={"/login"} className='button-style'>Login Instead</Link>
            </div>
        </form>
      </div>
    </div>
  )
}
