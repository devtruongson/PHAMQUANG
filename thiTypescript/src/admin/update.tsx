import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddForm, addSchema, updateForm, updateSchema } from '../api/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { create, getId, update } from '../api/products';

export default function Update() {
    const {id} = useParams()
    const navigate = useNavigate()
    const shiowItem = async (id: string) => {
        const { data } = await getId(id)
        return data
    }
    const { register, handleSubmit, formState:{errors} } = useForm<updateForm>({
        resolver: yupResolver(updateSchema),
        defaultValues: async () => {
            if (id) {
                return shiowItem(id)
            }
        }
    })
    const onSubmit = async (data: updateForm) => {
        if (id) {
             const AddItem = await update(id,data)
        alert("update item is successfully")
        navigate("/auth/admin")
        console.log(AddItem)
        }
       
    }
  return (
      <div className='container mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <input {...register("name")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.name && errors.name.message}</p>
              </div>
              <div>
                  <input {...register("description")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.description && errors.description.message}</p>
              </div>
              <div>
                  <input {...register("price")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.price && errors.price.message}</p>
              </div>
              <div>
                  <input {...register("trademart")} className='w-[400px] h-[40px] my-5 border-2'/>
                  <p className='text-red-500'>{ errors.trademart && errors.trademart.message}</p>
              </div>
              <select {...register("madein")}>
                  <option>trung quoc</option>
                  <option>viet nam</option>
              </select>
              <br/>
              <br/>
              <br/>
              <br/>

              <button type='submit' className='bg-green-400 text-white p-5'>update Products</button>
          </form>
    </div>
  )
}
