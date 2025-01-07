'use client'
import { useStore } from '@/src/store'
import React, { useMemo } from 'react'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-actions'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

const OrderSumary = () => {
  const order=useStore(state=>state.order) 
  const clearOrder=useStore(state=>state.clearOrder) 
  const haveOrder=useMemo(()=>order.length>0,[order]) 
  const total=useMemo(()=>order.reduce((total,item)=>total+item.subtotal,0),[order]) 
  const handleCreateOrder=async (formData:FormData)=>{
    const data={
      name:formData.get('name'),
      total,
      order
    }
    const result=OrderSchema.safeParse(data)
    if (!result.success){
      result.error.issues.forEach((issue)=>{
        toast.error(issue.message)
      })
    }
    
    const resultServer=await createOrder(data)
    if (resultServer?.erros){
      resultServer?.erros.forEach((issue)=>{
        toast.error(issue.message)
      })
    }
    clearOrder()
    toast.success('Pedido realizado correctamente...!')
  }
  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
        <h1 className='text-4xl text-center font-black'>Mi Pedido</h1>
        {haveOrder
        ?(
        <div className='mt-5'>
          {
            order.map(item=>
              (<ProductDetails key={item.id} item={item}/>)
            )
          }
          <p className='text-2xl mt-20 text-center'>Total a pagar: <span className='font-bold'>{formatCurrency(total) }</span></p>
          <form  className='w-full mt-10 space-y-10' action={handleCreateOrder}>
              <input 
                type="text" 
                placeholder='Tu nombre' 
                className='bg-white border-gray-100 w-full p-2'
                name='name'
              />
              <input 
                type="submit" 
                className='w-full py-2 rounded uppercase text-white bg-black text-center cursor-pointer font-bold' 
                value="confirmar pedido" 
              />
          </form>

        </div>
        )
        :<p className='text-center my-10'> El carrito está vacio</p>
      }
    </aside>
  )
}

export default OrderSumary