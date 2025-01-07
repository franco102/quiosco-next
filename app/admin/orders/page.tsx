 'use client'
import OrderCard from '@/components/order/OrderCard'
import { Heading } from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { OrderWithProducts } from '@/src/types'
import { revalidatePath } from 'next/cache'
import React from 'react'
import useSWR from 'swr'

// async function getPendingOrders() {
//   const orders=await prisma.order.findMany({
//     where:{
//       status:false,
//     },
//     include:{
//       orderProducts:{
//         include:{
//           product:true
//         }
//       }
//     }
//   })
//   return orders
// }

const page = () => {
  const url='/admin/orders/api'
  const fetcher=()=>fetch(url).then(res=>res.json()).then(data=>data)
  const {data,error,isLoading}=useSWR<OrderWithProducts[]>(url,fetcher,{
    refreshInterval:60000,
    revalidateOnFocus:false
  })
  const orders= data;
  console.log(data)
  if(isLoading) return  <p>'Cargando ...!'</p>
  if(orders)
  return (
    <>
      <Heading>
            Administrar Ordenes
      </Heading> 
       
      {
        orders.length>0
        ?(<div className=' grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5   '>
          {
            orders.map(order=>
            (<OrderCard order={order} key={order.id}/>)
            )
          }
        </div> )
        :<p className=' text-center'> Sin Ordenes Pendientes</p>
      }
    </>
  )
}

export default page