'use client'
import React from 'react'
import ProductForm from './ProductForm'
import { ProductSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import { ImageUpload } from './ImageUpload'
import { createProduct } from '@/actions/create-product-actions'
import { useRouter } from 'next/navigation'
 
export const AddProductForm = ({children}:{children:React.ReactNode}) => {
    const router=useRouter()
    const handleSubmit= async(formData:FormData)=>{
        const data ={
            name:formData.get('name'),
            price:formData.get('price'),
            categoryId:formData.get('categoryId'),
            image:formData.get('image'),
        }
        const result=ProductSchema.safeParse(data)
        if(!result.success){
            result.error.issues.map(issue=>
                toast.error(issue.message)
            )
            return
        }

        const response=await createProduct(data)
        if(response?.errors){
            response.errors.map(issue=>
                toast.error(issue.message)
            )
            return
        }
        toast.success('Producto creado correctamente')
        router.push('/admin/products')
    }
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl'>
        <form action={handleSubmit} className=' space-y-5'> 
                {children} 
            <input 
                type="submit" 
                className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                value='Registrar Producto'  
            />
        </form>

    </div>
  )
}