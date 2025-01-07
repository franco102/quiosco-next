import { prisma } from '@/src/lib/prisma'
import React from 'react'  
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'
async function getCategories() { 
  return await prisma.category.findMany() 
}
const OrderSidebar = async() => {
  const categories=await getCategories() 
  return (
    <aside className='md:w-72 md:h-screen bg-white'>
      <Logo/>
      <nav className='mt-10'>
        {categories.map(category=>{
          return (<CategoryIcon key={category.id}  category={category}/>)
        })}
      </nav>
    </aside>
  )
}

export default OrderSidebar