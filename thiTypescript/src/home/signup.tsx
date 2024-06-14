import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddForm, addSchema, signupForm, signupSchema, updateForm, updateSchema } from '../api/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { create, getId, update } from '../api/products';
import {  signupData } from '../api/auth';

export default function signup() {
    const {id} = useParams()
    const navigate = useNavigate()
   
    const { register, handleSubmit, formState:{errors} } = useForm<signupForm>({
        resolver: yupResolver(signupSchema),
       
    })
    const onSubmit = async (data: signupForm) => {
       
             const AddItem = await signupData(data)
        alert("create user is successfully")
        navigate("/home")
        console.log("tranbahuuy",AddItem)
        
       
    }
  return (
      <div className='container mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <p>name</p>
                  <input {...register("name")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.name && errors.name.message}</p>
              </div>
              <div>
                  <p>email</p>
                  
                  <input {...register("email")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.email && errors.email.message}</p>
              </div>
              <div>
                  <p>password</p>
                  
                  <input {...register("password")} type='password' className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.password && errors.password.message}</p>
              </div>
              <div>
                  <p>confirmPassword</p>
                  
                  <input {...register("confirmPassword")} type='password' className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.confirmPassword && errors.confirmPassword.message}</p>
              </div>
             

              <button type='submit' className='bg-green-400 text-white p-5'>signup user</button>
          </form>
    </div>
  )
}
