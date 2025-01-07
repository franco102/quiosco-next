import { OrderWithProducts } from '@/src/types'
import React from 'react'

export const LatestOrderItem = ({order}:{order:OrderWithProducts}) => {
  return (
    <div className='bg-white shadow p-5 space-y-5 rounded-lg'>
        <p className='text-2xl text-slate-600 font-bold'>
            Cliente: {order.name}
        </p>
        <ul className='divide-y divide-gray-200  border-t border-gray-200 text-swm font-medium text-gray-500' role='list'>
            {
                order.orderProducts.map(product=>(
                    <li
                        key={product.id}
                        className='flex py-6 text-lg'
                    >
                        <p><span className='font-bold'>({product.quantity})</span> {product.product.name}</p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
