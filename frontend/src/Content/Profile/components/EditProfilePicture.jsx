import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

const schema = yup
  .object({
    image: yup
      .mixed()
      .test("fileSize", "File is too large", (value) => {
        if (!value) return true; // skip if no file
        return value.size <= 5 * 1024 * 1024; // 5MB max
      })
      .required("A new image is required"),
  })
  .required();

export default function EditProfilePicture({contactId}) {

  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

  const [file, setFile] = useState(null); 

  // Sends POST Request to backend API to edit a post
  const apiEditPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.image);    

      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/profile/picture`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      flash("Profile Edited successfully");
      setFile(false);
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
      className='absolute magic-center justify-between rounded-full w-32 h-32 border-2 border-slate-500 overfolw-hidden'
    >
      <div className="">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div className='flex gap-5 items-start'>
              <label htmlFor='image-upload' className='rounded-full p-1 leading-tight'><MdEdit /></label>
              <input
                id='image-upload'
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFile(file);
                    field.onChange(file);
                  }
                }}
                className='hidden'
              />              
            </div>
          )}
        />
      </div>
      {file && <button className='font-bold' type='submit'>Save</button>}
    </form>
  )
}
