import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    text: yup
      .string()
      .required("Text is required"),
  })
  .required();

export default function NewMessage({toUserId}) {

  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

  // Sends POST Request to backend API to edit a post
  const apiEditPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('toUserId', toUserId);    
      formData.append('text', data.text);
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/message/send`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      flash("Post Created successfully");
      navigate(`/messageWindow/${toUserId}`)
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
      className='flex gap-3 items-start w-full p-3'
    >
      <div className="w-full flex flex-col items-start gap-2">
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              type="textArea"
              onChange={(e) => {
                  localStorage.setItem("text", e.target.value);
                  field.onChange(e); // Ensure react-hook-form handles the change
              }}
              placeholder="new message..."
              className='bg-transparent w-full magic-border flex-1 px-3 py-1'
            ></textarea>
          )}
        />
      </div>
      <button className='button-style self-end' type='submit'>Send</button>
    </form>
  )
}
