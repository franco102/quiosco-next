'use client'
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

type ImageUploadProps={
    image:string|undefined
}

export const ImageUpload = ({image}:ImageUploadProps) => {
    const [imageUrl,setImageUrl]=useState('')
  return (
    <CldUploadWidget 
        uploadPreset='ml_default' 
        options={{maxFiles:1}}
        onSuccess={(result,{widget})=>{
            if(result.event==='success'){
                widget.close()
                //@ts-ignore
                setImageUrl(result.info?.secure_url)
            }
        }}
    >
        {({open})=>(
            <>
                <div className='space-y-2'>
                    <label htmlFor="">Imagen Producto</label>
                    <div
                        onClick={()=>open()} 
                        className=' relative cursor-pointer hover:opacity-70  transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                    >
                        <TbPhotoPlus size={50}/>
                        <p className='text-lg font-semibold'>Agregar Imagen</p>
                        {
                            imageUrl && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image fill style={{objectFit:'contain'}} src={imageUrl} alt="Imagen de Producto" />
                                </div>
                            )
                        }
                    </div>
                </div>
                {image&&!imageUrl &&(
                    <div className='space-y-2'>
                        <label htmlFor="">Imagen Actual:</label>
                        <div className='relative w-64 h-64'>
                            <Image fill alt='imagen upload' src={getImagePath(image)}/>
                        </div>
                    </div>
                )}
                 <input type="hidden" defaultValue={imageUrl? imageUrl:image }  name='image'/>           
            </>
        )}
    </CldUploadWidget>
  )
}
