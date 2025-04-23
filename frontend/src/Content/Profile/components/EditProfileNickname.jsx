import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required"),
  })
  .required();

export default function EditProfileNickname({contactId}) {

  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

  // Sends POST Request to backend API to edit a post
  const apiEditPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/profile/nickname`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      flash("Name Changed successfully");
      navigate(`/profile/${contactId}`)
    } catch (e) {
      catchError(e);
    }
  }    

  const onSubmit = (data) => { 
    // console.log(data);
    apiEditPost(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="edit-post-form"
      className="flex gap-3 items-center w-full p-3"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            onChange={(e) => {
                localStorage.setItem("name", e.target.value);
                field.onChange(e); // Ensure react-hook-form handles the change
            }}
            placeholder="new nickname..."
            className='bg-transparent w-32'
          ></input>
        )}
      />
      <button className='' type='submit'>Ok</button>
    </form>
  )
}
